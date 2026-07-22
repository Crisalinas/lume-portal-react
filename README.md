# Portal LUMÉ - React

Portal de Sistema Integral LUMÉ con animaciones elegantes basadas en el dock de macOS.

## Características

- ✨ Animaciones suaves con Framer Motion
- 🎨 Diseño dorado/negro elegante (marca LUMÉ)
- 🌓 Soporte para tema día/noche
- ⏰ Reloj en tiempo real
- 📱 Diseño responsivo
- 🎯 6 módulos principales:
  - Asistencia
  - ERP
  - CRM
  - Customer Experience
  - Fidelización (En construcción)
  - RRHH

## Tecnologías

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React (iconos)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El proyecto se ejecutará en `http://localhost:5173`

## Build

```bash
npm run build
```

## Animaciones

Las animaciones están inspiradas en el dock de macOS:
- **Hover**: Escala y elevación de tarjetas
- **Tooltip**: Aparece suavemente al hacer hover
- **Entrada**: Las tarjetas aparecen con efecto stagger
- **Splash**: Pantalla de bienvenida animada con el logo LUMÉ

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/
│   │   └── ModuleCard.tsx    # Componente de tarjeta de módulo
│   └── LumePortal.tsx         # Componente principal del portal
├── App.tsx
└── index.css                   # Estilos globales con Tailwind
```

## Personalización

### Colores (en `tailwind.config.js`)

```js
colors: {
  gold: '#C9A96E',
  gold2: '#E8D5A3',
  gold3: '#A07840',
}
```

### Agregar nuevos módulos

Edita el array `modules` en `src/components/LumePortal.tsx`:

```ts
{
  id: 'nuevo-modulo',
  icon: TuIcono,
  label: 'Nuevo Módulo',
  onClick: () => console.log('Click!'),
  inactive: false
}
```

## Licencia

Proyecto privado - LUMÉ © 2026
