# Web-sovelluskehitys 2
"vue-studyapp-frontend" - Kansiossa on tämän kurssin Vue-projekti.\
"studyapp-backend" - Kansiossa on projektin backend.\
"studyapp-frontend" - Kansiossa on vanhan projektin Reactilla tehty frontend.

# Rest-apin kutsut:
### Blogs:
setToken - Asettaa käyttäjän token.\
getAll - Hakee kokoelman kaikki sanastot. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/blogs. \
create - Luo uuden sanaston pyynnön mukana "newObject" olevasta datasta.\
```
"newObject" sisältää nämä tiedot:
title: sanaston nimi,
author: sanaston luoja, eli käyttäjän username,
url: sanaston kuvaus,
*likes: oletuksena 0,
status: sanaston status "public" tai "private",
category: sanaston kategoria, eli ensimmäinen kieli, oletuksena "other",
category2: sanaston kategoria, eli toinen kieli, oletuksena "other",
*user: käyttäjän id,
*originalBlog: oletuksena null; kun lisätään olemassa oleva sanasto, kopioi alkuperäisen sanaston id
*-oletusarvot
```
update - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön.\
remove - Tekee HTTP DELETE -pyyntö sanaston urliin ja poista sen.\
updateAddedUsers - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön. Tätä käytetään, kun käyttäjä lisää sanasto omaan sanasto-kokoelmaan.

### Users:

### Cards:
setToken - Asettaa käyttäjän token.\
getAll - Hakee kokoelman kaikki muistikortit. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/cards. \
create - Luo uuden muistikortin pyynnön mukana "newObject" olevasta datasta.\
```
"newObject" sisältää nämä tiedot:
word: string, sana
translate: string, käännös
examples: string, esimerkkejä
*progress: oletuksena on 0
blogId: sanaston id
*-oletusarvot
```
update - Päivittää olemassa oleva kortti tekemällä HTTP PUT -pyynnön.\
remove - Tekee HTTP DELETE -pyyntö kortin urliin ja poista sen.\
### Login:
