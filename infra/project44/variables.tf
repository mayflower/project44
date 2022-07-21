variable "domain_name" {
  default = "mayflower.tech"
}

variable "project_name" {
  default = "project44"
}

variable "force_destroy" {
  default = true
}

variable "enable_cloudfront_distributions" {
  default = true
}

variable "mock_create" {
  type    = bool
  default = true
}

variable "mock_fetchBet" {
  type    = bool
  default = true
}

variable "mock_fetchBets" {
  type    = bool
  default = true
}

variable "mock_update" {
  type    = bool
  default = true
}

variable "mock_delete" {
  type    = bool
  default = true
}

variable "redeploy_lambdas" {
  type    = bool
  default = false
}
