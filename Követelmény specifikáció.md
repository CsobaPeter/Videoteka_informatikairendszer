## Követelmény specifikáció

1. Jelenlegi helyzet: Van egy az üzleten belül használt informatikai rendszerünk amiben az eladó csupán annyit lát hogy az adott film van-e raktáron, a vevőknek nincs hozzáférése a rendszerhez, meg kell kérdezniük az eladót.


2. Vágyálom rendszer: Szeretnénk egy rendszert, ahol nyomon tudjuk követni a kiadott médiákat és kezelni tudjuk a raktárban elérhetőket. Továbbá szeretnénk egy online felületet, ahol a vevő tud előre árat kalkulálni, és megtekinteni, hogy egy média elérhető-e.


3. Jelenlegi üzleti folyamatok:
  - 3.1. Médiák adatainak nyilvántartása Excel táblázatban
  - 3.1.1. Új média felvétele: ügyvezető beírja a táblázatba
  - 3.2. Média kölcsönzése
  - 3.2.1. vevő az áruházban választ, eladó árat számol
  - 3.2.2. Média kiadása: eladó átadja a vevőnek a kiválasztott médiát, felveszi az Excel táblázatba


4. Igényelt üzleti folyamatok
  - 4.1. Médiák adatainak nyilvántartása adatbázisban
  - 4.1.1. Új média felvevése a nyilvántartásba: az ügyvezető végzi
  - 4.2. Média kikölcsönzése
  - 4.2.1. Online felületen vagy személyesen árkalkulál
  - 4.2.2. Média kiadása: az ügyvezető végzi, “kiadva”-ra állítja a média állapotát


5. A rendszerre vonatkozó szabályok
A web felület szabványos eszközökkel készüljön, html/css. A képek jpeg és png formátumúak lehetnek.


6. Követelménylista
- | ID | Név | V. | Kifejtés |
  | -- | --- | -- | -------- |
  | K1 | Adatbázis kezelése | 1.0 | Az alkalmazotti jogosultságú felhasználó tud felvenni új médiát az adatbázisba, illetve az adatbázisban már szereplő médiákat tudja törölni és módosłtani. |
  | K2 | Média kölcsönzése  | 1.0 | A felhasználó ki tudja kölcsönözni az elérthető médiákat az általa megadott időre. Csak a regisztrált felhasználóknak elérhető. |
  | K3 | Médiák keresése | 1.0 | A felhesználó tud keresni az elérhető médiák között szürők segítségével. |
  | K4 | Árkalkulátor | 1.0 | Mielőtt a felhasználó kikölcsönözne egy médiát, láthatja, hogy mennyibe fog kerülni a megadott kölcsönzési időtartam alapján. |

  
  
