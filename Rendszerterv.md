Első nekifutás—------------------------
Rendszerterv
1. A rendszer célja
A rendszer célja, hogy egy adatbázis-alapú nyilvántartásra épülő, webes felületen is elérhető médiakölcsönző rendszert hozzon létre. Az új megoldás lehetővé teszi az ügyfelek számára a médiák online elérhetőségének ellenőrzését és árazásának kalkulációját, valamint egyszerűsíti a kölcsönzési folyamatokat mind online, mind személyesen.
1.1 Véglegesített igénylista
Az igénylistát a funkcionális specifikáció alapján állítottuk össze. Ez tartalmazza:
Adatbázis-kezelési funkciók
Média kölcsönzés és árazási kalkuláció online és üzletben
Online felület a vevők számára
Felhasználói szerepkörök (ügyvezető, eladó, vevő)
Technikai követelmények (HTML/CSS, képfájlok formátuma, adatbázis-követelmények)
1.2 Rendszer specifikáció
A rendszer specifikáció tartalmazza az adatbázis-felépítést, a felhasználói szerepkörök részleteit és a funkcionális komponensek működését, beleértve az online és offline kölcsönzési folyamatokat.
1.3 A megvalósítandó rendszer kiválasztásának szempontjai
1.3.1 Kutatás
A megvalósításhoz szükséges technológiák:
Adatbázis: SQL alapú adatbázis a médiák kezelésére.
Webes felület: HTML/CSS és JavaScript alapú frontend.
Szerver: PHP vagy Node.js használatával az üzleti logikák és adatkezelés végrehajtásához.
1.3.2 Dokumentálás
A kiválasztott technológiákról és a lehetséges alternatívákról készítünk egy bemutatható dokumentumot az ügyfél számára, amely tartalmazza a kutatási eredményeket és a választási indokokat.
1.4 A kiválasztott megoldás
1.4.1 Egyeztetés az ügyféllel
Az ügyféllel folyamatosan konzultálunk a választott technológiai megoldásokról, amelyek az alábbiak:
SQL alapú adatbázis a raktárkészlet kezelésére
HTML/CSS és JavaScript az online felülethez
Automatikus árkalkulációs algoritmus
1.4.2 Dokumentálás
A rendszer kiválasztott technológiai megoldásainak részletes dokumentációja elkészül, amely tartalmazza az adatbázis-modellt, a felhasználói folyamatokat, és az online felület architektúráját.
1.4.3 Tervezett rendszer folyamatábra
A rendszer folyamatábrája bemutatja a vevők, eladók és ügyvezetők közötti interakciókat, az adatbázis kezelési műveleteket, valamint az online és offline kölcsönzési folyamatokat.
1.5 A megvalósítás feltételei
1.5.1 Hardver- és szoftverkörnyezet
A rendszer megköveteli:
Webszerver (Apache vagy Nginx)
Adatbázisszerver (MySQL vagy PostgreSQL)
HTML/CSS és JavaScript keretrendszerek
Fejlesztői környezet (pl. Visual Studio Code, phpMyAdmin)
1.6 A tényleges megvalósítás
A feladatok ütemezése a következő lépésekben történik:
Adatbázis struktúrájának kialakítása (2 hét)
Webes felület fejlesztése (3 hét)
Kölcsönzési folyamat automatizálása és integrálása (2 hét)
Tesztelés és hibajavítás (1 hét)
1.7 Előzetes tesztek
A rendszer különféle teszteket igényel az adatbázis és a kölcsönzési folyamatok helyes működésének ellenőrzésére, valamint az online felület használhatóságára.
1.8 Telepítés tervezett menete
A rendszer telepítése egy fejlesztői környezetben kezdődik, majd egy éles szerverre kerül feltöltésre. A telepítési dokumentáció tartalmazza a szükséges lépéseket a rendszer beállításához és futtatásához.
1.9 Üzemeltetési tervek
Az üzemeltetési dokumentáció tartalmazza a szerver és az adatbázis karbantartására vonatkozó utasításokat, valamint a biztonsági mentési tervet.
1.10 Telepítés, élesítés és átadás
A rendszer telepítése és élesítése után végzünk egy éles tesztet, amely során az ügyfél visszajelzései alapján szükséges finomításokat végezzük el. Végül a rendszer átadásra kerül az ügyfélnek.

