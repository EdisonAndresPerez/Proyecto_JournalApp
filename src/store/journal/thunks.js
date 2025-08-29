// import { setMessageSaved } from "./journalSlide";
// import { setDoc, doc, collection, deleteDoc } from "firebase/firestore";
// import { FirebaseDB } from "../../firebase/config";
// import {
//   addNewNote,
//   setActiveNote,
//   savingNewNote,
//   setSaving,
//   setNotes,
//   setPhotosToActiveNote,
//   updateNote,
//   deleteNoteById,         // <-- asegúrate de importar esto
// } from "./journalSlide";
// import { loadNote } from "../../helpers/loadNote";
// import { fileUpload } from "../../helpers/fileUpload";

// export const startNewNote = () => {
//   return async (dispatch, getState) => {
//     dispatch(savingNewNote());

//     const { uid } = getState().auth;

//     if (!uid) {
//       console.log("Usuario no autenticado");
//       return;
//     }

//     console.log("startNewNote");

//     const newNote = {
//       title: "",
//       body: "",
//       date: new Date().getTime(),
//       imageUrls: [],
//     };

//     try {
//       const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
//       await setDoc(newDoc, newNote);

//       newNote.id = newDoc.id;

//       // Hacer dispatch para agregar la nueva nota
//       dispatch(addNewNote(newNote));

//       // Hacer dispatch para activar la nota
//       dispatch(setActiveNote(newNote));

//       console.log("Nueva nota creada:", newNote);
//     } catch (error) {
//       console.log("Error al crear la nota:", error);
//     }
//   };
// };

// //--------------------------------------------------------

// export const startLoadingNotes = () => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     if (!uid) {
//       console.log("No hay usuario autenticado");
//       return;
//     }

//     const notes = await loadNote(uid);
//     dispatch(setNotes(notes));
//   };
// };

// //--------------------------------------------------------

// export const startSaveNote = (notaData) => {
//   return async (dispatch, getState) => {
//     dispatch(setSaving());

//     const { uid } = getState().auth;
//     const noteToFirestore = { ...notaData };
//     delete noteToFirestore.id;

//     if (!Array.isArray(noteToFirestore.imageUrls)) {
//       noteToFirestore.imageUrls = [];
//     }

//     const docRef = doc(FirebaseDB, `${uid}/journal/notes/${notaData.id}`);
//     await setDoc(docRef, noteToFirestore, { merge: true });

//     dispatch(updateNote({ ...notaData, ...noteToFirestore }));

//     dispatch(startLoadingNotes());
//   };
// };



// export const startUploadingFiles = (files = []) => {
//   return async (dispatch, getState) => {
//     dispatch(setSaving());

//     const fileUploadPromises = [];
//     for (const file of files) {
//       fileUploadPromises.push(fileUpload(file));
//     }

//     const photosUrls = await Promise.all(fileUploadPromises);

//     const { uid } = getState().auth;
//     const { active: note } = getState().journal;

//     const updatedNote = {
//       ...note,
//       imageUrls: Array.from(
//         new Set([...(note.imageUrls || []), ...photosUrls])
//       ),
//     };

//     const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
//     await setDoc(docRef, updatedNote, { merge: true });

//     dispatch(setActiveNote(updatedNote));
//     dispatch(updateNote(updatedNote));
//     dispatch(setMessageSaved("La imagen se colocó con éxito"));
//   };
// };


// export const startDeleteNote = () => {
//   return async (dispatch, getState) => {
//     const { uid } = getState().auth;
//     const { active: note } = getState().journal;

//     const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
//     await deleteDoc(docRef);
//     dispatch(deleteNoteById(note.id))
//   };
// };