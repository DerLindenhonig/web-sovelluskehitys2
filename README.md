# Web-sovelluskehitys 2
"vue-studyapp-frontend" - Kansiossa on tämän kurssin Vue-projekti.\
"studyapp-backend" - Kansiossa on projektin backend.\
"studyapp-frontend" - Kansiossa on vanhan projektin Reactilla tehty frontend.

# Rest-apin kutsut:
# Blogs:
setToken - Asettaa käyttäjän token.\
getAll - Hakee kokoelman kaikki sanastot. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/blogs. \
create - Luo uuden sanaston pyynnön mukana "newObject" olevasta datasta.\
```
title: sanaston nimi,
author: sanaston luoja, eli käyttäjän username,
url: sanaston kuvaus,
likes: oletuksena 0,
status: sanaston status "public" tai "private",
category: sanaston kategoria, eli ensimmäinen kieli, oletuksena "other",
category2: sanaston kategoria, eli toinen kieli, oletuksena "other",
user: käyttäjän id,
originalBlog: oletuksena null; kun lisätään olemassa oleva sanasto, kopioi alkuperäisen sanaston id
```
update - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön.\
remove - Tekee HTTP DELETE -pyyntö sanaston urliin. Poista sanaston.\
updateAddedUsers - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön. Tätä käytetään, kun käyttäjä lisää sanasto omaan sanasto-kokoelmaan.\

# Users:

# Cards:

# Login:
