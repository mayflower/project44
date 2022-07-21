data "aws_route53_zone" "zone" {
  name = var.domain_name
}

resource "aws_route53_record" "api" {
  name    = aws_api_gateway_domain_name.rest_api.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.zone.id

  alias {
    name                   = aws_api_gateway_domain_name.rest_api.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.rest_api.regional_zone_id
    evaluate_target_health = true
  }
}


resource "aws_route53_record" "root_record" {
  name    = "${var.project_name}.${var.domain_name}"
  type    = "A"
  zone_id = data.aws_route53_zone.zone.id

  alias {
    name                   = module.cloudfront.cloudfront_distribution_domain_name
    zone_id                = module.cloudfront.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_record" {
  name    = "www.${var.project_name}.${var.domain_name}"
  type    = "A"
  zone_id = data.aws_route53_zone.zone.id

  alias {
    name                   = module.cloudfront.cloudfront_distribution_domain_name
    zone_id                = module.cloudfront.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = false
  }
}
