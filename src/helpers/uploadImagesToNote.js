import { doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";
import { fileUpload } from "./fileUpload";

export const uploadImagesToNote = async ({ uid, note, files }) => {
  // Sube todas las imágenes y obtiene sus URLs
  const uploadPromises = Array.from(files).map(fileUpload);
  const imageUrls = await Promise.all(uploadPromises);

  // Actualiza la nota con las nuevas URLs
  const updatedNote = {
    ...note,
    imageUrls: Array.from(new Set([...(note.imageUrls || []), ...imageUrls])),
  };

  const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
  await updateDoc(noteRef, updatedNote);

  return updatedNote;
};