<div align="center">

# 🌱 Red Social Saludable

### *Tu espacio para compartir y descubrir un estilo de vida saludable*

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[Demo](#) · [Reportar Bug](https://github.com/sergiodev3/socialnet-saludable/issues) · [Solicitar Feature](https://github.com/sergiodev3/socialnet-saludable/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Acerca del Proyecto

**Red Social Saludable** es una plataforma MERN stack diseñada para conectar personas interesadas en mantener un estilo de vida saludable. Los usuarios pueden compartir sus experiencias, publicar contenido relacionado con nutrición y bienestar, interactuar mediante chat en tiempo real, y acceder a funcionalidades premium personalizadas.

### ✨ ¿Por qué este proyecto?

- **Comunidad saludable**: Conecta con personas que comparten tus mismos objetivos de bienestar
- **Contenido curado**: Publicaciones centradas en nutrición, ejercicio y salud mental
- **Interacción en tiempo real**: Chat integrado para comunicación instantánea
- **Experiencia personalizable**: Opciones premium para personalizar tu perfil

---

## 🚀 Características Principales

### 👤 Gestión de Usuarios
- ✅ Registro y autenticación segura con JWT
- ✅ Perfiles de usuario personalizables
- ✅ Carga de imágenes de perfil
- ✅ Gestión de sesiones

### 📝 Sistema de Publicaciones
- ✅ Crear, editar y eliminar publicaciones
- ✅ Subida de imágenes para posts
- ✅ Sistema de likes y comentarios
- ✅ Feed personalizado

### 💬 Chat en Tiempo Real
- ✅ Mensajería instantánea entre usuarios
- ✅ Historial de conversaciones
- ✅ Notificaciones en tiempo real

### 🌟 Funcionalidades Premium
- ✅ Personalización avanzada de perfil
- ✅ Temas y estilos exclusivos
- ✅ Tarjetas personalizadas
- ✅ Formularios especiales

### 🎨 Interfaz de Usuario
- ✅ Diseño responsive y moderno
- ✅ Navegación intuitiva
- ✅ Componentes reutilizables
- ✅ Estilos CSS personalizados

---

## 🛠 Tecnologías

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

- **React 18+** - Biblioteca de interfaz de usuario
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para API calls

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación y autorización
- **Multer** - Manejo de archivos multimedia
- **bcrypt** - Encriptación de contraseñas

---

## 📦 Instalación

### Prerrequisitos

Asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **MongoDB** (v4.4 o superior)

### Pasos de Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/sergiodev3/socialnet-saludable.git
cd socialnet-saludable
```

2. **Instala las dependencias del backend**

```bash
cd backend
npm install
```

3. **Instala las dependencias del frontend**

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuración

### Backend

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/socialnet-saludable
# O usar MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/socialnet-saludable

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRE=7d

# Archivos
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./upload
```

### Frontend

Crea un archivo `.env` en la carpeta `frontend/` con:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎮 Uso

### Desarrollo

1. **Inicia el servidor backend**

```bash
cd backend
npm run dev
```

El servidor correrá en `http://localhost:5000`

2. **Inicia la aplicación frontend** (en otra terminal)

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Producción

1. **Build del frontend**

```bash
cd frontend
npm run build
```

2. **Inicia el servidor**

```bash
cd backend
npm start
```

---

## 📁 Estructura del Proyecto

```
socialnet-saludable/
├── 📂 backend/
│   ├── 📂 config/
│   │   └── db.js                    # Configuración MongoDB
│   ├── 📂 features/
│   │   ├── 📂 auth/                 # Autenticación
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.model.js
│   │   │   └── auth.routes.js
│   │   ├── 📂 chat/                 # Sistema de chat
│   │   │   ├── chat.controller.js
│   │   │   ├── chat.model.js
│   │   │   └── chat.routes.js
│   │   └── 📂 posts/                # Publicaciones
│   │       ├── post.controller.js
│   │       ├── post.model.js
│   │       └── post.routes.js
│   ├── 📂 shared/
│   │   ├── 📂 middlewares/          # Middlewares personalizados
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── upload.middleware.js
│   │   └── 📂 utils/
│   │       └── jwt.util.js
│   ├── 📂 upload/                   # Archivos subidos
│   │   ├── images-post/
│   │   └── images-profile/
│   ├── server.js                    # Punto de entrada
│   └── package.json
│
├── 📂 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 assets/
│   │   │   └── img/
│   │   ├── 📂 features/
│   │   │   ├── 📂 auth/             # Login/Registro
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── login.css
│   │   │   ├── 📂 chat/             # Chat
│   │   │   │   └── Chat.jsx
│   │   │   ├── 📂 home/             # Páginas principales
│   │   │   │   ├── MainPage.jsx
│   │   │   │   └── pagina.jsx
│   │   │   ├── 📂 posts/            # Publicaciones
│   │   │   │   └── Home.jsx
│   │   │   ├── 📂 premium/          # Funcionalidades Premium
│   │   │   │   ├── Formulario.jsx
│   │   │   │   ├── Personalizada.jsx
│   │   │   │   └── Tarjeta.jsx
│   │   │   └── 📂 profile/          # Perfil de usuario
│   │   │       └── Profile.jsx
│   │   ├── 📂 shared/
│   │   │   ├── 📂 components/       # Componentes compartidos
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── PrivateRoute.jsx
│   │   │   └── 📂 hooks/            # Custom hooks
│   │   │       ├── jwt.js
│   │   │       └── useAuth.js
│   │   ├── 📂 styles/               # Estilos globales
│   │   │   ├── chat.css
│   │   │   ├── diario.css
│   │   │   └── publicar.css
│   │   ├── App.jsx                  # Componente principal
│   │   ├── main.jsx                 # Punto de entrada
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── CAMBIOS_UI_UX.md                 # Documentación de cambios
├── MEJORAS_NAVEGACION.md            # Documentación de mejoras
└── README.md
```

---

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |
| GET | `/api/auth/profile` | Obtener perfil actual | Sí |
| PUT | `/api/auth/profile` | Actualizar perfil | Sí |

### Publicaciones

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Obtener todas las publicaciones | Sí |
| GET | `/api/posts/:id` | Obtener publicación específica | Sí |
| POST | `/api/posts` | Crear nueva publicación | Sí |
| PUT | `/api/posts/:id` | Actualizar publicación | Sí |
| DELETE | `/api/posts/:id` | Eliminar publicación | Sí |
| POST | `/api/posts/:id/like` | Dar like a publicación | Sí |

### Chat

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/chat/conversations` | Obtener conversaciones | Sí |
| GET | `/api/chat/messages/:userId` | Obtener mensajes con usuario | Sí |
| POST | `/api/chat/messages` | Enviar mensaje | Sí |

---

## 🤝 Contribuir

Las contribuciones son lo que hacen que la comunidad open source sea un lugar increíble para aprender, inspirar y crear. ¡Cualquier contribución que hagas será **muy apreciada**!

1. **Fork** el proyecto
2. Crea tu **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva característica increíble'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Guía de Estilo de Commits

- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bugs
- `Update:` Actualización de funcionalidad existente
- `Refactor:` Refactorización de código
- `Docs:` Cambios en documentación
- `Style:` Cambios de formato/estilo

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Contacto

**Sergio Dev**

- GitHub: [@sergiodev3](https://github.com/sergiodev3)
- Proyecto: [socialnet-saludable](https://github.com/sergiodev3/socialnet-saludable)

---

<div align="center">

### ⭐️ ¡Si te gusta este proyecto, dale una estrella!

**Hecho con ❤️ y mucho ☕**

</div>
