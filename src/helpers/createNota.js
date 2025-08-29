import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const createNota = async (uid) => {
  const newNote = {
    title: "",
    body: "",
    date: new Date().getTime(),
    imageUrls: [],
  };
  const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
  await setDoc(newDoc, newNote);
  return { ...newNote, id: newDoc.id };
};