import json
import boto3
import json
from boto3.dynamodb.types import TypeSerializer
from marshmallow_dataclass import dataclass

# import requests


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

    client = boto3.client('dynamodb',endpoint_url='http://localstack:4566')
    serializer = TypeSerializer()

    @dataclass
    class Bet:
        Foo: str
        PK: str
        SK: str


    item = json.loads(event["body"])
    item.update({'PK':'123', 'SK': '123'})
    serializedItem = {k: serializer.serialize(v) for k,v in Bet.Schema().dump(item).items() if v != ""}
    client.put_item(TableName='Bets', Item=serializedItem)
    return {
        "statusCode": 200,
        "body": {'success':'OK'},
    }
