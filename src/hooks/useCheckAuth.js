import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

//Escucha el estado de autenticacion de Firebase
/**
 * Hook personalizado de React para verificar el estado de autenticación del usuario.
 *
 * Este hook escucha los cambios en el estado de autenticación utilizando Firebase Auth.
 * Si un usuario está autenticado, despacha acciones para cargar las notas del usuario e iniciar sesión.
 * Si no hay ningún usuario autenticado, despacha una acción para cerrar sesión.
 *
 * @returns {string} El estado actual de autenticación desde el store de Redux.
 *
 * @ejemplo
 * const estado = useCheckAuth();
 * if (estado === 'authenticated') {
 *   // El usuario ha iniciado sesión
 * }
 */

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, [dispatch]);

  return status;
};
