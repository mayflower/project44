module "bets_table" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name      = "bets-table"
  hash_key  = "PK"
  range_key = "SK"

  global_secondary_indexes = [
    {
      name            = "ReverseIndex"
      hash_key        = "SK"
      range_key       = "PK"
      projection_type = "KEYS_ONLY"
    }
  ]

  attributes = [
    {
      name = "PK"
      type = "S"
    },
    {
      name = "SK"
      type = "S"
    }
  ]
}

data "aws_iam_policy_document" "dynamodb-crud-policy" {
  version = "2012-10-17"
  statement {
    actions = [
      "dynamodb:BatchGetItem",
      "dynamodb:BatchWriteItem",
      "dynamodb:UpdateTimeToLive",
      "dynamodb:ConditionCheckItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:PartiQLUpdate",
      "dynamodb:Scan",
      "dynamodb:ListTagsOfResource",
      "dynamodb:Query",
      "dynamodb:UpdateItem",
      "dynamodb:PartiQLSelect",
      "dynamodb:GetShardIterator",
      "dynamodb:PartiQLInsert",
      "dynamodb:GetItem",
      "dynamodb:GetRecords",
      "dynamodb:PartiQLDelete",
      "dynamodb:ListStreams"
    ]
    resources = [module.bets_table.dynamodb_table_arn]
    effect    = "Allow"
  }
}

resource "aws_iam_policy" "dynamodb-crud-policy" {
  policy = data.aws_iam_policy_document.dynamodb-crud-policy.json
}