Második nekifutás—-------------
Rendszerterv
1. A rendszer célja
A rendszer célja, hogy lecserélje a jelenlegi, üzletben használt manuális rendszert egy adatbázis-alapú médiakezelő rendszerre, amely lehetőséget biztosít az online elérhetőség és árkalkuláció számára. Az új rendszer egyszerűsíti a médiák nyilvántartását, a kölcsönzési folyamatokat, és biztosít egy vevői felületet, amelyen keresztül a vevők előre kalkulálhatnak árakat és ellenőrizhetik a médiák elérhetőségét.
1.1 Véglegesített igénylista
A követelmény specifikáció alapján a rendszer legfontosabb igényei:
Adatbázis-kezelés: Új médiák felvétele, meglévők módosítása és törlése alkalmazotti jogosultságú felhasználók által.
Kölcsönzés: A regisztrált felhasználók kölcsönözhetnek médiákat online vagy személyesen.
Kölcsönzési előzmények: A felhasználók megtekinthetik korábbi kölcsönzéseiket.
Keresés: A médiák közötti keresési lehetőség különféle szűrők segítségével.
Felhasználói regisztráció: Felhasználók regisztrálhatnak és bejelentkezhetnek.
Árkalkulátor: Kölcsönzés előtt a felhasználók kalkulálhatják a kölcsönzési díjat a megadott időtartam alapján.
1.2 Rendszer specifikáció
A rendszer két fő komponensből áll:
Adminisztrációs felület: Ezen keresztül az ügyvezető és az eladók kezelik a médiák nyilvántartását, kölcsönzési státuszokat és az adatbázist.
Vevői felület: A regisztrált felhasználók számára biztosít egy online keresési és árkalkulációs lehetőséget, valamint a kölcsönzések lebonyolítását.
A rendszer specifikáció tartalmazza a felhasználói jogosultságok kezelését, az adatbázis-struktúrát és az üzleti folyamatokat (kölcsönzés, készletkezelés, visszavétel).
1.3 A megvalósítandó rendszer kiválasztásának szempontjai
1.3.1 Kutatás
A következő technológiai megoldásokat kutattuk fel:
Backend: PHP vagy Node.js szerveroldali megoldás az adatkezeléshez és a kölcsönzési folyamatok támogatásához.
Frontend: HTML/CSS és JavaScript az online felület létrehozásához.
Adatbázis: MySQL vagy PostgreSQL a médiák adatainak kezeléséhez és a kölcsönzési előzmények nyomon követéséhez.
1.3.2 Dokumentálás
A lehetséges technológiák közötti választás dokumentálva van, beleértve azok előnyeit és hátrányait, és ezeket szükség esetén az ügyféllel egyeztetjük.
1.4 A kiválasztott megoldás
1.4.1 Egyeztetés az ügyféllel
Az ügyféllel történt egyeztetések alapján a következő technológiák kerülnek kiválasztásra:
Backend: PHP a szerveroldali logika megvalósításához, mert jól támogatja a webes alkalmazásokat és az adatbázis integrációt.
Frontend: HTML/CSS és JavaScript, hogy reszponzív és könnyen kezelhető felületet biztosítsunk.
Adatbázis: MySQL, amely jól skálázható és könnyen karbantartható.
1.4.2 Dokumentálás
A kiválasztott rendszer részletes dokumentációja tartalmazza:
Az adatbázis-struktúra felépítését (médiaadatok, felhasználói adatok, kölcsönzési adatok)
Az adminisztrációs és vevői felület folyamatainak részleteit
A jogosultsági szintek kezelését
1.4.3 Tervezett rendszer folyamatábra
A folyamatábrák bemutatják a főbb adatáramlásokat:
Adatbázis műveletek (új média felvétele, státusz módosítás)
Kölcsönzési folyamatok (árkalkuláció, kölcsönzés, visszavétel)
Felhasználói műveletek (regisztráció, bejelentkezés, keresés)
1.5 A megvalósítás feltételei
1.5.1 Hardver- és szoftverkörnyezet
A rendszer működéséhez az alábbi szoftver- és hardverkörnyezet szükséges:
Webszerver: Apache vagy Nginx a webes kiszolgálás érdekében
Adatbázisszerver: MySQL az adatok tárolásához
Fejlesztői eszközök: Visual Studio Code, phpMyAdmin a fejlesztéshez és az adatbázis kezeléséhez
1.6 A tényleges megvalósítás
1.6.1 Fejlesztési feladatok és időbecslés
A rendszerfejlesztés főbb lépései:
Adatbázis tervezés és implementáció (1 hét)
Adminisztrációs felület kialakítása (2 hét)
Vevői felület fejlesztése (3 hét)
Kölcsönzési folyamatok és árkalkulátor integrálása (1 hét)
Tesztelés és hibajavítás (1 hét)
1.7 Előzetes tesztek
A tesztelés során figyelmet fordítunk az adatbázis működésére, a felhasználói funkciók (pl. regisztráció, kölcsönzés) helyességére, valamint az árkalkulátor pontos működésére.
1.8 Telepítés tervezett menete
A rendszer telepítése egy fejlesztői környezetben kezdődik, majd egy éles szerverre kerül. A telepítés folyamatábrája tartalmazza a rendszer komponenseinek lépésenkénti telepítését és konfigurálását.
1.9 Üzemeltetési tervek
Az üzemeltetési dokumentáció tartalmazza a rendszer napi karbantartási feladatait, a biztonsági mentési folyamatot és az adatbázis optimalizálási lépéseit.
1.10 Telepítés, élesítés és átadás
Az éles rendszer telepítését követően teszteket végzünk a kölcsönzési folyamatok helyes működésének ellenőrzésére, majd az ügyfél számára átadjuk a rendszert, és biztosítunk üzemeltetési támogatást.

