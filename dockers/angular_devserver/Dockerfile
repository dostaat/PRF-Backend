FROM node

RUN apt-get update
RUN apt-get install -y git telnet
RUN git config --global http.sslVerify false

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm install -g @angular/cli --unsafe