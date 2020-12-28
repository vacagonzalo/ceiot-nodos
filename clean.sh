#!/bin/bash
docker-compose down
docker rmi vaca/db-api
docker rmi vaca/hrv
docker rmi vaca/pv
clear