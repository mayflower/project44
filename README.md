# project44

## Fronted

### How to get started

The following tools are required to run and develop in this repository:

- git ([how to install](https://git-scm.com/book/de/v2/Erste-Schritte-Git-installieren))
- node v16
  - Windows
    - [Download](https://nodejs.org/en/download/) the installer and run it
    - verify the installation with `node -v` and `npm -v`
  - Linux
    - Open the terminal
    - run `# apt get update` and `#apt get install nodejs`
    - verify the installation with `node -v` and `npm -v`
  - MacOS
    - Download and run the installer
    - verify the installation with `node -v` and `npm -v`

Checkout the repository with git clone. Change directories to `frontend` and run `npm install`. When this is
finished run `npm start` to start the local development server. On `localhost:3000` you can browse the frontend.

### Run locally

To run the project locally change directory to `frontend` and run `npm install` (if not done before) and `npm start`

## Backend

### Getting Started

[Development](backend/development.md)

### Developing with Dynamo DB

- [DynamoDB API Calls](https://docs.aws.amazon.com/de_de/amazondynamodb/latest/developerguide/HowItWorks.API.html#HowItWorks.API.DataPlane)
- [DynamoDB Moddeling](https://www.alexdebrie.com/posts/dynamodb-one-to-many/)

### Developing with Lambda and API Gateway

- [Lambda with API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)

## API GW Mocks

Every mock response is defined in `infra/project44/mocks/`
Please adjust structural changes to the data alsow to the openapi.json
