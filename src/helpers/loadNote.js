import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const loadNote = async (uid = "") => {
  if (!uid) throw new Error("El UID del usuario no existe");
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];
  docs.forEach((doc) => {
    const data = doc.data();
    notes.push({
      id: doc.id,
      ...data,
      imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
    });
  });
  return notes;
};

