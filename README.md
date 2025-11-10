# 🏆 LOLpedia

**LOLpedia** es una aplicación web interactiva inspirada en *League of Legends*.
Incluye búsqueda, filtrado dinámico y animaciones visuales en un entorno moderno construido con **Next.js**, **Chakra UI** y **Framer Motion**.

## 🚀 Características principales

- 📖 **Catálogo completo de campeones** con datos en tiempo real obtenidos desde la API de Riot (Data Dragon).
- 🔍 **Buscador en vivo** por nombre de campeón.
- 🧩 **Filtro por rol o tipo de campeón**.
- 🃏 **Cartas interactivas** con efecto *flip 3D* al pasar el ratón.
- 🎨 **Diseño fiel a la estética de League of Legends**, incluyendo tipografía Beaufort y bordes personalizados.
- ⚡ **Carga progresiva (infinite scroll)**: los campeones se van mostrando a medida que el usuario baja por la página.
- 📱 **Diseño responsive**: interfaz adaptada a escritorio y móviles.
- 🌙 **Animaciones suaves** con *Framer Motion*.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| [Next.js 14](https://nextjs.org/) | Framework React para renderizado y rutas |
| [React](https://react.dev/) | Biblioteca base para la UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático y seguridad |
| [Chakra UI](https://chakra-ui.com/) | Sistema de componentes estilizados |
| [Framer Motion](https://www.framer.com/motion/) | Animaciones fluidas |
| [Data Dragon API](https://developer.riotgames.com/docs/lol) | Fuente de datos de campeones y aspectos |
| [Custom Fonts (BeaufortforLOL, SpiegelSans)] | Estética original de LoL |
| [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | Implementación de carga infinita |

## 🧩 Estructura del proyecto
```bash
src/
├── app/
│ ├── lib/ # Funciones para obtener datos de campeones
│ │ └── api.ts
│ ├── styles/ # Estilos CSS/TS
│ │ ├── fonts.css
│ │ ├── loader.css
│ │ └── Home.styles.ts
│ ├── types/ # Tipos TS de campeones y skins
│ │ └── champions.ts
│ ├── utils/ # Iconos y traducciones de roles
│ │ └── roles.ts
│ ├── page.tsx # Página principal
│ └── layout.tsx # Layout raíz (fuentes y metadatos)
│
├── components/
│ ├── BackgroundAudio.tsx
│ ├── Header.tsx
│ ├── Header.styles.ts
│ ├── FlipCard.tsx
│ └── FlipCard.styles.ts
│
├── public/
│ ├── audios/ # Sonidos
│ ├── img/ # Fondos, bordes, logos
│ └── fonts/ # Tipografías personalizadas
└── README.md
```

## ⚙️ Instalación y ejecución

### 1️⃣ Clona el repositorio

```bash
git clone https://github.com/tuusuario/lolpedia.git
cd lolpedia
```
### 2️⃣ Instala las dependencias
```bash
npm install
# o
yarn install
```

### 3️⃣ Ejecuta el servidor de desarrollo
```bash
npm run dev
```

Abre http://localhost:3000
 en tu navegador para ver el proyecto en acción.

## 🧠 Scripts disponibles
Comando	Descripción
npm run dev	Inicia el entorno de desarrollo
npm run build	Genera la versión optimizada para producción
npm run start	Inicia el servidor en modo producción
npm run lint	Ejecuta el linter de TypeScript/Next.js

## 🎨 Personalización

Fuentes personalizadas se encuentran en public/fonts y se cargan desde src/app/layout.tsx usando next/font/local.

Colores y estilos globales definidos con Chakra UI y CSS.

Fondo dinámico y estética ajustada al universo de League of Legends.

## 📸 Capturas

![LOLpedia demo](https://s4.ezgif.com/tmp/ezgif-4c2edc4ab745e529.gif)

## 💡 Próximamente

🔹 Favoritos y comparación de campeones
🔹 Estadísticas en gráficos (Recharts o Chart.js)
🔹 Más información de cada campeón

## 👤 Autor

Nereka
- [GitHub](https://github.com/Nereka38)
- [LinkedIn](https://www.linkedin.com/in/nerea-fernandez-cuesta/)
