#!/bin/bash
#Script to start the front end application. Our quiz.

docker start ionic
docker exec -it ionic ionic serve