#!/bin/bash
# My first script

docker build -t node-backend -f dockers/node_server/nodedocker dockers/node_server
docker build -t angular-workbench -f dockers/angular_devserver/Dockerfile dockers/angular_devserver
wait

docker run -i -d --name node -p 5000:5000 -v $PWD/PRF-Backend:/var/munka/PRF-Backend node-backend
docker run -i -d --name angular -p 4200:4200 -v $PWD/PRF-Frontend:/var/munka angular-workbench
wait
