# Restserver

REST API example with: 

GET: Obtener usuarios
Endpoint: {{url}}/api/usuarios?limite=19


POST: Crear usuario
Endopoint: {{url}}/api/usuarios
{
    "nombre": "tester8",
    "correo": "test8@test.com",
    "edad": 24,
    "password": "123456",
    "rol": "USER_ROLE"
}


POST: Login solo con admin role
Endpoint: {{url}}/api/auth/login
{
    "correo": "test@admin.com",
    "password": "000111"
} 

PUT: Actualizar usuario
Enpoint: {{url}}/api/usuarios/{MONGO_ID}
{
    "_id": "6281d8c920fb94a34df3e69d",
    "nombre": "tester1 updateado",
    "correo": "test1@test.com",
    "password": "holaholas",
    "rol": "USER_ROLE"
}

DELETE: Borra un usuario
Enpoint: {{url}}/api/usuarios/{MONGO_ID_A_SER_BORRADO}
HEADERS: x-token {TOKEN-DE-ADMIN-LOGEADO}


**Instalacion:** 

```bash
npm install
```

**Ejecucion:** 
```bash
npm start
```

```bash
nodemon app.js
```