Harmadik nekifutás—-
# Rendszerterv

## 1. A rendszer célja

### 1.1 Véglegesített igénylista a követelmény specifikáció alapján
**Cél**: A rendszer lehetőséget nyújtson a vevők számára, hogy megtekinthessék a médiák elérhetőségét és árát online, míg az eladók és ügyvezetők kezelni tudják a raktárban elérhető médiák nyilvántartását és kölcsönzését.

**Elvárt eredmény**: Az ügyfél által megfogalmazott igények kielégítése:
- Vevők online felületen meg tudják tekinteni az elérhető médiákat és kalkulálni az árakat.
- Az eladók kezelik a kölcsönzési folyamatokat.
- Az ügyvezető kezeli az új médiák felvételét a rendszerbe.

### 1.2 Rendszer specifikáció
**Cél**: A rendszer lehetőséget biztosít az elérhető médiák adatainak nyilvántartására, kezelésére és megtekintésére online felületen.

**Elvárt eredmény**: A rendszer lehetővé teszi:
- Az eladók számára a kölcsönzési és raktárkezelési folyamatok gyors lebonyolítását.
- A vevők számára online hozzáférést az elérhető médiákhoz és árinformációkhoz.

### 1.3 A megvalósítandó rendszer kiválasztásának szempontjai
#### 1.3.1 Kutatás
A megvalósításhoz szükséges lehetséges technológiák felkutatása, mint pl. adatbázis-kezelő rendszerek (MySQL, PostgreSQL), online felületek kialakítása (React, Angular), és backend megoldások (Java Spring, Node.js).

#### 1.3.2 Dokumentálás
Az ügyfél számára bemutatható dokumentum elkészítése a technológiai lehetőségekről.

**Cél**: Az optimális technológia kiválasztása a projekt igényeinek megfelelően.

