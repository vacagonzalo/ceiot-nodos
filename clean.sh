#!/bin/bash
docker-compose down
docker rmi vaca/backend
docker rmi vaca/hrv
docker rmi vaca/pv
docker rmi vaca/auth-api
clear