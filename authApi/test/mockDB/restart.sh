#!/bin/bash
CONTAINER_NAME=mongo
docker exec $CONTAINER_NAME sh -c "mongo < /scripts/drop.js"
docker exec $CONTAINER_NAME sh -c "mongo < /scripts/mockData.js"