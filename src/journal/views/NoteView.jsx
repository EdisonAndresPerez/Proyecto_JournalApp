import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateNota,
  deleteNota,
  uploadImagesToNote,
  getNotaById,
} from "../../helpers";
import { Button as ShadcnButton } from "@/components/ui/Button/button";
import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { useMemo, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const NoteView = ({ note, onNoteDeleted }) => {
  const [expandedImage, setExpandedImage] = useState(null);
  const { uid } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const {
    data: notaData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["nota", uid, note?.id],
    queryFn: () => getNotaById(uid, note?.id),
    enabled: !!uid && !!note?.id,
  });

  const prevNoteId = useRef(note?.id);
  const [initialFormData, setInitialFormData] = useState(notaData || {});

  // Solo actualiza el formulario inicial cuando cambia la nota (no cuando subes imágenes)
  useEffect(() => {
    if (note?.id !== prevNoteId.current && notaData) {
      setInitialFormData(notaData);
      prevNoteId.current = note?.id;
    }
  }, [note?.id, notaData]);

  const { body, title, date, onInputChange, formState, onResetForm } = useForm(
    initialFormData
  );

  const dataString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // Mutación para actualizar nota
  const updateMutation = useMutation({
    mutationFn: (nota) => updateNota({ uid, nota }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nota", uid, note?.id] });
      queryClient.invalidateQueries({ queryKey: ["notas", uid] });
      Swal.fire(
        "Nota actualizada",
        "La nota se actualizó correctamente",
        "success"
      );
    },
  });

  // Mutación para eliminar nota
  const deleteMutation = useMutation({
    mutationFn: () => deleteNota({ uid, id: note.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notas", uid] });
      Swal.fire("Nota eliminada", "La nota fue eliminada", "success");
      console.log("Nota eliminada:", note);
      if (onNoteDeleted) onNoteDeleted(note);
    },
  });

  // Mutación para subir imágenes (NO REINICIA EL FORMULARIO)
  const uploadMutation = useMutation({
    mutationFn: ({ files }) =>
      uploadImagesToNote({ uid, note: notaData, files }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nota", uid, note?.id] });
      queryClient.invalidateQueries({ queryKey: ["notas", uid] });
      Swal.fire(
        "Imágenes subidas",
        "Las imágenes se agregaron correctamente",
        "success"
      );
      // NO llamamos a onResetForm aquí
    },
  });

  const onSaveNote = () => {
      const notaCompleta = {
    ...formState,
    id: note.id,
    imageUrls: notaData?.imageUrls || [], 
  };

    updateMutation.mutate(notaCompleta);
    console.log("Nota guardada:", notaCompleta);

  };

  const onDelete = async () => {
    const result = await Swal.fire({
      icon: "error",
      title: "¿Eliminar nota?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#8e24aa",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      deleteMutation.mutate();
    }
  };

  const onFileInputChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    uploadMutation.mutate({ files: e.target.files });
  };

  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) return <Typography>Cargando nota...</Typography>;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-8">
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-bold text-purple-700">{dataString}</span>
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={onFileInputChange}
            style={{ display: "none" }}
          />
          <ShadcnButton
            type="button"
            variant="outline"
            disabled={uploadMutation.isPending}
            className="rounded-full cursor-pointer"
            onClick={handleUploadClick}
          >
            <UploadOutlined />
            <span className="ml-2">Subir imágenes</span>
          </ShadcnButton>
          <ShadcnButton
            onClick={onSaveNote}
            disabled={updateMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow px-4 py-2 flex items-center gap-2"
          >
            <SaveOutlined />
            Guardar
          </ShadcnButton>
          <ShadcnButton
            onClick={onDelete}
            variant="destructive"
            disabled={deleteMutation.isPending}
            className="font-bold rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <DeleteOutline className="w-5 h-5" />
            ELIMINAR
          </ShadcnButton>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Título
        </label>
        <input
          type="text"
          name="title"
          value={title || ""}
          onChange={onInputChange}
          placeholder="Ingrese un título"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Descripción
        </label>
        <textarea
          name="body"
          value={body || ""}
          onChange={onInputChange}
          placeholder="¿Qué sucedió en el día de hoy?"
          rows={5}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {notaData?.imageUrls?.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Nota ${idx}`}
              className="rounded-lg shadow object-cover w-full h-32 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => setExpandedImage(url)}
            />
          ))}
        </div>
        <Dialog
          open={!!expandedImage}
          onOpenChange={() => setExpandedImage(null)}
        >
          <DialogContent className="flex items-center justify-center bg-transparent shadow-none p-0">
            {expandedImage && (
              <img
                src={expandedImage}
                alt="Expandida"
                className="max-w-full max-h-[80vh] rounded-xl shadow-2xl transition-transform duration-300"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
