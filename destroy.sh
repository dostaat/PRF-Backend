#!/bin/bash
# My first script

docker stop node angular ionic
docker rm node angular ionic
docker rmi node-backend angular-workbench ionic-workbench
