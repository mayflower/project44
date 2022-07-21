terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.12.1"
    }
  }

  backend "s3" {
    bucket = "project44-terraform-state"
    key    = "github_runner/terraform.tfstate"
    region = "eu-central-1"
  }
}

provider "aws" {
  default_tags {
    tags = {
      "terraform" = true
      "env"       = "dev"
      "project"   = "github_runner"
    }
  }
}
