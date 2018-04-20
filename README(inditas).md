A projektindítás kiegészítve shell scriptekkel!

1. ./build.sh

Utána pedig:

docker exec -it angular /bin/bash
cd /var/munka/
npm install
chmod -R 777 .
ng serve --host 0.0.0.0


1. Kérdés: hogyan lehet összehangolni különböző gépeken futó szervert és klienst a bemutatóhoz?
ngrok - ingyenes program, csak le kell tölteni az ngrok.com-ról és kicsomagolni
majd ahhoz, hogy elérhetővé tegyük ezt a dockerben futó node-backend szervert:
./ngrok http 5000
 
Tesztelése:    http://a471ae29.ngrok.io/rest/user/greeting
(minden indításnál új random url lesz az eredmény, kell valamilyen módszer, hogy az url beállítható legyen - pl. egy Settings komponens, ami ment a sessionStorage-ba)

A sessionStorage használatát bemutatja az utils/storage.service.ts

Tipp: rengeteg tutorial és leírás különböző Angular és más webes keretrendszerek összeállításához: https://scotch.io/

2. kérdés: hogyan védjünk le url-eket, és dobjuk vissza onnan a felhasználót, ha nincs rá jogosultsága
CanAuthenticate interfész bevonása az app.routes konfigurációban!
Az auth.service.ts implementálja (jelenleg csak egy "kamu" azonosítással) - az AboutComponent csak akkor lesz elérhető, ha van egy valid szerverválasz mentve a sessionStorage-ban
(Ez azért nem valid így, mert a sessionStorage-ba manuálisan is be lehet nyúlni, és módosítani, de a működési logikát legalább szemlélteti :) )