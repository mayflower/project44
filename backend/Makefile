start-localstack:
	docker network create localstack
	docker run -d --rm --name localstack --network localstack -p 4566:4566 -p 4510-4559:4510-4559 -e SERVICES=dynamodb,ses,lambda localstack/localstack
stop-localstack:
	docker kill localstack
	docker network remove localstack
restart-localstack:
	docker container restart localstack
create-table:
	AWS_DEFAULT_REGION=us-east-1 awslocal dynamodb create-table --cli-input-json file://table.json
drop-table:
	AWS_DEFAULT_REGION=us-east-1 awslocal dynamodb delete-table --table-name Bets
reset-table: drop-table create-table
dev-api:
	AWS_DEFAULT_REGION=us-east-1 samlocal local start-api --docker-network localstack --warm-containers EAGER
install-fetchBets:
	cd fetchBets && echo "TODO"
install-fetchBet:
	cd fetchBet && echo "TODO"
install-updateBet:
	cd updateBet && echo "TODO"
install-createBet:
	cd createBet && echo "TODO"
install: install-fetchBets install-fetchBet install-updateBet install-createBet

build-fetchBets:
	cd fetchBets && echo "TODO"
build-fetchBet:
	cd fetchBet && echo "TODO"
build-updateBet:
	cd updateBet && echo "TODO"
build-createBet:
	cd createBet && yecho "TODO"
build: build-fetchBets build-fetchBet build-updateBet build-createBet
logs:
	docker logs localstack
list-bets:
	awslocal dynamodb scan --table-name Bets
