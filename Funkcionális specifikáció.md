# Funkcionális specifikáció

## 1. Bevezetés
A jelenlegi rendszer kizárólag az üzletben érhető el, ahol az eladók kezelik a médiák nyilvántartását Excel táblázatban. A vevők csak személyesen érdeklődhetnek egy média elérhetősége felől. Az új rendszer célja egy adatbázis alapú nyilvántartás és egy online felület kialakítása, amelyen a vevők előre árat kalkulálhatnak és ellenőrizhetik a médiák elérhetőségét.

## 2. Rendszerfunkciók

### 2.1. Adatbázis kezelése
A rendszernek lehetőséget kell biztosítania a médiák adatainak nyilvántartására egy adatbázisban.

#### 2.1.1. Új média felvétele az adatbázisba
- Az ügyvezető feladata lesz új médiák hozzáadása a rendszerhez.
- Az ügyvezető megadhatja a következő adatokat:
  - Média neve
  - Kategória
  - Kölcsönzési ár
  - Raktárkészlet
- A média státusza "raktáron" vagy "kölcsönözve" lehet.

### 2.2. Média kölcsönzése
A rendszernek támogatnia kell a kölcsönzési folyamatokat online és üzletben egyaránt.

#### 2.2.1. Ár kalkulálása
- A vevő az online felületen keresztül választhatja ki a kívánt médiát, és megtekintheti az árakat. Az ár kalkuláció figyelembe veszi a kölcsönzés időtartamát.
- Személyesen az eladó végzi el az árkalkulációt, de a rendszer támogatja az automatikus árkalkulációt.

#### 2.2.2. Kölcsönzés végrehajtása
- Az eladó (vagy az ügyvezető) kiadja a vevő által kiválasztott médiát.
- Az ügyvezető a média állapotát „kiadva” értékre állítja a rendszerben.
- A rendszer automatikusan frissíti a raktárkészletet, csökkentve a kölcsönzött médiák számát.

### 2.3. Online felület
A rendszer egy vevői weboldalt is tartalmaz, amely a következő funkciókat biztosítja:

#### 2.3.1. Média elérhetőségének ellenőrzése
- A vevő kereshet a médiák között és megtekintheti, hogy azok elérhetők-e (raktáron vannak-e).

#### 2.3.2. Online ár kalkulálása
- A vevő kiválaszthatja a kölcsönzés időtartamát és a rendszer automatikusan kiszámítja a kölcsönzési árat.
- Az ár tartalmazza a kölcsönzési díjat és esetleges egyéb díjakat.

## 3. Felhasználói szerepkörök

### 3.1. Ügyvezető
- Feladatai:
  - Új médiák felvétele a rendszerbe.
  - A médiák állapotának frissítése (pl. „raktáron” → „kiadva”).
  - Raktárkészlet kezelése.

### 3.2. Eladó
- Feladatai:
  - A vevők számára személyesen árat kalkulálni.
  - A kölcsönzött médiák kiadásának és visszavételének kezelése.

### 3.3. Vevő
- Feladatai:
  - A médiák elérhetőségének ellenőrzése az online felületen.
  - Ár kalkuláció elvégzése az online felületen.

## 4. Követelmények

### 4.1. Technikai követelmények
- Az online felület HTML/CSS alapú legyen.
- A képfájlok formátuma: JPEG vagy PNG.

### 4.2. Adatbázis követelmények
- A médiák adatainak tárolása egy adatbázisban történik.
- Az adatbázisnak támogatnia kell a következő adatokat:
  - Média azonosító
  - Név
  - Kategória
  - Kölcsönzési ár
  - Státusz (raktáron/kölcsönözve)
  - Készlet mennyisége

## 5. Képernyőtervek

### 5.1. Online felület
- **Főoldal**: médiák listázása keresési lehetőséggel.
- **Média részletek oldala**: a média leírása, elérhetőségi információk, ár kalkulálási lehetőség.
  
### 5.2. Adminisztrációs felület
- **Média kezelése**: új médiák felvétele, meglévők szerkesztése, státusz frissítése.


## 6. Üzleti szabályok
- A kölcsönzési díjak meghatározása fix alapú, de tartalmazhat időtartam alapján változó díjakat is.
- Egy média státuszát mindig frissíteni kell a kiadás és visszavétel során.

## 7. Következtetés
A rendszer célja egy adatbázis-alapú nyilvántartás és egy vevői weboldal létrehozása, amely egyszerűbbé teszi a médiák kölcsönzését és nyomon követését.

## Használati Esetek
![use_case](https://github.com/user-attachments/assets/2f37e5dd-2357-4aaf-ab8f-cb85dfbfd5bb)
