module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "project44-vpc"
  cidr = "10.13.0.0/16"

  azs             = ["eu-central-1a", "eu-central-1b"]
  private_subnets = ["10.13.37.0/24"]
  public_subnets  = ["10.13.38.0/24"]
  database_subnets= ["10.13.40.0/24", "10.13.41.0/24"]
  enable_dns_hostnames = true
}