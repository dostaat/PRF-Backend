FROM node

RUN apt-get update
RUN apt-get install -y git telnet
RUN git config --global http.sslVerify false

WORKDIR /var/munka

#RUN git clone https://github.com/dostaat/PRF-Backend.git
WORKDIR /var/munka/PRF-Backend
RUN npm install

#CMD node server.js
