# 🚂 DEPLOYMENT MANUAL EN RAILWAY

## ⚠️ Nota Importante

El Railway CLI requiere autenticación interactiva con navegador. 
Por eso, el deployment se hará manualmente desde la web de Railway.

**Es más simple y rápido que usar CLI** ✨

---

## 🎯 PASOS EXACTOS (5 minutos)

### 1️⃣ Abrir Railway

**URL**: https://railway.app

### 2️⃣ Iniciar Sesión

- Si ya tienes cuenta: Click "Login"
- Si no tienes cuenta: Click "Start a New Project" → Crear con GitHub

**Recomendado**: Usar "Login with GitHub" para conectar automáticamente tus repos

### 3️⃣ Crear Nuevo Proyecto

Una vez dentro del dashboard:

1. Click en **"New Project"** (botón morado arriba a la derecha)

2. Seleccionar **"Deploy from GitHub repo"**

3. Si es primera vez con GitHub:
   - Railway pedirá permisos
   - Click "Install Railway on GitHub"
   - Dar acceso a tus repositorios

### 4️⃣ Seleccionar Repositorio

En la lista de repositorios:

- Buscar: **`lume-portal-react`**
- O buscar: **`Crisalinas/lume-portal-react`**
- Click en el repositorio

Railway mostrará:
```
📦 Repository: Crisalinas/lume-portal-react
🌿 Branch: main
```

### 5️⃣ Deploy Automático

Railway detectará automáticamente:

```
✅ Detected: Node.js Application
✅ Build Command: npm install && npm run build
✅ Start Command: npm start
✅ Port: 3000
```

**No necesitas configurar nada**

Click en **"Deploy"** o **"Deploy Now"**

### 6️⃣ Esperar Build (2-3 minutos)

Railway mostrará logs en tiempo real:

```
[00:00] 🚀 Deployment started
[00:05] 📦 Cloning repository...
[00:10] 📥 Installing dependencies...
        npm install
[00:30] 🔨 Building application...
        npm run build
        ✓ 2179 modules transformed
        ✓ built in 8.56s
[01:20] 🚢 Starting server...
        npm start
        ✓ serving dist on port 3000
[01:30] ✅ Deployment successful!
```

### 7️⃣ Obtener URL Pública

Una vez que aparezca **"Deployment successful"**:

1. Click en **"Settings"** (⚙️ en el menú lateral)
2. Scroll hasta la sección **"Domains"**
3. Click en **"Generate Domain"**
4. Railway asignará una URL automáticamente:
   ```
   https://lume-portal-react-production.up.railway.app
   ```

5. **Copiar la URL**

### 8️⃣ Verificar Deployment

Abrir la URL en el navegador y verificar:

- [x] Aparece splash screen con "LUMÉ"
- [x] Portal se carga con 6 módulos
- [x] Animaciones funcionan al hacer hover
- [x] Reloj muestra hora actual
- [x] Toggle día/noche funciona
- [x] Responsive en mobile

---

## 📊 Ejemplo Visual del Proceso

```
Railway Dashboard
    ↓
New Project
    ↓
Deploy from GitHub
    ↓
Select: lume-portal-react
    ↓
[Auto-detected configuration]
    ↓
Click "Deploy"
    ↓
[Build logs en vivo]
    ↓
✅ Deployment Successful
    ↓
Settings → Domains → Generate Domain
    ↓
🌐 https://tu-proyecto.up.railway.app
```

---

## 🔧 Configuración Automática

Railway detecta automáticamente desde `package.json`:

```json
{
  "scripts": {
    "build": "tsc -b && vite build",
    "start": "serve -s dist -l 3000"
  }
}
```

Y desde `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

**Todo está pre-configurado** ✅

---

## 🎨 Después del Deploy

### Ver Logs en Tiempo Real

1. En Railway Dashboard
2. Click en tu proyecto
3. Tab "Deployments"
4. Click en el deployment activo
5. Ver logs en vivo

### Configurar Variables de Entorno (Opcional)

Si necesitas configurar algo:

1. Settings → Variables
2. Click "New Variable"
3. Agregar (opcional):
   - `NODE_ENV=production`
   - Otras si las necesitas

### Auto-Deploy Configurado

Cada vez que hagas push a GitHub:

```bash
git add .
git commit -m "Actualización"
git push origin main
```

Railway desplegará automáticamente la nueva versión.

---

## 🐛 Troubleshooting

### ❌ Error: "Build Failed"

**Ver en logs**:
1. Click en el deployment fallido
2. Ver "Build Logs"
3. Identificar el error

**Soluciones comunes**:
- Verificar que `package.json` tenga `serve` en dependencies
- Verificar que `railway.json` esté en la raíz
- Hacer rebuild: Click en "..." → "Redeploy"

### ❌ Error: "Application Failed to Respond"

**Causa**: Puerto incorrecto

**Solución**:
1. Settings → Variables
2. Verificar que NO exista `PORT` configurado
3. Railway lo asigna automáticamente

### ❌ Error: "Repository Not Found"

**Solución**:
1. Verificar que el repo sea público en GitHub
2. O dar permisos a Railway en GitHub:
   - GitHub → Settings → Applications
   - Railway → Configure
   - Grant access al repo

---

## ✅ Checklist de Verificación

Después del deploy exitoso:

- [ ] URL generada funcionando
- [ ] Splash screen aparece
- [ ] 6 módulos visibles
- [ ] Animaciones hover funcionan
- [ ] Reloj en tiempo real
- [ ] Tema día/noche cambia
- [ ] Responsive en mobile
- [ ] Console sin errores (F12)

---

## 📱 Compartir el Portal

Una vez verificado, compartir la URL:

```
🌐 Portal LUMÉ:
https://[tu-proyecto].up.railway.app

✨ Características:
- Animaciones suaves
- Tema día/noche
- Diseño responsive
- 6 módulos del sistema
```

---

## 🔄 Próximas Actualizaciones

Para actualizar el portal:

```bash
# 1. Hacer cambios en el código local
# 2. Commit y push
git add .
git commit -m "Mejoras al portal"
git push origin main

# 3. Railway desplegará automáticamente
# 4. Nueva versión disponible en 2-3 minutos
```

---

## 📊 Recursos del Deploy

| Recurso | Valor |
|---------|-------|
| **Node.js** | v20+ |
| **RAM** | 512 MB |
| **CPU** | Shared |
| **Storage** | ~100 MB |
| **Build Time** | ~2 min |
| **Costo Estimado** | ~$0.50/mes |

---

## 🎯 URL Final

Después de completar todos los pasos, tendrás:

```
✅ Portal LUMÉ desplegado
🌐 URL pública: https://[nombre].up.railway.app
🔄 Auto-deploy configurado
📊 Monitoreo en Railway Dashboard
🛡️ Backup local disponible
```

---

## 💡 Tips Finales

1. **Guarda la URL**: Añádela a favoritos
2. **Comparte el dashboard**: Puedes invitar colaboradores
3. **Monitorea uso**: Railway muestra métricas de tráfico
4. **Dominio custom**: Puedes agregar tu propio dominio después

---

**¿Listo para empezar?**

👉 Ve a: https://railway.app

**Tiempo total estimado**: 5-7 minutos

---

## 🆘 Soporte

Si algo no funciona:

1. **Revisar logs** en Railway Dashboard
2. **Consultar** `PLAN_ROLLBACK.md` si necesitas revertir
3. **Verificar** que el repositorio en GitHub esté actualizado

**Repositorio**: https://github.com/Crisalinas/lume-portal-react

---

**¡Éxito con el deployment!** 🚀
