#!/bin/bash

IMAGE_NAME=mongo

CONTAINER_NAME=mongodb
CONTAINER_PORT=27017
CONTAINER_DIRECTORY=/scripts

MACHINE_PORT=27017
MACHINE_DIRECTORY=$PWD/mockDB

printf "=====================================================================\n"
printf "imagen: $IMAGE_NAME\n"
printf "nombre del contenedor: $CONTAINER_NAME\n"
printf "directorio db: $MACHINE_DIRECTORY\n"
printf "puerto expuesto: $MACHINE_PORT\n"
printf "=====================================================================\n"

docker run \
--rm \
--name $CONTAINER_NAME \
-p $MACHINE_PORT:$CONTAINER_PORT \
-v $MACHINE_DIRECTORY:$CONTAINER_DIRECTORY \
-d \
$IMAGE_NAME

printf "waiting for 5 seconds"
sleep 5
docker exec $CONTAINER_NAME sh -c "mongo < /scripts/mockData.js"