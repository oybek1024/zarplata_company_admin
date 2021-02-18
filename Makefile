CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})

APP_CMD_DIR=${CURRENT_DIR}/cmd

IMG_NAME=${APP}
REGISTRY=${REGISTRY}
TAG=latest
ENV_TAG=latest
# Including
include .build_info


build-image:
	docker build --rm -t ${REGISTRY}/${PROJECT_NAME}/${APP}/${IMG_NAME}:${TAG} .
	docker tag ${REGISTRY}/${PROJECT_NAME}/${APP}/${IMG_NAME}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${APP}/${IMG_NAME}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}/${IMG_NAME}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}/${IMG_NAME}:${ENV_TAG}

.PHONY: build-image
