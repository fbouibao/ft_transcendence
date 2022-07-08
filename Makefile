CONTAINER_NAME = pong-game

IMAGE = pong-image

PORT = 8080

all: run

build:
	docker build -t $(IMAGE) .

run: delete build
	docker run -d -p $(PORT):$(PORT) --name=$(CONTAINER_NAME) $(IMAGE)

stop:
	@docker container stop $(CONTAINER_NAME) 2> /dev/null || true

delete: stop
	@docker container rm $(CONTAINER_NAME) 2> /dev/null || true

restart: delete run

shell:
	docker exec -it $(CONTAINER_NAME) sh

update:
	docker exec --workdir="/pong-game" $(CONTAINER_NAME) npm install
	docker cp . $(CONTAINER_NAME):pong-game

watch:
	docker container logs --follow $(CONTAINER_NAME)
