import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";
import { useQuery } from "@tanstack/react-query";
import { getNotas } from "../../helpers/getNotas";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/Sheet/sheet";
import { Button } from "@/components/ui/Button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

export const SideBar = ({ drawerWidth = 240, onSelectNote, activeNoteId }) => {
  // const authState = useSelector((state) => state.auth);
  // console.log('Estado completo de auth:', authState);
  const { displayName, uid, photoURL } = useSelector((state) => state.auth);

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notas", uid],
    queryFn: () => getNotas(uid),
    enabled: !!uid,
    select: (data) => {
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  });

  return (
    <aside className="">
      <div className="md:hidden p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-full">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SidebarContent
              displayName={displayName}
              photoURL={photoURL}
              notes={notes}
              isLoading={isLoading}
              error={error}
              onSelectNote={onSelectNote}
              activeNoteId={activeNoteId}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block w-64 h-full bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 border-r rounded-br-3xl shadow-lg">
        <SidebarContent
          displayName={displayName}
          photoURL={photoURL}
          notes={notes}
          isLoading={isLoading}
          error={error}
          onSelectNote={onSelectNote}
          activeNoteId={activeNoteId}
        />
      </div>
    </aside>
  );
};

function SidebarContent({
  displayName,
  notes,
  isLoading,
  error,
  onSelectNote,
  activeNoteId,
  photoURL,
}) {
  const createAnimatedText = (text) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        className="inline-block transition-transform duration-300 ease-out hover-letter"
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4">
        <div className="avatar-container">
          <Avatar className="w-10 h-10 border-2 border-white shadow-lg transition-all duration-500 ease-in-out hover:border-purple-400 hover:shadow-purple-400/50 hover:scale-110 hover:rotate-12">
            <AvatarImage
              src={photoURL}
              alt={displayName || "Usuario"}
              className="object-cover"
            />
            <AvatarFallback className="bg-white text-purple-700 font-bold text-lg">
              {displayName ? displayName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="font-bold flex items-center gap-1 text-white">
            <span className="animated-text cursor-pointer">
              {createAnimatedText("Bienvenido")}
            </span>
            <span role="img" aria-label="saludo">
              👋
            </span>
          </div>
          <div className="text-white font-bold text-sm">
            <span className="animated-text cursor-pointer">
              {createAnimatedText(displayName || "Usuario")}
            </span>
          </div>
        </div>
      </div>
      <hr className="mb-2 border-white/30" />
      <div className="flex-1 overflow-y-auto px-2">
        {isLoading && (
          <div className="px-2 text-sm text-white/80">Cargando notas...</div>
        )}
        {error && (
          <div className="px-2 text-red-200 text-sm">Error al cargar notas</div>
        )}
        <ul className="space-y-1">
          {notes.map((note) => (
            <SideBarItem
              key={note.id}
              {...note}
              onSelectNote={onSelectNote}
              isSelected={note.id === activeNoteId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
