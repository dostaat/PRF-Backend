Alap ki�r�s:
Minden v�lasztott t�m�nak k�t komponensb�l kell �llnia: egy NodeJS szerverb�l (m�g�tte MongoDB-vel), �s egy Angular kliensb�l. A t�m�k alapvet� c�lja, hogy az �rai tud�s gyakorl�sa, elsaj�t�t�sa mellett beletanuljatok kiss� a webfejleszt�i mentalit�sba is, minden t�m�hoz igyekeztem olyan krit�riumot is �rni, amely ig�nyli az ut�naolvas�st, minta k�dok, �j modulok keres�s�t, �rtelmez�s�t is.

A csapatok m�ret�t�l f�gg�en a k�vetkez�k a k�vetelm�nyek:

A szorgalmi id�szak utols� gyakorlat�n minden csapatnak be kell mutatnia a fejleszt�s�t (ha valakinek nem alkalmas az id�pont, vagy esetleg kics�szn�nk az id�b�l az idei magasabb l�tsz�munk miatt, akkor lesz lehet�s�g egyedi v�d�si id�pontot is egyeztetni - term�szetesen ha egy csapat m�r az utols� h�t el�tt k�sz mindennel, akkor is nyugodtan jelentkezhetnek, bemutathatj�k egy megbesz�lt id�pontban kor�bban is). A v�d�s pontos menet�r�l m�g teszek majd fel el�tte inf�kat, alapvet�en azt szeretn�m, ha minden csapat projektoron, laptoppal, a t�bbiek el�tt mutathatn� be a munk�j�t.

2 f�s csapat: csak azt �rt�kelem, hogy a NodeJS szerver �s az Angular kliens teljes�tik-e a k�vetelm�nyeket, a k�lcs�nyt, css-t nem, teh�t ha hib�tlan a NodeJS szerver �s az Angular projekt is megfelel�en van modulokra, komponensekre, route-okra bontva a szempontok teljes�t�se mellett, viszont �gy fest megjelen�s�ben, mintha valaki nat�r html tageket h�nyt volna form�z�sok n�lk�l az oldalakra, az sim�n max pont

3 f�s csapat: a NodeJS szerver �s az Angular kliens mellett az �rt�kel�sn�l figyelembe fogom venni a projekt megjelen�s�t is, ehhez �rdemes natur Angular helyett az Ionic keretrendszert haszn�lni, vagy m�g ink�bb a n�pszer� Angular Material modult (erre gyakorlaton nem lesz id�nk, de mind be�zemel�s�r�l, mind haszn�lat�r�l milli�nyi tutorial tal�lhat�), amellyel az Angular kliensek nagyon gazdag, m�r-m�r a Google saj�t fejleszt�i fel�leteire eml�keztet� megjelen�st kaphatnak minim�lis designeri tud�s mellett is. Fontos szempont a reszponzivit�s, a kijelz� m�ret�nek megfelel�en v�ltozzon a tagol�s, m�retez�s, esetleg t�njenek el kev�sb� fontos elemek, az alkalmaz�s mutasson j�l minden platformon (erre a Material, a Bootstrap �s az Ionic is t�mogat el�g sok m�dszert)

4 f�s csapat: a t�mav�laszt�st k�vet�en egyeztetni fogok a csapatvezet�vel, a 3 f�s csapat k�vetelm�nyeinek teljes�t�s�n t�l kelleni fog m�g egy k�l�n�ll�, Ionic-ban meg�rt egyszer� mobil kliens, amely ugyanazzal a NodeJS szerverrel kommunik�l, mint a b�ng�sz�s Angular app, viszont m�s funkci�t t�lt be, pl. adatfelt�lt�s, adminisztr�tori szerepk�r, statisztika megjelen�t�se, stb. Ezt lehet�s�g szerint a bemutat�n majd egy val�di Android eszk�z�n kellene bemutatni (WiFi biztos�tva lesz a prezent�ci�hoz)


