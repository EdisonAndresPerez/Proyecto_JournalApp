# JournalApp

Una aplicación de diario personal construida con **React**, **Redux Toolkit**, **Firebase Authentication & Firestore** y **Cloudinary** para la gestión de imágenes. Permite a los usuarios autenticarse, crear, editar, eliminar y guardar notas con imágenes en la nube.

---

## 🚀 Características principales

- **Registro e inicio de sesión** con correo y Google (Firebase Auth)
- **Gestión de notas**: crear, editar, eliminar y listar notas
- **Subida de imágenes** a Cloudinary desde cada nota
- **Persistencia en la nube**: todas las notas y sus imágenes se guardan en Firestore y Cloudinary
- **Responsive UI** con Material UI
- **Gestión de estado global** con Redux Toolkit
- **Notificaciones** con SweetAlert2

---

## 🛠️ Tecnologías y herramientas usadas

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [Material UI](https://mui.com/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [Vite](https://vitejs.dev/) (opcional, según tu setup)

---

## 📁 Estructura del proyecto

```
src/
  auth/           # Autenticación y rutas protegidas
  firebase/       # Configuración de Firebase
  helpers/        # Funciones auxiliares (subida de archivos, cargar notas)
  hooks/          # Custom hooks (useForm, useCheckAuth)
  journal/        # Componentes, layouts y vistas del diario
  store/          # Redux slices y thunks
  theme/          # Temas de Material UI
  ui/             # Componentes de UI generales
  main.jsx        # Entry point
  JournalApp.jsx  # Componente principal
```

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/journal-app.git
   cd journal-app
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Firebase**
   - Crea un proyecto en [Firebase](https://console.firebase.google.com/).
   - Habilita **Authentication** (correo y Google) y **Firestore Database**.
   - Copia tu configuración en `src/firebase/config.js`:
     ```js
     export const firebaseConfig = {
       apiKey: "...",
       authDomain: "...",
       projectId: "...",
       storageBucket: "...",
       messagingSenderId: "...",
       appId: "..."
     };
     ```

4. **Configura Cloudinary**
   - Crea una cuenta en [Cloudinary](https://cloudinary.com/).
   - Crea un **upload preset** público.
   - Actualiza el preset y la URL en `src/helpers/fileUpload.js`.

5. **Variables de entorno (opcional)**
   - Puedes usar `.env` para tus claves si lo prefieres.

---

## ▶️ Cómo ejecutar la app

```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📝 Flujo de trabajo

1. **Autenticación:**  
   El usuario se registra o inicia sesión (correo o Google).

2. **Gestión de notas:**  
   - Puede crear nuevas notas, editarlas, eliminarlas.
   - Cada nota se guarda en Firestore bajo el usuario autenticado.

3. **Subida de imágenes:**  
   - Al adjuntar imágenes, se suben a Cloudinary.
   - Las URLs se guardan en el campo `imageUrls` de la nota en Firestore.

4. **Visualización:**  
   - Las imágenes se muestran en la galería de cada nota.
   - Al cambiar de nota, se cargan desde Firestore.

5. **Logout:**  
   - Al cerrar sesión, se limpia el estado local y se redirige al login.

---

## 📦 Scripts útiles

- `npm run dev` — Inicia la app en modo desarrollo
- `npm run build` — Compila la app para producción
- `npm run preview` — Previsualiza la app compilada

---

## 🧑‍💻 Contribuir

1. Haz un fork del repo
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz tus cambios y commitea (`git commit -am 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

MIT

---

## 📬 Contacto

¿Dudas o sugerencias?  
Abre un issue o contacta a [tu-email@dominio.com](mailto:tu-email@dominio.com)
