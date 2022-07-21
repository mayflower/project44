locals {
  createBetBindingMock = jsonencode({
    "type" : "mock",
    "responses" : {
      "default" : {
        "statusCode" : "200",
        "responseParameters" : {
          "method.response.header.Access-Control-Allow-Headers" : "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
          "method.response.header.Access-Control-Allow-Methods" : "'*'",
          "method.response.header.Access-Control-Allow-Origin" : "'*'"
        },
        "responseTemplates" : {
          "application/json" : "${file("mocks/createBet.json")}"
        }
      }
    },
    "requestTemplates" : {
      "application/json" : "{\"statusCode\": 200}"
    },
    "passthroughBehavior" : "when_no_match"
  })

  fetchBetsBindingMock = jsonencode({
    "requestTemplates" : {
      "application/json" : "{\"statusCode\": 200}"
    },
    "responses" : {
      "default" : {
        "statusCode" : "200",
        "responseParameters" : {
          "method.response.header.Access-Control-Allow-Headers" : "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
          "method.response.header.Access-Control-Allow-Methods" : "'*'",
          "method.response.header.Access-Control-Allow-Origin" : "'*'"
        },
        "responseTemplates" : {
          "application/json" : "${file("mocks/fetchBets.json")}"
        }
      }
    },
    "passthroughBehavior" : "when_no_match",
    "type" : "mock"
  })


  fetchBetBindingMock = jsonencode({
    "requestTemplates" : {
      "application/json" : "{\"statusCode\": 200}"
    },
    "responses" : {
      "default" : {
        "statusCode" : "200",
        "responseParameters" : {
          "method.response.header.Access-Control-Allow-Headers" : "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
          "method.response.header.Access-Control-Allow-Methods" : "'*'",
          "method.response.header.Access-Control-Allow-Origin" : "'*'"
        },
        "responseTemplates" : {
          "application/json" : "${file("mocks/fetchBet.json")}"
        }
      }
    },
    "passthroughBehavior" : "when_no_match",
    "type" : "mock"
  })


  updateBetBindingMock = jsonencode({
    "responses" : {
      "default" : {
        "statusCode" : "200",
        "responseParameters" : {
          "method.response.header.Access-Control-Allow-Headers" : "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
          "method.response.header.Access-Control-Allow-Methods" : "'*'",
          "method.response.header.Access-Control-Allow-Origin" : "'*'"
        },
        "responseTemplates" : {
          "application/json" : "${file("mocks/updateBet.json")}"
        }
      }
    },
    "requestTemplates" : {
      "application/json" : "{\"statusCode\": 200}"
    },
    "passthroughBehavior" : "when_no_match",
    "type" : "mock"
  })

  deleteBetBindingMock = jsonencode({
    "responses" : {
      "default" : {
        "statusCode" : "200",
        "responseParameters" : {
          "method.response.header.Access-Control-Allow-Headers" : "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
          "method.response.header.Access-Control-Allow-Methods" : "'*'",
          "method.response.header.Access-Control-Allow-Origin" : "'*'"
        },
      }
    },
    "requestTemplates" : {
      "application/json" : "{\"statusCode\": 200}"
    },
    "passthroughBehavior" : "when_no_match",
    "type" : "mock"
  })
}
