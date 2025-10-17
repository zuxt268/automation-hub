.PHONY: run


run:
	docker compose down
	docker compose build automation-lab --no-cache
	docker compose up --build -d
	docker compose ps