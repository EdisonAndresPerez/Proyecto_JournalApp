import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { NavBar, SideBar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children, onSelectNote, activeNoteId }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} onSelectNote={onSelectNote} activeNoteId={activeNoteId} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
