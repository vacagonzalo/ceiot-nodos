#!/bin/bash

IMAGE_NAME=redis

CONTAINER_NAME=redis
CONTAINER_PORT=6379

MACHINE_PORT=6379

printf "=====================================================================\n"
printf "imagen: $IMAGE_NAME\n"
printf "nombre del contenedor: $CONTAINER_NAME\n"
printf "puerto expuesto: $MACHINE_PORT\n"
printf "=====================================================================\n"

docker run \
--rm \
--name $CONTAINER_NAME \
-p $MACHINE_PORT:$CONTAINER_PORT \
-d \
$IMAGE_NAME

printf "waiting for 5 seconds"
sleep 5