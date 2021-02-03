#!/bin/bash
chmod +x clean.sh
docker-compose up -d
printf "Waiting 5 seconds for internal connections to be made"
sleep 5
docker-compose exec mongo sh -c "mongo < /scripts/seed.js"
printf "checking collections"
docker-compose exec mongo sh -c "mongo < /scripts/seed.test.js"
