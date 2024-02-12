provider "aws" {
  region = var.aws_region

}

#Random name for our bucket
resource "random_pet" "lambda_bucket_name" {
  prefix = "resend-email-bucket"
  length = 4
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id
}

resource "aws_s3_bucket_ownership_controls" "lambda_bucket" {
  bucket = aws_s3_bucket.lambda_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "lambda_bucket" {
  depends_on = [aws_s3_bucket_ownership_controls.lambda_bucket]

  bucket = aws_s3_bucket.lambda_bucket.id
  acl    = "private"
}

# Create a ZIP from your lambda function
data "archive_file" "lambda_resend_email" {
  type = "zip"

  source_dir  = "${path.module}/../lambdaFunctions/resendEmail"
  output_path = "${path.module}/resendEmail.zip"
}

# Upload your ZIP to the created bucket
resource "aws_s3_object" "lambda_resend_email" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "resendEmail.zip"
  source = data.archive_file.lambda_resend_email.output_path

  etag = filemd5(data.archive_file.lambda_resend_email.output_path)
}

# Use content on the created bucket to create a lambda function
resource "aws_lambda_function" "resendEmail" {
  function_name = "resendEmail"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_resend_email.key

  runtime = "nodejs20.x"
  handler = "resendEmail.handler"

  source_code_hash = data.archive_file.lambda_resend_email.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

# Create logs for your lambda function (optional)
resource "aws_cloudwatch_log_group" "resendEmail" {
  name = "/aws/lambda/${aws_lambda_function.resendEmail.function_name}"

  retention_in_days = 30
}

# Creation of role and basic permissions for lambda
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda_resend_email"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_caller_identity" "current" {}

# Custom SSM GetParameter policy
resource "aws_iam_policy" "SSM_GetResendKey_policy" {
  name        = "AccessResendKey"
  description = "Custom policy for Lambda function"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = ["ssm:GetParameter"],
        Effect   = "Allow",
        Resource = ["arn:aws:ssm:us-east-1:${data.aws_caller_identity.current.account_id}:parameter/resendKey"],
      },
    ],
  })
}


resource "aws_iam_role_policy_attachment" "custom_lambda_policy_attachment" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.SSM_GetResendKey_policy.arn
}


# Creating API Gateway HTTP API
resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_resend_email_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age = 300
  }
}

# Create your stage to deploy the api
resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_resend_email_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

# Create a lambda integration the API
resource "aws_apigatewayv2_integration" "resendEmail" {
  api_id = aws_apigatewayv2_api.lambda.id

  integration_uri    = aws_lambda_function.resendEmail.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

# Create API route and target
resource "aws_apigatewayv2_route" "resendEmail" {
  api_id = aws_apigatewayv2_api.lambda.id

  route_key = "POST /sendEmail"
  target    = "integrations/${aws_apigatewayv2_integration.resendEmail.id}"
}

# Logs for the api (Optional)
resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}

# Required permission
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.resendEmail.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.lambda.execution_arn}/*/*"
}
