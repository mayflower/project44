terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.12.1"
    }
  }

  backend "s3" {
    bucket = "project44-terraform-state"
    key    = "project44/terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  default_tags {
    tags = {
      "terraform" = true
      "env"       = "dev"
      "project"   = "project44"
    }
  }
}
