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
  - **Tesztelő, Scrum
