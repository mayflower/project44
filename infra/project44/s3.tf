locals {
  bucket_name = format("%s-frontend-origin", var.project_name)
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    sid = "2012-10-17"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      format("%s/*", module.s3_bucket.s3_bucket_arn)
    ]

    principals {
      type = "AWS"
      identifiers = module.cloudfront.cloudfront_origin_access_identity_iam_arns
    }
  }
}

module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  # General
  bucket                   = local.bucket_name
  force_destroy            = var.force_destroy

  # ACL
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  website                 = {
    index_document = "index.html"
  }

  attach_policy           = true
  policy                  = data.aws_iam_policy_document.bucket_policy.json
}