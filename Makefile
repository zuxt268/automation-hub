.PHONY: rebuild


rebuild:
	docker compose down
	docker compose build --no-cache
	docker compose up -d
	docker compose ps