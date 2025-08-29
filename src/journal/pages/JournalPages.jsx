//import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { createNota } from "../../helpers/createNota";
//import { startNewNote } from '../../store/journal/thunks';

export const JournalPages = () => {
  const { uid } = useSelector((state) => state.auth);
  const [active, setActive] = useState(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createNota(uid),
    onSuccess: (newNote) => {
      setActive(newNote);
      queryClient.invalidateQueries({ queryKey: ["notas", uid] });
    },
  });

  const onNoteDeleted = (note) => {
    if (active?.id === note.id) {
      setActive(null);
    }
  };

  //const dispatch = useDispatch();
  //const {isSaving, active} = useSelector(state => state.journal || { isSaving: false });
  //const onClickNewNote  =() => {
  //  dispatch(startNewNote())
  //  console.log('Crear una nueva nota');
  //}

  const onClickNewNote = () => {
    mutate();
  };

  return (
    <JournalLayout onSelectNote={setActive} activeNoteId={active?.id}>
      {active ? (
        <NoteView note={active} onNoteDeleted={() => setActive(null)} />
      ) : (
        <NothingSelectedView />
      )}
      {/* Botón flotante para agregar nueva entrada */}
      <IconButton
        onClick={onClickNewNote}
        disabled={isPending}
        sx={{
          position: 'fixed',
          right: 40,
          bottom: 40,
          backgroundColor: 'primary.main',
          color: 'white',
          boxShadow: 3,
          '&:hover': { backgroundColor: 'primary.dark' },
          zIndex: 1000,
        }}
        size="large"
        aria-label="Agregar nueva entrada"
      >
        <AddOutlined fontSize="inherit" />
      </IconButton>
    </JournalLayout>
  );
};

