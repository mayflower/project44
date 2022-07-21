
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "runner-vpc"
  cidr = "10.0.0.0/16"

  azs            = ["eu-central-1a"]
  public_subnets = ["10.0.1.0/24"]

  enable_nat_gateway = true

  tags = {
    Terraform   = "true"
    Environment = "dev"
  }
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn-ami-hvm-*-x86_64-gp2"]
  }
}

module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4.0"

  name        = "runner_security_group"
  description = "Security group for example usage with EC2 instance"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = []
  egress_rules        = ["all-all"]
}


module "ec2_instance" {
  source  = "terraform-aws-modules/ec2-instance/aws"
  version = "~> 3.0"

  name = "runner"

  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t2.medium"
  monitoring             = true
  vpc_security_group_ids = [module.security_group.security_group_id]
  availability_zone      = element(module.vpc.azs, 0)
  subnet_id              = element(module.vpc.public_subnets, 0)

  user_data = <<-EOT
  #!/bin/bash
  set -x
  export RUNNER_ALLOW_RUNASROOT=1
  useradd runner
  su runner
  cd /home/runner
  curl -o actions-runner-linux-x64-2.294.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.294.0/actions-runner-linux-x64-2.294.0.tar.gz
  echo "a19a09f4eda5716e5d48ba86b6b78fc014880c5619b9dba4a059eaf65e131780  actions-runner-linux-x64-2.294.0.tar.gz" | shasum -a 256 -c
  tar xzf ./actions-runner-linux-x64-2.294.0.tar.gz
  ./config.sh --url https://github.com/mayflower/project44 --token ${var.token}
  ./run.sh
  EOT
}
