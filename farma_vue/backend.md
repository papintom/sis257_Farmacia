# 📋 Guía de Login para Frontend (Vue)

## 🔗 Configuración Base del Backend

### URL Base
```
http://localhost:3000/api/v1
```

### CORS Habilitado ✅
El backend tiene CORS habilitado, por lo que puedes hacer peticiones desde cualquier origen.

---

## 👤 Endpoints de Usuarios

### 1. **Crear Usuario (Registro)**
- **Método:** `POST`
- **Endpoint:** `/usuarios`
- **URL Completa:** `http://localhost:3000/api/v1/usuarios`
- **Descripción:** Crea un nuevo usuario en el sistema

#### Request Body:
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "miPassword123",
  "rol": "vendedor"
}
```

#### Validaciones:
- `nombre`: Requerido, máximo 50 caracteres, debe ser texto
- `apellido`: Requerido, máximo 50 caracteres, debe ser texto
- `correo`: Requerido, máximo 50 caracteres, debe ser único (no puede repetirse)
- `password`: Requerido, máximo 50 caracteres, debe ser texto
- `rol`: Requerido, máximo 50 caracteres, debe ser texto

#### Response (201 Created):
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "miPassword123",
  "rol": "vendedor",
  "fechaCreacion": "2025-05-31T10:30:00.000Z",
  "fechaModificacion": "2025-05-31T10:30:00.000Z",
  "fechaEliminacion": null
}
```

#### Posibles Errores:
- **409 Conflict:** El usuario (correo) ya existe
- **400 Bad Request:** Validación fallida en los campos

---

### 2. **Obtener Todos los Usuarios**
- **Método:** `GET`
- **Endpoint:** `/usuarios`
- **URL Completa:** `http://localhost:3000/api/v1/usuarios`
- **Descripción:** Obtiene la lista de todos los usuarios

#### Response (200 OK):
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan@example.com",
    "password": "miPassword123",
    "rol": "vendedor",
    "fechaCreacion": "2025-05-31T10:30:00.000Z",
    "fechaModificacion": "2025-05-31T10:30:00.000Z",
    "fechaEliminacion": null
  }
]
```

---

### 3. **Obtener Usuario por ID**
- **Método:** `GET`
- **Endpoint:** `/usuarios/{id}`
- **URL Completa:** `http://localhost:3000/api/v1/usuarios/1`
- **Descripción:** Obtiene un usuario específico por su ID

#### Parameters:
- `id` (requerido): ID del usuario (número)

#### Response (200 OK):
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "miPassword123",
  "rol": "vendedor",
  "fechaCreacion": "2025-05-31T10:30:00.000Z",
  "fechaModificacion": "2025-05-31T10:30:00.000Z",
  "fechaEliminacion": null
}
```

#### Posibles Errores:
- **404 Not Found:** Usuario con ese ID no existe

---

### 4. **Actualizar Usuario**
- **Método:** `PATCH`
- **Endpoint:** `/usuarios/{id}`
- **URL Completa:** `http://localhost:3000/api/v1/usuarios/1`
- **Descripción:** Actualiza los datos de un usuario (todos los campos son opcionales)

#### Parameters:
- `id` (requerido): ID del usuario (número)

#### Request Body (Todos los campos opcionales):
```json
{
  "nombre": "Juan Carlos",
  "apellido": "Pérez García",
  "correo": "juancarlos@example.com",
  "password": "nuevoPassword456",
  "rol": "administrador"
}
```

#### Response (200 OK):
```json
{
  "id": 1,
  "nombre": "Juan Carlos",
  "apellido": "Pérez García",
  "correo": "juancarlos@example.com",
  "password": "nuevoPassword456",
  "rol": "administrador",
  "fechaCreacion": "2025-05-31T10:30:00.000Z",
  "fechaModificacion": "2025-05-31T11:45:00.000Z",
  "fechaEliminacion": null
}
```

---

### 5. **Eliminar Usuario**
- **Método:** `DELETE`
- **Endpoint:** `/usuarios/{id}`
- **URL Completa:** `http://localhost:3000/api/v1/usuarios/1`
- **Descripción:** Elimina un usuario (soft delete - se marca como eliminado)

#### Parameters:
- `id` (requerido): ID del usuario (número)

