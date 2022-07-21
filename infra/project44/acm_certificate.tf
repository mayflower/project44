module "acm_certificate" {
  source              = "terraform-aws-modules/acm/aws"
  version             = "~> v3.4"
  domain_name         = "*.${var.project_name}.${var.domain_name}"
  zone_id             = data.aws_route53_zone.zone.id
  wait_for_validation = true
}

provider "aws" {
  alias  = "aws_acm_cf"
  region = "us-east-1"
}

module "acm_certificate_for_cf" {
  source                    = "terraform-aws-modules/acm/aws"
  version                   = "~> v3.4"
  domain_name               = "${var.project_name}.${var.domain_name}"
  subject_alternative_names = ["www.${var.project_name}.${var.domain_name}"]

  zone_id             = data.aws_route53_zone.zone.id
  wait_for_validation = true
  providers = {
    aws = aws.aws_acm_cf
  }
}
