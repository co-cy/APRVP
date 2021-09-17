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

## app: `/profile`

---