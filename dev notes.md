## v1.01

### Elkészült:
- ClearAll-t követő ShowComplete után az első teljesítés nem hozta fel a százalékos
kiírást, csak másodjára. Elképzelhető, hogy eddig is néha rossz értéket mutatott emiatt.


## v1.0

### Elkészült:
- Enter leütésével is lehet feladatot elküldeni
- Fejléc
- Clear All az elvégzett teendőket is törli
- Változó placeholder szövegek
- Utolsó utáni pillanatban realizált bug: Ha két pending elem karakterre pontosan egyezik, akkor a filter metódussal mindkettő törlődik a tárolóból, de nem a listából. Ez csúnya 
eltérésekhez vezethet. Gyorstapaszként a művelet lecserélve findIndex, splice párosra.
- Meg még egy: A Show/Hide Complete gomb clearAll után elállíthatódott, de javítva.


## v0.95

### Elkészült:
- A színeket, ikonokat és a betűtípust szabadon választhatod
- A checkboxoknak nem kell egyedi dizájnt készíteni
- Az alkalmazás localStorage-ban tárolja a teendőket
- Az alkalmazás indításkor ellenőrzi, hogy vannak-e mentett teendők, ha igen, akkor betölti őket a storage-ból
- Felül szerepelnie kell a jelenlegi dátumnak
- Az input mező placholder-e: Take the garbage out
- A plusz jelre kattintva egy animáció kíséretében megjelenik az új teendő a listában, az input tartalma törlődik
- A teendőlista feletti mondatban (You have X pending items) látható, hogy szerepel a teendők száma, ez dinamikusan frissüljön mindig
- Ha egy teendő fölé visszük a kurzort, egy animáció kíséretében megjelenik a kuka ikon, amelyre kattintva törlődik a teendő
- A teendő előtti checkboxot bejelölve az adott teendő elvégzett lesz, a listáról eltűnik
- A Show/Hide Complete szövegre kattintva lehet megjeleníteni/elrejteni a már elvégzett teendőket
- A Clear All-ra kattintva a még el nem végzett összes teendő törlésre kerül
- Üres teendőlista


### Hátravan:
- A kód kibogozása és átláthatóvá tétele, egyes működések jobb elválasztása...stb
- 28 óra alvás...
