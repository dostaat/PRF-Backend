Utasítások:

1. cd node_server
2. docker build -t node-backend .
3. cd ..
4. cd angular_devserver
5. docker build -t angular-server .
6. cd ..
7. docker network create prf
8. docker run -i -d -p 5000:5000 --name node --network prf node-backend
9. Letöltöd az előző órai forráskódot (Angular) és megnyitod VSC-ben
10. docker run -i -d -p 4200:4200 --name angular --network prf -v $PWD:/var/munka angular-server
11. docker exec -it angular /bin/bash
12. cd /var/munka
13. npm install
14. ng serve --host 0.0.0.0

Megjegyzés: A NodeJS szerveren kell egy utolsó módosítás ahhoz, hogy ilyen típusú kliens-szerver kommunikáció működhessen, a server.js-ben még az app.listen előtt szerepeljen a következő rész (ebben a mintában ez már szerepel):

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});