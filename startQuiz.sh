#!/bin/bash
#Script to start the front end application. Our quiz.

docker start angular
docker exec -it angular ng serve --host 0.0.0.0