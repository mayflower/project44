module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "2.9.3"

  aliases = ["www.${var.project_name}.${var.domain_name}", "${var.project_name}.${var.domain_name}"]
  viewer_certificate = {
    acm_certificate_arn            = module.acm_certificate_for_cf.acm_certificate_arn
    cloudfront_default_certificate = false
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2019"

  }
  comment = "Cloudfront Distribution for ${var.project_name}'s frontend bucket"
  enabled = var.enable_cloudfront_distributions

  price_class         = "PriceClass_100" # see https://docs.aws.amazon.com/de_de/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html
  retain_on_delete    = var.force_destroy
  wait_for_deployment = false

  default_cache_behavior = {
    target_origin_id       = "${var.project_name}-frontend-origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    query_string           = false
  }

  default_root_object = "index.html"
  is_ipv6_enabled     = true

  create_origin_access_identity = true
  origin_access_identities = {
    s3_frontend_origin_oai = "OAI for project44 React App's bucket."
  }

  origin = {
    "${var.project_name}-frontend-origin" = {
      domain_name = module.s3_bucket.s3_bucket_bucket_regional_domain_name
      s3_origin_config = {
        origin_access_identity = "s3_frontend_origin_oai"
      }
    }
  }
}
