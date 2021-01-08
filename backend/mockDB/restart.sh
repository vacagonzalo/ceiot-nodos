#!/bin/bash
DB=mongo
CACHE=redis
docker exec $DB sh -c "mongo < /scripts/drop.js"
docker exec $DB sh -c "mongo < /scripts/mockData.js"
docker exec $CACHE sh -c "redis-cli FLUSHALL"
docker exec $CACHE sh -c "redis-cli SET xxxx.yyyy.zzzz 3"