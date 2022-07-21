locals {
  createBetLampdaBinding = jsonencode({
    uri : module.createBet_lambda.lambda_function_invoke_arn
    httpMethod : "POST"
    type : "aws_proxy"
  })
  fetchBetsLampdaBinding = jsonencode({
    uri : module.fetchBets_lambda.lambda_function_invoke_arn
    httpMethod : "POST"
    type : "aws_proxy"
  })
  fetchBetLampdaBinding = jsonencode({
    uri : module.fetchBet_lambda.lambda_function_invoke_arn
    httpMethod : "POST"
    type : "aws_proxy"
  })
  updateBetLampdaBinding = jsonencode({
    uri : module.updateBet_lambda.lambda_function_invoke_arn
    httpMethod : "POST"
    type : "aws_proxy"
  })
  deleteBetLampdaBinding = jsonencode({
    uri : module.deleteBet_lambda.lambda_function_invoke_arn
    httpMethod : "POST"
    type : "aws_proxy"
  })
}

data "template_file" "openapi" {
  template = file("../../openapi.json")
  vars = {
    createBetBinding = var.mock_create ? local.createBetBindingMock : local.createBetLampdaBinding
    fetchBetsBinding = var.mock_fetchBets ? local.fetchBetsBindingMock : local.fetchBetsLampdaBinding
    fetchBetBinding  = var.mock_fetchBet ? local.fetchBetBindingMock : local.fetchBetLampdaBinding
    updateBetBinding = var.mock_update ? local.updateBetBindingMock : local.updateBetLampdaBinding
    deleteBetBinding = var.mock_delete ? local.deleteBetBindingMock : local.deleteBetLampdaBinding
  }
}

resource "aws_api_gateway_rest_api" "rest_api" {
  body = data.template_file.openapi.rendered


  name = "project44-rest-api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_domain_name" "rest_api" {
  domain_name              = "api.${var.project_name}.${var.domain_name}"
  regional_certificate_arn = module.acm_certificate.acm_certificate_arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "api_gateway_deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest_api.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.rest_api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "dev" {
  deployment_id = aws_api_gateway_deployment.api_gateway_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.rest_api.id
  stage_name    = "dev"

}

resource "aws_api_gateway_base_path_mapping" "dev" {
  api_id      = aws_api_gateway_rest_api.rest_api.id
  stage_name  = aws_api_gateway_stage.dev.stage_name
  domain_name = aws_api_gateway_domain_name.rest_api.domain_name
}

resource "aws_lambda_permission" "createBet_lambda1" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.createBet_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "fetchBet_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.fetchBet_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
}


resource "aws_lambda_permission" "fetchBets_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.fetchBets_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/GET/bet"
}


resource "aws_lambda_permission" "updateBet_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.updateBet_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
}


resource "aws_lambda_permission" "deleteBet_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.deleteBet_lambda.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.rest_api.execution_arn}/*/*"
}
