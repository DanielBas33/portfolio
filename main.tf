provider "aws" {
  region = "us-east-1"
}

##### Creating an S3 Bucket #####
resource "aws_s3_bucket" "portfolio_bucket" {
  bucket = "dbd-myportfolio-bucket"

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

# AWS Route53 
data "aws_route53_zone" "my-existing-domain-zone" {
  name = "danielbasdelgado.com."
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.my-existing-domain-zone.zone_id
  name    = "www"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.my-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.my-distribution.hosted_zone_id
    evaluate_target_health = false
  }

}

# AWS CloudFront
resource "aws_cloudfront_distribution" "my-distribution" {
  origin {
    domain_name              = aws_s3_bucket.portfolio_bucket.bucket_regional_domain_name
    origin_id   = "S3-Origin"
  }


  aliases = ["www.danielbasdelgado.com"]

  enabled = true
    default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-Origin"

    viewer_protocol_policy = "redirect-to-https"

    min_ttl = 0
    default_ttl = 3600
    max_ttl = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

  }


  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  depends_on = [
    aws_acm_certificate.cert,
  ]
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.my-distribution.domain_name
}


# AWS Certificate Manager
resource "aws_acm_certificate" "cert" {
  domain_name       = "danielbasdelgado.com"
  
  validation_method = "DNS"
    subject_alternative_names = ["www.danielbasdelgado.com", "danielbasdelgado.com"]
  

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert-validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert-validation-record : record.fqdn]
}


resource "aws_route53_record" "cert-validation-record" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.my-existing-domain-zone.zone_id
}