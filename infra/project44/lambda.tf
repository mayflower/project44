
module "createBet_lambda" {
  source                   = "terraform-aws-modules/lambda/aws"
  function_name            = "createBet"
  policy                   = aws_iam_policy.dynamodb-crud-policy.arn
  attach_policy            = true
  handler                  = "index.handler"
  runtime                  = "nodejs14.x"
  source_path              = "../../backend/createBet/build"
  environment_variables    = { "TABLENAME" : "bets-table" }
  ignore_source_code_hash  = !var.redeploy_lambdas
  recreate_missing_package = var.redeploy_lambdas
}

module "fetchBets_lambda" {
  function_name            = "fetchBets"
  source                   = "terraform-aws-modules/lambda/aws"
  policy                   = aws_iam_policy.dynamodb-crud-policy.arn
  attach_policy            = true
  handler                  = "index.handler"
  runtime                  = "nodejs14.x"
  source_path              = "../../backend/fetchBets/build"
  environment_variables    = { "TABLENAME" : "bets-table" }
  ignore_source_code_hash  = !var.redeploy_lambdas
  recreate_missing_package = var.redeploy_lambdas
}

module "deleteBet_lambda" {
  function_name            = "deleteBet"
  source                   = "terraform-aws-modules/lambda/aws"
  policy                   = aws_iam_policy.dynamodb-crud-policy.arn
  attach_policy            = true
  handler                  = "index.handler"
  runtime                  = "nodejs14.x"
  source_path              = "../../backend/dummy"
  environment_variables    = { "TABLENAME" : "bets-table" }
  ignore_source_code_hash  = !var.redeploy_lambdas
  recreate_missing_package = var.redeploy_lambdas
}

module "fetchBet_lambda" {
  function_name            = "fetchBet"
  source                   = "terraform-aws-modules/lambda/aws"
  policy                   = aws_iam_policy.dynamodb-crud-policy.arn
  attach_policy            = true
  handler                  = "index.handler"
  runtime                  = "nodejs14.x"
  source_path              = "../../backend/fetchBet/build"
  environment_variables    = { "TABLENAME" : "bets-table" }
  ignore_source_code_hash  = !var.redeploy_lambdas
  recreate_missing_package = var.redeploy_lambdas
}

module "updateBet_lambda" {
  function_name            = "updateBet"
  source                   = "terraform-aws-modules/lambda/aws"
  policy                   = aws_iam_policy.dynamodb-crud-policy.arn
  attach_policy            = true
  handler                  = "index.handler"
  runtime                  = "nodejs14.x"
  source_path              = "../../backend/updateBet/build"
  environment_variables    = { "TABLENAME" : "bets-table" }
  ignore_source_code_hash  = !var.redeploy_lambdas
  recreate_missing_package = var.redeploy_lambdas
}

