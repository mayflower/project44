install:
	pipenv lock -r > requirements.txt
	pipenv run pip install --target . -r requirements.txt
	rm requirements.txt
	zip -r Deploy.zip .