**Elvárt eredmény**: Bemutatható dokumentáció a lehetséges technológiákról és azok előnyeiről.

### 1.4 A kiválasztott megoldás
#### 1.4.1 Egyeztetés az ügyféllel
Az ügyféllel egyeztetve a Java Spring és MySQL alapú backend megoldást választottuk, amely lehetővé teszi az adatbázis biztonságos és hatékony kezelését, valamint az Angular keretrendszert az online felület kialakítására.

#### 1.4.2 Dokumentálás
A kiválasztott rendszer részletes dokumentálása megtörtént, beleértve a backend és frontend technológiák közötti kapcsolatot.

#### 1.4.3 Tervezett rendszer folyamatábra
A rendszer fő folyamatainak vizuális ábrázolása (pl. médiák kezelése, kölcsönzési folyamat, árkalkuláció online).

**Cél**: A rendszerterv megerősítése az ügyfél felé.

**Elvárt eredmény**: Az ügyfél által elfogadott dokumentáció.

## 2. A megvalósítás feltételei
**Cél**: A kiválasztott technológiák által megkövetelt hardver és szoftverkörnyezet meghatározása.

**Elvárt eredmény**:
- Fejlesztési környezet: Java 17, MySQL, Angular, Spring Boot.
- Hardver követelmények: Linux/Windows alapú fejlesztői gép, 8GB RAM minimum.
- Fejlesztő eszközök: IntelliJ IDEA, MySQL Workbench, Node.js, Postman.
  
## 3. A tényleges megvalósítás
**Cél**: A feladatok és azok időbecslésének meghatározása.

**Elvárt eredmény**: Dokumentum a feladatokról, becsült időkkel:
- Backend fejlesztés (adatbázis kezelés, API-k): 60 óra
- Frontend fejlesztés (UI, árkalkuláció, kölcsönzési folyamat): 40 óra
- Tesztelés: 20 óra
- Telepítés: 10 óra

## 4. Előzetes tesztek
- Egységteszt: Minden fő modul (backend, frontend) külön tesztelése.
- Integrációs tesztek: A backend és frontend rendszerek közötti kapcsolatok ellenőrzése.

## 5. Telepítés tervezett menete
**Telepítési dokumentáció**: A rendszer telepítésének részletezése:
- Backend telepítése MySQL adatbázissal szerveren.
- Frontend telepítése webes környezetben.

## 6. Üzemeltetési tervek
**Üzemeltetési dokumentáció**: A rendszer karbantartási és üzemeltetési folyamatai.

## 7. Dokumentáció véglegesítése
A teljes dokumentáció véglegesítése, beleértve a felhasználói és technikai leírásokat.

## 8. Telepítés, a rendszer élesítése
A telepítési folyamat elvégzése és az éles környezetben történő működés ellenőrzése.

## 9. Éles teszt
A rendszer végső tesztelése éles környezetben, valós felhasználói adatokat használva.

## 10. Átadás
A rendszer hivatalos átadása az ügyfélnek, dokumentációval együtt.

---

## Résztvevők
- **Megrendelő**: János – Az üzleti igények meghatározása, rendszer követelmények rögzítése.
- **Fejlesztő csapat**:
  - Backend fejlesztő: Péter – Adatbázis és API fejlesztés.
  - Frontend fejlesztő: Anna – Felhasználói felület kialakítása és interakciók kezelése.
  - Tesztelő: László – Tesztelési folyamatok végrehajtása, hibák azonosítása.


Összesített nekifutás:
# Rendszerterv

## 1. A rendszer célja
A rendszer célja, hogy egy adatbázis-alapú nyilvántartásra épülő, webes felületen is elérhető médiakölcsönző rendszert hozzon létre. Az új megoldás lehetővé teszi az ügyfelek és az ott dolgozók számára a médiák online elérhetőségének ellenőrzését és árazásának kalkulációját, valamint egyszerűsíti a kölcsönzési folyamatokat mind online, mind személyesen. 

