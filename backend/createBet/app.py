import boto3
from boto3.dynamodb.types import TypeSerializer
from marshmallow_dataclass import dataclass
from decimal import Decimal
import uuid
import simplejson as json

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
    class User:
        userId: str
        nickname: str
        mail: str

    @dataclass
    class CriteriaOption:
        title: str
        description: str
        probability: Decimal

    @dataclass
    class Competitor:
        userId: str
        nickname: str
        mail: str
        wager: int
        criteriaIndex: int

    @dataclass
    class Bet:
        title: str
        description: str
        criteria: list[CriteriaOption]
        expirationTime: str
        creator: User
        minimumWager: Decimal
        gain: Decimal
        competitors: list[Competitor]
        PK: str
        SK: str

    betId = f"bet#${str(uuid.uuid4())}"
    item = json.loads(event["body"], parse_float=Decimal)
    print(item)
    creator = item["creator"]
    creatorId = f"user#${uuid.uuid5(uuid.NAMESPACE_URL, creator['mail'])}"
    creator.update({'userId': creatorId})
    item.update({'PK': betId, 'SK': betId, 'creator': creator})
    for competitor in item["competitors"]:
        competitorId = f"user#${uuid.uuid5(uuid.NAMESPACE_URL, competitor['mail'])}"
        competitor['userId'] = competitorId
    serializedItem = {k: serializer.serialize(v) for k,v in Bet.Schema().dump(item).items() if v != ""}
    client.put_item(TableName='Bets', Item=serializedItem)
    return {
        "statusCode": 200,
        "body": json.dumps(item,use_decimal=True),
    }
