import {doc, getDoc} from 'firebase/firestore';
import { FirebaseDB } from '../firebase/config';

export const getNotaById = async (uid, noteId) => {
  if (!uid || !noteId) throw new Error('Faltan datos');
  const noteRef = doc(FirebaseDB, uid, 'journal', 'notes', noteId);
  const noteSnap = await getDoc(noteRef);
  if (!noteSnap.exists()) throw new Error('Nota no encontrada');
  return { id: noteSnap.id, ...noteSnap.data() };
};