#### Response (200 OK):
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "miPassword123",
  "rol": "vendedor",
  "fechaCreacion": "2025-05-31T10:30:00.000Z",
  "fechaModificacion": "2025-05-31T10:30:00.000Z",
  "fechaEliminacion": "2025-05-31T12:00:00.000Z"
}
```

---

## 🏗️ Estructura de Datos

### Entidad Usuario
| Campo | Tipo | Características | Validación |
|-------|------|-----------------|-----------|
| `id` | number | ID autoincremental | Solo lectura |
| `nombre` | string | Max 50 caracteres | Requerido |
| `apellido` | string | Max 50 caracteres | Requerido |
| `correo` | string | Max 50 caracteres, único | Requerido |
| `password` | string | Max 50 caracteres | Requerido |
| `rol` | string | Max 50 caracteres | Requerido |
| `fechaCreacion` | Date | Se genera automáticamente | Solo lectura |
| `fechaModificacion` | Date | Se actualiza automáticamente | Solo lectura |
| `fechaEliminacion` | Date | Para soft delete | Solo lectura |

---

## 💡 Lógica de Login Sugerida para Vue

### Estrategia Recomendada:

1. **Obtener todos los usuarios** (`GET /usuarios`)
2. **Buscar el usuario por correo** (filtrar en la respuesta)
3. **Validar la contraseña** (comparar con la que ingresó el usuario)
4. **Guardar en localStorage/vuex** la información del usuario autenticado

### Pseudocódigo:
```javascript
// 1. Obtener todos los usuarios
const response = await fetch('http://localhost:3000/api/v1/usuarios');
const usuarios = await response.json();

// 2. Buscar por correo
const usuario = usuarios.find(u => u.correo === correoIngresado);

// 3. Validar password
if (usuario && usuario.password === passwordIngresado) {
  // Login exitoso
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  return usuario;
} else {
  // Credenciales inválidas
  throw new Error('Correo o contraseña incorrectos');
}
```

### ⚠️ Nota de Seguridad:
**El backend actualmente almacena las contraseñas en texto plano.** Para producción, se recomienda:
- Implementar encriptación de contraseñas (bcrypt)
- Usar JWT para autenticación
- Crear un endpoint específico de login
- Nunca enviar contraseñas en texto plano

---

## 📝 Ejemplo Completo en Vue 3 (Composition API)

```vue
<script setup>
import { ref } from 'vue'

const correo = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    // 1. Obtener todos los usuarios
    const response = await fetch('http://localhost:3000/api/v1/usuarios')
    
    if (!response.ok) {
      throw new Error('Error al conectar con el backend')
    }

    const usuarios = await response.json()

    // 2. Buscar usuario por correo
    const usuario = usuarios.find(u => u.correo === correo.value)

    // 3. Validar contraseña
    if (!usuario) {
      error.value = 'Usuario no encontrado'
      return
    }

    if (usuario.password !== password.value) {
      error.value = 'Contraseña incorrecta'
      return
    }

    // 4. Guardar usuario en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuario))
    
    // 5. Redirigir a dashboard
    alert(`¡Bienvenido ${usuario.nombre}!`)
    // router.push('/dashboard')

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const registro = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('http://localhost:3000/api/v1/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: correo.value,
        password: password.value,
        rol: 'vendedor'
      })
    })

    if (response.status === 409) {
      error.value = 'El usuario ya existe'
      return
    }

    if (!response.ok) {
      const data = await response.json()
      error.value = data.message || 'Error en el registro'
      return
    }

    const usuario = await response.json()
    localStorage.setItem('usuarioActual', JSON.stringify(usuario))
    alert('Registro exitoso')

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <div v-if="error" class="error">{{ error }}</div>
    
    <input 
      v-model="correo" 
      type="email" 
      placeholder="Correo electrónico"
      :disabled="loading"
    />
    
    <input 
      v-model="password" 
      type="password" 
      placeholder="Contraseña"
      :disabled="loading"
    />
    
    <button @click="login" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Ingresar' }}
    </button>
    
    <button @click="registro" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Registrarse' }}
    </button>
  </div>
</template>
```

---

## 🧪 Pruebas con Postman/Insomnia

### 1. Crear Usuario
```
POST http://localhost:3000/api/v1/usuarios
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "correo": "juan@example.com",
  "password": "password123",
  "rol": "vendedor"
}
```

### 2. Login (Obtener usuario por correo)
```
GET http://localhost:3000/api/v1/usuarios
```
Luego filtrar por correo en la respuesta.

### 3. Verificar Contraseña
Comparar la contraseña ingresada con la del usuario obtenido.

---

## 🚀 Información Importante del Backend

- **Puerto:** 3000 (por defecto)
- **Prefijo API:** `/api`
- **Versión:** `/v1`
- **CORS:** Habilitado ✅
- **Base de Datos:** PostgreSQL (TypeORM)
- **Framework:** NestJS 11
- **Validación:** class-validator

---

## 📌 Resumen de Variables de Entorno

El backend espera que se configure:
```env
PORT=3000
```

Puedes cambiar el puerto modificando la variable `PORT` en las variables de entorno.

---

## ✅ Checklist para Implementar Login en Vue

- [ ] Crear página de login con inputs para correo y contraseña
- [ ] Implementar función para obtener todos los usuarios
- [ ] Filtrar usuario por correo
- [ ] Validar contraseña
- [ ] Guardar usuario en localStorage/vuex/pinia
- [ ] Crear guards de rutas para proteger páginas autenticadas
- [ ] Implementar logout (limpiar localStorage)
- [ ] Agregar manejo de errores
- [ ] Validar formulario antes de enviar
- [ ] (Opcional) Implementar JWT en el backend para mayor seguridad

---

