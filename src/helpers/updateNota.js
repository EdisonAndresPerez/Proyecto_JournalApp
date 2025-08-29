import { doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const updateNota = async ({ uid, nota }) => {
  const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${nota.id}`);
  await updateDoc(noteRef, { ...nota });
  return { ...nota };
};