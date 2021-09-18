# App <-> Flask

## Introduction
All JSONs send actually with information about app: 
```JSON
{
    type: 'site', //maybe windowApp and so on in future
    password: 'some256key' //just little defence (change key every 12 hours on server side)
}
```
And Flask: 
```JSON
{
    type: 'server',
    password: 'someAnother256key', //just little defence (change key every 12 hours on server side)
    status: 'ok' //or something else
}
```

---
---
---

## app: `/login`
Auth page

```js
if token != null:
    redirect('/app')
```
```JSON
{
    email, 
    password
}
```
.... // НАДО ПРОПИСАТЬ ответы разные if'ами
```JSON
{
    
}
```
.... // НАДО ПРОПИСАТЬ

---

## app: `/registration`
Registration page

```js
if token != null:
    redirect('/app')
```
```JSON
{
    surname,
    name,
    patronymic,
    email, 
    password
}
```
.... // НАДО ПРОПИСАТЬ ответы разные if'ами
```JSON
{
    
}
```
.... // НАДО ПРОПИСАТЬ

---

## app: `/app`

Get information about user 

```JSON
{
    token
}
```
```JSON
{
    user: {
        surname,
        name,
        patronymic,
        ....
    }
}
```
---

## app: `/history`
Just Lorem (don't dynamic page)

---

## app: `/travels`
List of user travels (old and active [purchased] travels) //travel is a ticket without seat number
Active on top and old must be separate from active
Travel info (from `/getTravels`)

### server: `/getTravels`
Return two lists: 
1. Active travels 
2. Archived travels (history)

One travel: 
```JSON
{
    from,
    to,
    date,
    ....
}
```

## app: `/travels/[travel]`
More info about travel (mb copy+past from some web-sites)
User edit and add more preferences for this travel

## app: `/travels/[travel]/tickets`
Ранжированный list of seat tickets with info about it
### server: `/serUserTravelInfo`
get: big JSON with many data: 
- Пол
- Возраст
- Наличие детей
- Предпочтения (темы, увлечения) по выборы из списка
- Поведенческий тип (интровертность по шкале от 0 до 4)
- Галочки: 
  - Не хочу детей до 2х лет рядом
  - Не хочу детей от 2х до 5ти лет рядом
  - Не хочу детей от 5ти до 7ми лет рядом 
  - Не хочу детей от 7ми до 12ти лет рядом
  - Не хочу подростков до 16ти рядом
- Желаемый диапазон возраста (ползуки на мин и макс)
- У меня есть прививка от ковид (да / нет / не выбрано)
- Комментарий

server saved it
server call py math
send: list of order seat tickets

## app: `/profile`

---