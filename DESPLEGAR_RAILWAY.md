# 🚂 Desplegar Portal LUMÉ en Railway

## ✅ Preparación Completada

El proyecto está listo para desplegarse en Railway:

- ✅ Código en GitHub: https://github.com/Crisalinas/lume-portal-react
- ✅ Build configurado y probado
- ✅ Servidor de producción (serve) instalado
- ✅ Railway.json configurado

## 📋 Pasos para Desplegar

### Opción 1: Desde la Web de Railway (Recomendado)

1. **Ir a Railway**: https://railway.app
2. **Iniciar sesión** con tu cuenta
3. **Crear nuevo proyecto**: Click en "New Project"
4. **Conectar con GitHub**:
   - Seleccionar "Deploy from GitHub repo"
   - Buscar: `lume-portal-react`
   - Click en "Deploy"

5. **Railway detectará automáticamente**:
   - Node.js project
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

6. **Esperar el despliegue** (2-3 minutos)

7. **Obtener URL pública**:
   - Click en "Settings"
   - En "Domains" → "Generate Domain"
   - Tu portal estará en: `https://tu-proyecto.up.railway.app`

### Opción 2: Desde Railway CLI

```bash
# Instalar Railway CLI (si no lo tienes)
npm install -g @railway/cli

# Login
railway login

# Crear proyecto y desplegar
cd "C:\LUME\Horarios\Prototipos\PIN + VACACIONES\Portal React"
railway init
railway up
```

## 🔧 Configuración de Railway

El archivo `railway.json` ya está configurado con:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Variables de Entorno (Opcional)

Si necesitas configurar variables:

1. En Railway Dashboard → Tu proyecto
2. Click en "Variables"
3. Agregar:
   - `NODE_ENV=production`
   - `PORT=3000` (Railway lo asigna automáticamente)

## 📊 Recursos del Deploy

**Build:**
- Node.js 20+
- npm install
- vite build

**Runtime:**
- Servidor: serve
- Puerto: 3000 (configurable)
- Memoria: ~512MB
- CPU: Compartido

## 🌐 Después del Despliegue

Una vez desplegado:

1. **URL del portal**: `https://[tu-proyecto].up.railway.app`
2. **Monitoreo**: Panel de Railway muestra logs y métricas
3. **Auto-deploy**: Cada push a `main` despliega automáticamente

## 🔄 Actualizar el Portal

```bash
# Hacer cambios en el código
git add .
git commit -m "Actualización del portal"
git push origin main

# Railway desplegará automáticamente
```

## 🐛 Troubleshooting

### Error: Build Failed
```bash
# Verificar build local
npm run build
```

### Error: Port already in use
- Railway asigna puerto automáticamente
- No configurar PORT manualmente

### Error: Module not found
```bash
# Verificar dependencies en package.json
# serve debe estar en "dependencies", no "devDependencies"
```

## 📝 Comandos Útiles

```bash
# Ver logs en tiempo real
railway logs

# Abrir dashboard
railway open

# Ver variables de entorno
railway variables

# Conectar a shell del contenedor
railway shell
```

## ✨ Características del Deploy

- 🚀 Deploy automático con cada push
- 🔄 Zero-downtime deployments
- 📊 Monitoreo en tiempo real
- 🌍 CDN global automático
- 🔒 HTTPS automático
- 💾 Logs persistentes

## 🎯 Siguiente Paso

**Desplegar ahora**: 
1. Ve a https://railway.app
2. Click "New Project"
3. Conecta `Crisalinas/lume-portal-react`
4. ¡Listo en 3 minutos!

---

**Repositorio GitHub**: https://github.com/Crisalinas/lume-portal-react
**Documentación Railway**: https://docs.railway.app
