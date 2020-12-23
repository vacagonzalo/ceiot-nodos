#!/bin/bash

IMAGE_NAME=oitc/modbus-server:lastest

MODBUS_PORT=5020

CONTAINER_NAME=modbus-service
CONTAINER_PORT=$MODBUS_PORT

MACHINE_PORT=$MODBUS_PORT

docker run \
--rm \
-it \
-p $MACHINE_PORT:$CONTAINER_PORT \
$IMAGE_NAME