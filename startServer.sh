#/bin/bash
# Script to start the server, after you have built it with build.sh

docker start node

docker exec -it node node server.js
