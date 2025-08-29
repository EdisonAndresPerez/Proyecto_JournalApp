// Importamos la función createSlice desde Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

/**
 * Slice de autenticación para manejar el estado del usuario en la aplicación.
 * 
 * Este slice administra tres posibles estados:
 * - 'checking': Verificando si hay un usuario autenticado (por ejemplo, al cargar la app).
 * - 'authenticated': Usuario autenticado correctamente.
 * - 'not-authenticated': No hay usuario autenticado o hubo un error al intentar autenticarse.
 */
export const authSlice = createSlice({
    name: 'auth', // Nombre del slice, usado internamente por Redux.
    initialState: {
        status: 'checking', // Estado inicial: puede ser 'checking', 'authenticated' o 'not-authenticated'.
        uid: null,          // ID único del usuario (proporcionado por Firebase).
        email: null,        // Correo electrónico del usuario.
        displayName: null,  // Nombre que se muestra del usuario.
        photoURL: null,     // URL de la foto de perfil.
        errorMessage: null, // Mensaje de error (en caso de fallo al autenticarse).
    },

    // Reducers: funciones que modifican el estado global de auth
    reducers: {
        /**
         * Acción para autenticar al usuario.
         * Se usa cuando el login es exitoso.
         * 
         * @param {object} state - Estado actual.
         * @param {object} payload - Datos del usuario autenticado (uid, email, etc.).
         */
        login: ( state, { payload } ) => {
            state.status = 'authenticated'; // Usuario autenticado
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null; // Limpiamos posibles errores anteriores
        },

        /**
         * Acción para cerrar sesión o manejar un error de autenticación.
         * 
         * @param {object} state - Estado actual.
         * @param {object} payload - (Opcional) Puede incluir un mensaje de error.
         */
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticated'; // Usuario no autenticado
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage; // Guardamos el error si lo hay
        },

        /**
         * Acción que indica que se está verificando el estado de autenticación.
         * Por ejemplo, se puede usar mientras consultamos Firebase o alguna API.
         * 
         * @param {object} state - Estado actual.
         */
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Exportamos las acciones para poder usarlas en los dispatch de Redux
export const { login, logout, checkingCredentials } = authSlice.actions;
