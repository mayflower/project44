deploy-backend:
	$(MAKE) -C backend/ build
	cd infra/project44 && terraform apply -var="redeploy_lambdas=true"

build-frontend:
	cd frontend/project-44 && npm ci && REACT_APP_API_ENDPOINT="https://api.project44.mayflower.tech" npm run build

deploy-frontend: build-frontend
	cd infra/project44 && terraform apply
	