import { doc, deleteDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const deleteNota = async ({ uid, id }) => {
  const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
  await deleteDoc(noteRef);
  return id;
};