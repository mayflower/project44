# Developing lamdas with localstack and SAM

[Localstack](https://localstack.cloud/)
[SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

## Install requirements

- [Python3](https://realpython.com/installing-python/)

- [pip3](https://pip.pypa.io/en/stable/installation/)

- [AWS-CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS-CLI_LOCAL](https://github.com/localstack/awscli-local)

- [SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [SAM_LOCAL](https://github.com/localstack/aws-sam-cli-local)

- [Docker](https://docs.docker.com/get-docker/)

- [VScode](https://code.visualstudio.com/download)

- Make

## Setup

### Start local DynamoDB and API Gateway

make start-localstack

### Create DynamoDB table

make create-table

## Start developing your lambda

Uncomment lambda entry in template.yaml

make dev-api
