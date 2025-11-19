# Social Network CBTIS

Red social desarrollada con React y Node.js para usuarios del CBTIS.

## Características

- 📱 Perfil de usuario personalizable
- 🎨 Modo premium con opciones de personalización
- 🤖 Chat con IA integrado
- 💾 Almacenamiento local de datos

## Requisitos

- Node.js v14 o superior
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/social-network-cbtis.git
cd social-network-cbtis
```

2. Instala dependencias:
```bash
npm install
```

3. Crea archivo `.env` con tus variables:
```
REACT_APP_API_URL=http://localhost:5000
```

## Uso

Ejecuta el servidor de desarrollo:
```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   │   └── premium/
│   │   │       ├── Formulario.jsx
│   │   │       └── Personalizada.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
├── backend/
│   └── (agregar si existe)
└── README.md
```

## Scripts Disponibles

- `npm start` - Ejecuta el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm test` - Ejecuta pruebas
- `npm run dev` - Modo desarrollo con hot reload

## Tecnologías

- React 18+
- React Router
- Axios
- localStorage API

## Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre Pull Request

## Licencia

Este proyecto está bajo licencia ISC.

## Autor

Tu Nombre - [@tu-usuario](https://github.com/tu-usuario)

## Contacto

- Email: tu-email@example.com
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
