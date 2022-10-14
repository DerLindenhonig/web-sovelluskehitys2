# Web-sovelluskehitys 2
"vue-studyapp-frontend" - Kansiossa on tämän kurssin Vue-projekti.\
"studyapp-backend" - Kansiossa on projektin backend.\
"studyapp-frontend" - Kansiossa on vanhan projektin Reactilla tehty frontend.

# Rest-apin kutsut:
### Blogs:
setToken - Asettaa käyttäjän token.\
getAll - Hakee kokoelman kaikki sanastot. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/blogs.
```
HTTP Request:

GET http://localhost:3001/api/blogs
Content-Type: application/json
```
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

HTTP Request:

POST http://localhost:3001/api/blogs
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imthc3N1IiwiaWQiOiI2MWNiMTI4NDRiYmE0NjAwMDQ1YWJhNGYiLCJpYXQiOjE2NjU3NzQxMDF9.YVxmI_Nzhmd0hZ0CvEDgzf2DnFkwOnssV0XLAwpnG0o

{
  "title": "new", "author": "new", "url": "new", "likes": 0, "status": "private", "category": "other", "category2": "other", "user": "61cb12844bba4600045aba4f"
}
```
update - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön.\
remove - Tekee HTTP DELETE -pyyntö sanaston urliin ja poista sen.\
updateAddedUsers - Päivittää olemassa oleva sanasto tekemällä HTTP PUT -pyynnön. Tätä käytetään, kun käyttäjä lisää sanasto omaan sanasto-kokoelmaan.

### Users:
getAll - Hakee kokoelman kaikki käyttäjät. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/users. 
```
GET http://localhost:3001/api/users
Content-Type: application/json
```
create - Luo uuden sanaston pyynnön mukana "newObject" olevasta datasta.\
```
"newObject" sisältää nämä tiedot:
username - käyttäjätunnus,
name - käyttäjän nimi,
passwordHash - salasana,
*level - 0
*-oletusarvot
```
update - Päivittää olemassa oleva käyttäjä tekemällä HTTP PUT -pyynnön käyttäjän urliin.
### Cards:
setToken - Asettaa käyttäjän token.\
getAll - Hakee kokoelman kaikki muistikortit. Tekee HTTP GET -pyyntö osoitteeseen http://localhost:3001/api/cards.
```
HTTP Request:

GET http://localhost:3001/api/cards
Content-Type: application/json
```
create - Luo uuden muistikortin pyynnön mukana "newObject" olevasta datasta. "newObject" sisältää nämä tiedot:
```
word: string, sana
translate: string, käännös
examples: string, esimerkkejä
*progress: oletuksena on 0
blogId: sanaston id, mihin kortti lisätään
*-oletusarvot

HTTP Request:

POST http://localhost:3001/api/cards
Content-Type: application/json
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaSIsImlkIjoiNjE5MTg1MDdlMzI0Njk5ZWEwNTRkZjljIiwiaWF0IjoxNjM4MzA4MzkzfQ.pIs9O9ucZZkdOxqo6f3It8DgYVQ72s4sV0imp-m2oYc

{
  "word": "new", "translate": "new", "examples": "new", "blogId": "61922316b432f095fc45bfb3", "progress": 0
}
```
update - Päivittää olemassa oleva kortti tekemällä HTTP PUT -pyynnön.\
remove - Tekee HTTP DELETE -pyyntö kortin urliin ja poista sen.
### Login:
