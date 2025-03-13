# Pelanggan

## Register Use Api

Endpoint: POST /api/pelanggan

Request Body :

```json
{
  "username": "Nama lengkap pelanggan",
  "nama hewan": "Nama hewan",
  "email": "Email pelanggan",
  "password": "<PASSWORD>"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "Nama lengkap pelanggan",
    "nama hewan": "Nama hewan",
    "email": "Email pelanggan"
  }
}
```

Respon Body Eror :

```json
{
  "error": "username already register"
}
```

## Login User Api

Endpoint : POST /api/pelanggan/login

Request body :

```json
{
  "username": "Nama lengkap pelanggan",
  "nama hewan": "Nama hewan",
  "email": "Email pelanggan",
  "password": "<PASSWORD>"
}
```

Response Body Sucess :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "usrname or password wrong"
}
```

## Get Address Api

Endpoint : GET /api/pelanggan/current

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "username": "Nama lengkap pelanggan"
  }
}
```

Response Body Error :

```json
{
  "errors": "pelanggan tidak didapatkan"
}
```

## Remove Address Api

Endpoint : DELETE /api/contact/:contactId/addresses/:addresessId

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "oke"
}
```

Response Body Sucess :

```json
{
  "errors": "pelanggan tidak ditemukan"
}
```
