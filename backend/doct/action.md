# Action Api Spec

## get Action Api

Endpoint : GET /api/pelanggan/:action/:id

Header :

- Authorization : token

Request body :

```json
{
  "username": "Nama lengkap pelanggan",
  "nama hewan": "Nama hewan",
  "keluhan": "Keluhan pelanggan"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "username": "Nama lengkap pelanggan",
    "nama hewan": "Nama hewan",
    "keluhan": "Keluhan pelanggan",
    "dokter": "Nama dokter"
  }
}
```

Response Body Error :

```json
 "error": "Username is not valid"
```

## get obat Api

Endpoint : GET /api/pelanggan/:action/:id/:idObat

Header :

- Authorization : token

Request body :

```json
{
  "nama hewan": "Nama hewan",
  "keluhan": "Keluhan pelanggan",
  "dokter": "Nama dokter",
  "obat": "Nama obat",
  "harga": "Harga obat"
}
```

Response Body Sucess :

```json
{
  "data": {
    "id": 1,
    "username": "Nama lengkap pelanggan",
    "nama hewan": "Nama hewan",
    "keluhan": "Keluhan pelanggan",
    "dokter": "Nama dokter"
  }
}
```

Response Body Error :

```json
 "error": "Username is not valid"
```

## Remove Contact Api

Endpoint : DELETE /api/pelanggan/:action/:id

Header :

- Authorization : token

Response Body Sucess :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "error": "Username is not valid"
}
```
