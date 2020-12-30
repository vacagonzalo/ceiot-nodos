#!/bin/bash

IMAGE_NAME=eclipse-mosquitto

CONTAINER_NAME=mosquitto
CONTAINER_PORT=1883

MACHINE_PORT=1883

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