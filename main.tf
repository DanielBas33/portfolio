provider "aws" {
  region = "eu-west-1"
}

##### Creating an S3 Bucket #####
resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "dbd-portfolio-bucket"

}

resource "aws_s3_bucket_website_configuration" "portfolio_bucket_config" {
  bucket = aws_s3_bucket.portfolio_bucket.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket                  = aws_s3_bucket.portfolio_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.portfolio_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action = [
          "s3:GetObject"
        ]
        Resource = [
          "${aws_s3_bucket.portfolio_bucket.arn}/*"
        ]
      }
    ]
  })
}

## AWS Route53 
resource "aws_route53_zone" "my-aws-project" {
  name = "my-aws-project.com."
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.my-aws-project.zone_id
  name    = "www"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.my-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.my-distribution.hosted_zone_id
    evaluate_target_health = false
  }

}
