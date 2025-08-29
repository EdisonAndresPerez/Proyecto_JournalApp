import {loginWithEmailPassword,registerUserWithEmailPassword,singInWithGoogle,  logoutFirebase} from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./";
/**
 * Creador de acción tipo thunk que inicia el proceso de verificación de autenticación.
 * Despacha la acción `checkingCredentials` para actualizar el estado de autenticación.
 *
 * @returns {Function} Una función thunk que recibe la función dispatch de Redux.
 */
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

/**
 * Inicia el proceso de inicio de sesión con Google.
 * Despacha una acción para verificar las credenciales y luego intenta iniciar sesión con Google.
 * Si el inicio de sesión falla, despacha una acción de logout con el mensaje de error.
 * Si el inicio de sesión es exitoso, despacha una acción de login con el resultado.
 *
 * @returns {Function} Función thunk que será gestionada por el middleware Redux Thunk.
 */

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};


/**
 * Acción tipo thunk para iniciar el proceso de creación de un nuevo usuario con correo y contraseña.
 * Despacha la acción de verificación de credenciales, intenta registrar al usuario y gestiona el login o logout según el resultado.
 *
 * @param {Object} param0 - Las credenciales del usuario y su nombre visible.
 * @param {string} param0.email - Correo electrónico del usuario.
 * @param {string} param0.password - Contraseña del usuario.
 * @param {string} param0.displayName - Nombre visible del usuario.
 * @returns {Function} Función thunk que será gestionada por el middleware Redux Thunk.
 */

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());


    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};


/**
 * Creador de acción tipo thunk para iniciar sesión con correo electrónico y contraseña.
 * Despacha la acción checkingCredentials y luego intenta iniciar sesión con las credenciales proporcionadas.
 * Si el inicio de sesión falla, despacha logout con el resultado; de lo contrario, despacha login.
 *
 * @param {Object} param0 - Las credenciales de inicio de sesión.
 * @param {string} param0.email - Correo electrónico del usuario.
 * @param {string} param0.password - Contraseña del usuario.
 * @returns {Function} Función thunk que será gestionada por el middleware Redux Thunk.
 */

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if (!result.ok) return dispatch(logout(result));
    dispatch(login(result));
  };
};

/**
 * Creador de acción tipo thunk para cerrar sesión del usuario.
 * 
 * Esta función cierra la sesión del usuario de forma asíncrona desde Firebase
 * y luego despacha la acción de logout para actualizar el estado de la aplicación.
 *
 * @returns {Function} Función thunk que será gestionada por el middleware Redux Thunk.
 */

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
