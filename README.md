Alap kiírás:
Minden választott témának két komponensbõl kell állnia: egy NodeJS szerverbõl (mögötte MongoDB-vel), és egy Angular kliensbõl. A témák alapvetõ célja, hogy az órai tudás gyakorlása, elsajátítása mellett beletanuljatok kissé a webfejlesztõi mentalitásba is, minden témához igyekeztem olyan kritériumot is írni, amely igényli az utánaolvasást, minta kódok, új modulok keresését, értelmezését is.

A csapatok méretétõl függõen a következõk a követelmények:

A szorgalmi idõszak utolsó gyakorlatán minden csapatnak be kell mutatnia a fejlesztését (ha valakinek nem alkalmas az idõpont, vagy esetleg kicsúsznánk az idõbõl az idei magasabb létszámunk miatt, akkor lesz lehetõség egyedi védési idõpontot is egyeztetni - természetesen ha egy csapat már az utolsó hét elõtt kész mindennel, akkor is nyugodtan jelentkezhetnek, bemutathatják egy megbeszélt idõpontban korábban is). A védés pontos menetérõl még teszek majd fel elõtte infókat, alapvetõen azt szeretném, ha minden csapat projektoron, laptoppal, a többiek elõtt mutathatná be a munkáját.

2 fõs csapat: csak azt értékelem, hogy a NodeJS szerver és az Angular kliens teljesítik-e a követelményeket, a külcsínyt, css-t nem, tehát ha hibátlan a NodeJS szerver és az Angular projekt is megfelelõen van modulokra, komponensekre, route-okra bontva a szempontok teljesítése mellett, viszont úgy fest megjelenésében, mintha valaki natúr html tageket hányt volna formázások nélkül az oldalakra, az simán max pont

3 fõs csapat: a NodeJS szerver és az Angular kliens mellett az értékelésnél figyelembe fogom venni a projekt megjelenését is, ehhez érdemes natur Angular helyett az Ionic keretrendszert használni, vagy még inkább a népszerû Angular Material modult (erre gyakorlaton nem lesz idõnk, de mind beüzemelésérõl, mind használatáról milliónyi tutorial található), amellyel az Angular kliensek nagyon gazdag, már-már a Google saját fejlesztõi felületeire emlékeztetõ megjelenést kaphatnak minimális designeri tudás mellett is. Fontos szempont a reszponzivitás, a kijelzõ méretének megfelelõen változzon a tagolás, méretezés, esetleg tûnjenek el kevésbé fontos elemek, az alkalmazás mutasson jól minden platformon (erre a Material, a Bootstrap és az Ionic is támogat elég sok módszert)

4 fõs csapat: a témaválasztást követõen egyeztetni fogok a csapatvezetõvel, a 3 fõs csapat követelményeinek teljesítésén túl kelleni fog még egy különálló, Ionic-ban megírt egyszerû mobil kliens, amely ugyanazzal a NodeJS szerverrel kommunikál, mint a böngészõs Angular app, viszont más funkciót tölt be, pl. adatfeltöltés, adminisztrátori szerepkör, statisztika megjelenítése, stb. Ezt lehetõség szerint a bemutatón majd egy valódi Android eszközön kellene bemutatni (WiFi biztosítva lesz a prezentációhoz)


2. Kvízjáték
a) NodeJS szerver, amely képes usereket tárolni adminisztrátor és kitöltõ szerepkörökkel (utóbbinak legyen pontszáma), valamint tetszõleges hosszúságú kvíz sorozatokat, melyekben meg van jelölve a helyes válasz. A NodeJS szerver rendelkezzen egy “debug opcióval”, ha a DEBUG_QUIZ környezeti változó (process.env.DEBUG_QUIZ -ként érhetõ el a kódban) be van állítva, ne a szerver induljon el, hanem az összes meglevõ kérdéssort exportálja egy .xls táblázatba, majd álljon le az alkalmazás futása.
b) Angular webapp, ahol csak kitöltõként lehet regisztrálni. Ha valaki admin jogosultsággal lép be, lehetõsége van új kérdéssort felvinni, a meglevõket törölni, kipróbálni, ha kitöltõ, akkor ki tudja tölteni a kérdéssorokat, és a helyesen megoldottakért pontokat kaphat. A kvízekben a kérdések választási lehetõségei legyenek megkeverve, és legyen egy toplista, amelyet mind az adminok, mind a kitöltõk meg tudnak tekinteni, és a kitöltõk találhatóak rajta, pontszám szerint rangsorolva

Extra feladat:
Meg is nyertétek a Kvízjátékot (mindjárt megy a lista). Az extra feladat a következõ lenne: a NodeJS szerver tároljon egy Cities nevû modelt is, amely városok neveit tárolja szigorúan kisbetûs konvertálással, minden városhoz tartozik egy számérték is, és két koordináta is. Az Ionic alkalmazás, aminek neve legyen QuickQuiz, a következõket teljesítse:
- használja a Geolocation plugint, amellyel felfedezi az eszköz aktuális helyét és ajánlja fel neki minden indításkor, hogy melyik várost kívánja választani (https://ionicframework.com/docs/native/geolocation/), a koordináta alapján, a városok nevei jelenjenek meg úgy konvertálva, hogy minden whitespace után az elsõ betû legyen nagy
- ha az adott város neve még nem szerepel a listában, az adott user képes legyen azt regisztrálni
- a város kiválasztása után jelenjen meg két gomb, az egyik Status, a másik Quiz Me! felirattal, utóbbira kattintva az app kapjon a szervertõl egy random kérdést egy random kérdéssorból. Minden helyes válasz növelje eggyel az adott város pontszámát
- a Status gombra nyomva jelenjen meg az adott város pontszáma és a top 5 legtöbb pontszámot elért város a pontszámaikkal együtt.
- ez az egész így durván 3-4 nagyon minimalista komponens és egy service egy Ionic keretrendszerben
Ez így megfelelne számotokra extraként? Kérlek, legkésõbb a holnapi esti óráig válaszoljatok

TODO:
0. lépés MINDENKI izzítsa be a sulis rendszert otthoni gépen is!!!

Feladatok:
- Belépõ felület / Regisztráció -> netrõl behúzható
- User authentication
- Jogosultsági körök
- Statisztika
- Játék
- Admin mûveletek

Backend:
- Adatbázis tervezés, és csatlakozás - Kristóf
- Szerver indítás, session kezelés + authentikáció (csak 1-szer legyen bejelentkezve!) - Szilveszter
- Kérdés megjelenítés, válasz fogadás, ellenõrzés - játékmenet (pontok számolása) - Abigél
- Kérdésbank módosítás (admin) - Ábel
+ Meglévõ városok lekérése (listázza a legközelebb levõket) + ha nincs, hozzá lehessen adni - Ábel
Frontend:
- Kérdés kezelõ felület (admin) + import - Ábel
- Statisztika/profil felület + fõmenü (+1 gomb az adminnak, +1 gomb a Quiz Me!-nek) - Kristóf
- Játék felület - Abigél
- Bejelentkezõ/Regisztrációs felület - Szilveszter
+ Fölugró ablakban location választás... még fixálni kell

Külcsín: getbootstrap

Kérdések:
Hogyan kell majd kommunikálnia a telefonnak a szerverrel? Hogyan tudjuk kinyitni a szervert/Indítani elérhetõ szervert?
Hogy mûködjön a + játék?
