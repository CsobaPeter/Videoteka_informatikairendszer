# Videotéka Informatikai Rendszer

## Konfigurációs Utasítások

A rendszer telepítése előtt ellenőrizze a következő követelményeket:
- Webszerver: Apache vagy Nginx
- Adatbázis-szerver: MySQL
- Fejlesztői eszközök: Visual Studio, MySQL Workbench

A konfigurációhoz:
1. Állítsa be az adatbázis csatlakozási adatokat a `config.php` fájlban.
2. Adja meg a webszerver gyökérkönyvtárát a projekt számára.
3. Ellenőrizze, hogy az adatbázis-szerver elérhetők és megfelelően működnek.

## Telepítési Utasítások

1. Importálja az adatbázis-struktúrát a `database.sql` fájl segítségével.
2. Másolja a backend fájlokat a webszerver gyökérkönyvtárába.
3. Konfigurálja a frontend fájlokat és ellenőrizze a helyes működést a böngészőben.
4. Futtassa a teszteket az adatbázis és az alkalmazás helyes működésének ellenőrzéséhez.

## Használati Utasítások

- **Felhasználói fiók kezelése:** Regisztráció és bejelentkezés a webes felületen.
- **Média keresése:** Keresés cím, műfaj vagy elérhetőség szerint.
- **Kölcsönzés:** Adja hozzá a kiválasztott médiát a kosárhoz, majd indítsa el a kölcsönzést.
- **Árkalkuláció:** A kölcsönzés végösszegének megtekintése a fizetés előtt.

## Manifest Fájl

- `index.html`: A kezdőoldal.
- `App.css`: A webes felület stíluslapja.
- `index.js`: Frontend logika.
- `Vdeoteka.sql`: Az adatbázis sémája.
  
## Szerzői Jog és Licencinformáció

Ez a projekt a [MIT licenc](https://opensource.org/licenses/MIT) alatt érhető el.

## Kapcsolattartási Információk

- Fejlesztő: Csoba Péter 
- E-mail: csobapeter75@gmail.com
- Telefonszám: +36 30 490 7519

## Ismert Hibák

- Az adatbázis-összekapcsolás hibás konfiguráció esetén nem működik.
- Néhány böngészőben az oldalak elrendezése eltérhet.

## Hibaelhárítás

- Ellenőrizze a webszerver és adatbázis-szerver működését.
- Győződjön meg arról, hogy a `config.php` fájlban helyesek az adatbázis-hitelesítési adatok.
- Futtassa az `error.log` fájl elemzését a hibák diagnosztizálásához.

## Készítők Listája és Köszönetnyilvánítások

- **Fejlesztők:**
  - Péter (Projektvezető)
  - Ákos (Backend fejlesztő)
  - Antal (Frontend fejlesztő)
  - János (Tesztelő)

## Változási Napló

- **v1.0.0**:
  - Alapfunkciók implementálása.
  - Adatbázis-struktúra elkészítése.
  - Frontend és backend integráció.

## Hírrovat

- **Újdonságok:**
  - Mostantól elérhető az online árkalkuláció funkció!
