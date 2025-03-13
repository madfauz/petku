# dokter Api spec

# Register dokter Api

Endpoint: POST /api/dokter

Request Body :

```json
{
  "email": "email dokter",
  "password": "rahasia",
  "name": "nama dokter"
}
```

Response Body Success :

```json
{
  "data": {
    "name": "nama  dokter",
    "jadwal": "jadwal dokter"
  }
}
```

Respon Body Eror :

```json
{
  "error": "pasien sudah penuh"
}
```

# Login dokter Api

Endpoint : POST /api/dokter/login

Request Body :

```json
{
  "email": "email dokter",
  "password": "rahasia"
}
```

Request Body Success :

```json
{
  "data": {
    "name": "nama  dokter",
    "idDkoter": "id dokter"
  }
}
```

Request Body Eror :

```json
{
  "error": "email or password wrong"
}
```

## Update dokter Api

Endpoint : PATCH /api/dokter/:idDokter

```json
{
  "name": "nama dokter", //optional
  "password": "new password" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "dokter": "pzn",
    "name": "Programser Zaman now lagi",
    "jadwal": "jadwal dokter"
  }
}
```

Respon Body Eror :

```json
{
  "error": " dokter or password wrong"
}
```

## Get dokter in action Api

Endpoint : Get /api/dokter/:idDokter/action

Header :

- Authorization : token-pelanggan

Response Body Success :

```json
{
  "data": {
    "id": 1, //auto increment
    "name": "nama dokter",
    "username": "nama pelanggan"
  }
}
```

Respon Body Eror :

```json
{
  "error": "Unauthorized"
}
```

## Logout User Api

Endpoint : DELETE /api/doctor/logout/:idDokter

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Respon Body Eror :

```json
{
  "error": "Unauthorized"
}
```