2. Kv�zj�t�k
a) NodeJS szerver, amely k�pes usereket t�rolni adminisztr�tor �s kit�lt� szerepk�r�kkel (ut�bbinak legyen pontsz�ma), valamint tetsz�leges hossz�s�g� kv�z sorozatokat, melyekben meg van jel�lve a helyes v�lasz. A NodeJS szerver rendelkezzen egy �debug opci�val�, ha a DEBUG_QUIZ k�rnyezeti v�ltoz� (process.env.DEBUG_QUIZ -k�nt �rhet� el a k�dban) be van �ll�tva, ne a szerver induljon el, hanem az �sszes meglev� k�rd�ssort export�lja egy .xls t�bl�zatba, majd �lljon le az alkalmaz�s fut�sa.
b) Angular webapp, ahol csak kit�lt�k�nt lehet regisztr�lni. Ha valaki admin jogosults�ggal l�p be, lehet�s�ge van �j k�rd�ssort felvinni, a meglev�ket t�r�lni, kipr�b�lni, ha kit�lt�, akkor ki tudja t�lteni a k�rd�ssorokat, �s a helyesen megoldottak�rt pontokat kaphat. A kv�zekben a k�rd�sek v�laszt�si lehet�s�gei legyenek megkeverve, �s legyen egy toplista, amelyet mind az adminok, mind a kit�lt�k meg tudnak tekinteni, �s a kit�lt�k tal�lhat�ak rajta, pontsz�m szerint rangsorolva

Extra feladat:
Meg is nyert�tek a Kv�zj�t�kot (mindj�rt megy a lista). Az extra feladat a k�vetkez� lenne: a NodeJS szerver t�roljon egy Cities nev� modelt is, amely v�rosok neveit t�rolja szigor�an kisbet�s konvert�l�ssal, minden v�roshoz tartozik egy sz�m�rt�k is, �s k�t koordin�ta is. Az Ionic alkalmaz�s, aminek neve legyen QuickQuiz, a k�vetkez�ket teljes�tse:
- haszn�lja a Geolocation plugint, amellyel felfedezi az eszk�z aktu�lis hely�t �s aj�nlja fel neki minden ind�t�skor, hogy melyik v�rost k�v�nja v�lasztani (https://ionicframework.com/docs/native/geolocation/), a koordin�ta alapj�n, a v�rosok nevei jelenjenek meg �gy konvert�lva, hogy minden whitespace ut�n az els� bet� legyen nagy
- ha az adott v�ros neve m�g nem szerepel a list�ban, az adott user k�pes legyen azt regisztr�lni
- a v�ros kiv�laszt�sa ut�n jelenjen meg k�t gomb, az egyik Status, a m�sik Quiz Me! felirattal, ut�bbira kattintva az app kapjon a szervert�l egy random k�rd�st egy random k�rd�ssorb�l. Minden helyes v�lasz n�velje eggyel az adott v�ros pontsz�m�t
- a Status gombra nyomva jelenjen meg az adott v�ros pontsz�ma �s a top 5 legt�bb pontsz�mot el�rt v�ros a pontsz�maikkal egy�tt.
- ez az eg�sz �gy durv�n 3-4 nagyon minimalista komponens �s egy service egy Ionic keretrendszerben
Ez �gy megfelelne sz�motokra extrak�nt? K�rlek, legk�s�bb a holnapi esti �r�ig v�laszoljatok

TODO:
0. l�p�s MINDENKI izz�tsa be a sulis rendszert otthoni g�pen is!!!

Feladatok:
- Bel�p� fel�let / Regisztr�ci� -> netr�l beh�zhat�
- User authentication
- Jogosults�gi k�r�k
- Statisztika
- J�t�k
- Admin m�veletek

Backend:
- Adatb�zis tervez�s, �s csatlakoz�s - Krist�f
- Szerver ind�t�s, session kezel�s + authentik�ci� (csak 1-szer legyen bejelentkezve!) - Szilveszter
- K�rd�s megjelen�t�s, v�lasz fogad�s, ellen�rz�s - j�t�kmenet (pontok sz�mol�sa) - Abig�l
- K�rd�sbank m�dos�t�s (admin) - �bel
+ Megl�v� v�rosok lek�r�se (list�zza a legk�zelebb lev�ket) + ha nincs, hozz� lehessen adni - �bel
Frontend:
- K�rd�s kezel� fel�let (admin) + import - �bel
- Statisztika/profil fel�let + f�men� (+1 gomb az adminnak, +1 gomb a Quiz Me!-nek) - Krist�f
- J�t�k fel�let - Abig�l
- Bejelentkez�/Regisztr�ci�s fel�let - Szilveszter
+ F�lugr� ablakban location v�laszt�s... m�g fix�lni kell

K�lcs�n: getbootstrap

K�rd�sek:
Hogyan kell majd kommunik�lnia a telefonnak a szerverrel? Hogyan tudjuk kinyitni a szervert/Ind�tani el�rhet� szervert?
Hogy m�k�dj�n a + j�t�k?
