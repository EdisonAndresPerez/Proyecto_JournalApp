// import { createSlice } from "@reduxjs/toolkit";

// export const journalSlice = createSlice({
//   name: "journal",
//   initialState: {
//     isSaving: false,
//     messageSaved: "",
//     notes: [],
//     active: null,
//   },
//   reducers: {
//     savingNewNote: (state) => {
//       state.isSaving = true;
//     },
//     addNewNote: (state, action) => {
//       state.notes.push(action.payload);
//       state.isSaving = false;
//     },
//     setActiveNote: (state, action) => {
//       state.active = action.payload;
//       state.messageSaved = "";
//     },
//     setNotes: (state, action) => {
//       state.notes = action.payload;
//     },
//     setSaving: (state) => {
//       state.isSaving = true;
//       state.messageSaved = "";
//     },

//     updateNote: (state, action) => {
//       state.isSaving = false;
//       state.notes = state.notes.map((note) =>
//         note.id === action.payload.id ? action.payload : note
//       );

//       state.messageSaved = `La nota se actualizó correctamente`;
//     },

//     setMessageSaved: (state, action) => {
//       state.messageSaved = action.payload;
//     }, 

//     setPhotosToActiveNote: (state, action) => {
//       const urls = Array.isArray(action.payload)
//         ? action.payload
//         : [action.payload];
//       state.active.imageUrls = [...(state.active.imageUrls || []), ...urls];
//       state.isSaving = false;
//     },

//     clearNotesLogout: (state) => {
//       state.isSaving = false;
//       state.messageSaved = "";
//       state.notes = [];
//       state.active = null;
//     },
//     deleteNoteById: (state, action) => {
//       state.active = null;
//       state.notes = state.notes.filter((note) => note.id !== action.payload);
//       if (state.active?.id === action.payload) {
//         state.active = null;
//       }
//     },
//   },
// });

// export const {
//   addNewNote,
//   setActiveNote,
//   setNotes,
//   updateNote,
//   deleteNoteById,
//   savingNewNote,
//   setSaving,
//   setPhotosToActiveNote,
//   clearNotesLogout,
//   setMessageSaved,
// } = journalSlice.actions;
