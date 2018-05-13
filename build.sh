#!/bin/bash
# My first script

docker build -t node-backend -f dockers/node_server/nodedocker dockers/node_server
docker build -t angular-workbench -f dockers/angular_devserver/Dockerfile dockers/angular_devserver
docker build -t ionic-workbench dockers/ionic_devserver
wait

docker run -i -d --name node -p 5000:5000 -v $PWD/PRF-Backend:/var/munka/PRF-Backend node-backend
docker run -i -d --name angular -p 4200:4200 -v $PWD/PRF-Frontend:/var/munka angular-workbench
docker run -t -d --name ionic -p 8100:8100 -v $PWD/PRF-Mobile:/var/munka/QuickQuiz ionic-workbench
wait

# Run only this 2 line if some new dependency is added
docker exec -it node ./startup.sh
docker exec -it angular ./startup.sh