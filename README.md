# 📱 Social Network CBTIS

Proyecto de red social educativa creado con el stack **MERN** (MongoDB, Express, React, Node.js).  
Actualmente implementa registro y autenticación de usuarios. Próximamente incluirá publicación de posts, perfil de usuario y chat en tiempo real.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB (con Mongoose)
- **Autenticación**: JSON Web Tokens (JWT)

---

## 📁 Estructura del proyecto (es monorepo)
```
my-social-network/
├── backend/
│   ├── config/
│   ├── features/
│   │   ├── auth/
│   │   ├── chat/
│   │   └── posts/
│   ├── shared/
│   │   ├── middlewares/
│   │   └── utils/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── features/
│       │   ├── auth/
│       │   ├── chat/
│       │   ├── posts/
│       │   └── profile/
│       └── shared/
│           ├── components/
│           ├── hooks/
│           └── utils/
└── README.md


---

## 🧩 Funcionalidades actuales

- Registro de usuario
- Login de usuario
- Autenticación con JWT
- Validación de credenciales

---
```
## 🔌 API REST - Endpoints

Base path: `/api/v1/users`

| Método | Ruta          | Descripción                  | Requiere JWT |
|--------|---------------|------------------------------|--------------|
| POST   | `/register`   | Registro de nuevos usuarios  | ❌           |
| POST   | `/login`      | Autenticación de usuarios    | ❌           |

---

## ⚙️ Configuración e instalación local

1. Clona este repositorio:
   ```bash
   git clone https://github.com/sergiodev3/social-network-cbtis.git


2. Instala dependencias del frontend y backend:
backend ----> bcryptjs cors dotenv express jsonwebtoken mongoose nodemon
frontend ---> vite con react react-dom react-router-dom

🔄 Próximas funcionalidades (en desarrollo)
Página principal con publicaciones

Perfil de usuario

Chat en tiempo real con WebSockets

CRUD de publicaciones

Mejoras en UI/UX

🤝 Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para sugerir mejoras o reportar bugs.

📄 Licencia
Este proyecto está bajo la licencia MIT.