### 1.1 Véglegesített igénylista
A követelmény specifikáció alapján összeállított igények:
- Adatbázis-kezelési funkciók, új médiák felvétele, meglévők módosítása és törlése.
- Média kölcsönzés és árazási kalkuláció online és üzletben.
- Online felület a vevők számára, keresési lehetőségekkel és árkalkulátorral.
- Felhasználói szerepkörök (ügyvezető, eladó, vevő).
- Technikai követelmények (HTML/CSS, képfájlok formátuma: JPG,PNG, adatbázis-követelmények).

### 1.2 Rendszer specifikáció
A rendszer két fő komponensből áll:
- **Adminisztrációs felület**: Az ügyvezető és az eladók itt kezelik a médiák nyilvántartását, kölcsönzési státuszokat, és az adatbázist.
- **Vevői felület**: A felhasználók számára biztosít keresési és árkalkulációs lehetőségeket, valamint a kölcsönzések lebonyolítását.

A specifikáció tartalmazza a felhasználói jogosultságok kezelését, az adatbázis-struktúrát, és az üzleti folyamatokat (kölcsönzés, készletkezelés, visszavétel).

### 1.3 A megvalósítandó rendszer kiválasztásának szempontjai
#### 1.3.1 Kutatás
A rendszer megvalósításához az alábbi technológiákat vizsgáltuk meg:
- **Adatbázis**: SQL alapú adatbázisok (MySQL, MicrosoftSQL, SQLite) a médiák adatainak kezelésére.
- **Webes felület**: HTML/CSS és JavaScript alapú frontend keretrendszerek (React, Angular).
- **Backend**: ASP.NET(C#), PHP a szerveroldali logikához.

#### 1.3.2 Dokumentálás
A kiválasztott technológiákról és a lehetséges alternatívákról készített dokumentum az ügyfél számára bemutatja a kutatási eredményeket és a választás indokait.

### 1.4 A kiválasztott megoldás
#### 1.4.1 Egyeztetés az ügyféllel
Az ügyféllel történt egyeztetések után a következő technológiák kerültek kiválasztásra:
- **Backend**: PHP vagy ASP.NET a szerveroldali logika megvalósítására.
- **Frontend**: HTML/CSS és JavaScript és Blazor WebAssembly az online felület létrehozására.
- **Adatbázis**: MySQL a médiák adatainak kezeléséhez.
- **Árkalkuláció**: Automatikus algoritmus a kölcsönzési árak kalkulálásához.

#### 1.4.2 Dokumentálás
A rendszer kiválasztott technológiai megoldásainak részletes dokumentációja elkészült, amely tartalmazza az adatbázis-modellt, a felhasználói folyamatokat, és az online felület kinézetét.

#### 1.4.3 Tervezett rendszer folyamatábra
A rendszer folyamatábrája bemutatja a vevők, eladók és ügyvezetők közötti interakciókat, az adatbázis-kezelési műveleteket, valamint az online és offline kölcsönzési folyamatokat.

## 2. A megvalósítás feltételei
### 2.1 Hardver- és szoftverkörnyezet
A rendszer működéséhez szükséges:
- **Webszerver**: Apache vagy Nginx a webes kiszolgáláshoz.
- **Adatbázisszerver**: MySQL az adatok tárolásához.
- **Fejlesztési környezet**: NET 8.0, MySQL, Blazor,, ASP.NET.
- **Fejlesztői eszközök**: Visual Studio, MySQL Workbench, Node.js, Postman.

### 2.2 A tényleges megvalósítás 
A feladatok ütemezése a következő lépésekben történik: 
1. Adatbázis struktúrájának kialakítása (2 hét) 
2. Webes felület fejlesztése (3 hét) 
3. Kölcsönzési folyamat automatizálása és integrálása (2 hét) 
4. Tesztelés és hibajavítás (1 hét)

## 3. Fejlesztői szemszögből az üzleti logika 
### 3.1 Üzleti logikai folyamatok 
A rendszer fő üzleti logikai folyamatai a következők: 

#### 3.1.1 Kölcsönzési folyamat 
- **Árkalkuláció**: A felhasználók megadják a kölcsönzés időtartamát, majd az árkalkulátor kiszámítja a végső költséget. 
- **Készletkezelés**: Amikor egy vevő kölcsönöz egy médiát, a készlet automatikusan frissül, és a média státusza "kölcsönzött" állapotra vált. 
- **Visszavétel**: A kölcsönzött média visszavételekor a készlet visszaáll, és a média újra elérhetővé válik. 

#### 3.1.2 Felhasználói jogosultságok 
- **Vevő**: Csak az elérhető médiákat tekintheti meg és indíthat kölcsönzést. 
- **Eladó**: Kezelheti a kölcsönzési folyamatokat, módosíthatja a médiák állapotát. 
- **Ügyvezető**: Teljes hozzáféréssel rendelkezik az adatbázishoz és a kölcsönzési folyamatokhoz, új médiákat adhat hozzá. 

### 3.2 Technikai megvalósítás 
- **Backend**: A kölcsönzési folyamatok üzleti logikája ASP.NET alapú. Az árkalkuláció és készletkezelés automatikusan történik. 
- **Frontend**: A vevők és eladók felülete BLazor segítségével dinamikusan frissíti a készletinformációkat. 
- **Adatbázis**: Az SQL adatbázis biztosítja a kölcsönzési előzmények, médiák és felhasználói adatok tárolását. 

## 4. Előzetes tesztek
A rendszer különféle teszteket igényel az adatbázis és a kölcsönzési folyamatok helyes működésének ellenőrzésére, valamint az online felület használhatóságára. Kiemelten figyelünk:
- **Egységtesztekre**: Minden fő backend modul külön tesztelése.
- **Integrációs tesztekre**: A backend és frontend rendszerek közötti kapcsolatok ellenőrzése.

## 5. Telepítés tervezett menete
A rendszer telepítése a fejlesztői környezetben kezdődik, majd egy éles szerverre kerül feltöltésre. A telepítési dokumentáció tartalmazza a rendszer komponenseinek lépésenkénti telepítését és konfigurálását, beleértve:
- **Backend telepítése**: MySQL adatbázissal.
- **Frontend telepítése**: Webes környezetben.

## 6. Üzemeltetési tervek
**Corrective Maintenance: ** A felhasználók által felfedezett és "user reportban" elküldött hibák kijavítása. 
**Adaptive Maintenance:**  A program naprakészen tartása és finomhangolása.
** Perfective Maintenance:**  A szoftver hosszútávú használata érdekében végzett módosítások, új funkciók, a szoftver teljesítményének és működési megbízhatóságának javítása. 
**Preventive Maintenance:** Olyan problémák elhárítása, amelyek még nem tűnnek fontosnak, de később komoly problémákat okozhatnak.

## 7. Dokumentáció véglegesítése
A rendszer teljes dokumentációjának elkészítése:
User Manual írása 

## 8. Telepítés, a rendszer élesítése és átadás
Az éles rendszer telepítése után végzünk egy éles tesztet, amely során az ügyfél visszajelzései alapján szükséges finomításokat végezzük el. Végül a rendszer hivatalos átadása megtörténik, teljes dokumentációval együtt.

## 9. Éles teszt
A rendszer végső tesztelése éles környezetben, valós felhasználói adatokat használva.

## 10. Átadás
A rendszer átadásra kerül az ügyfélnek, és biztosítunk üzemeltetési támogatást.


## Résztvevők
- **Megrendelő**: János – Az üzleti igények meghatározása, rendszer követelmények rögzítése.
- **Fejlesztő csapat**:
  - **Backend fejlesztő**: Ákos– Adatbázis és API fejlesztés.
  - **Frontend fejlesztő**: Antal – Felhasználói felület kialakítása és interakciók kezelése.
  - **Tesztelő, Scrum master**: Péter– Tesztelési folyamatok végrehajtása, hibák azonosítása.
