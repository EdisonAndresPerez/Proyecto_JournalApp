import { collection, getDocs, doc } from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const getNotas = async (uid) => {
  if (!uid) throw new Error('UID no proporcionado');
  try {
    const userDocRef = doc(FirebaseDB, uid, 'journal');
    
    const notasRef = collection(userDocRef, 'notes');
    const notasSnap = await getDocs(notasRef);
    const notas = [];
    notasSnap.forEach((doc) => {
      notas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return notas;
  } catch (error) {
    console.error("Error obteniendo notas:", error);
    throw error;
  }
};
