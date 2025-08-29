import { useMemo } from "react";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Bookmark } from "lucide-react";

export const SideBarItem = ({
  title = "",
  body,
  id,
  date,
  imageUrls = [],
  onSelectNote,
  isSelected = false,
}) => {
  const onClickNote = () => {
    if (onSelectNote) {
      onSelectNote({ id, title, body, date, imageUrls });
    }
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const newBody = useMemo(() => {
    return body.length > 25 ? body.substring(0, 25) + "..." : body;
  }, [body]);

  return (
    <div>
      <ListItem
        disablePadding
        sx={{
          margin: "4px 0",
          borderRadius: "8px",
          transition: "all 0.3s ease-in-out",
          ...(isSelected && {
            border: "2px solid white",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }),
          ...(!isSelected && {
            "&:hover": {
              border: "2px solid white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.02)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }),
          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        <ListItemButton
          onClick={onClickNote}
          sx={{
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ListItemIcon>
            <Bookmark
              className={`w-5 h-5 transition-all duration-300 ${
                isSelected ? "text-white fill-white" : "text-white"
              }`}
            />
          </ListItemIcon>
          <Grid container>
            <ListItemText
              primary={newTitle}
              secondary={newBody}
              sx={{
                "& .MuiListItemText-primary": {
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                },
                "& .MuiListItemText-secondary": {
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.75rem",
                },
              }}
            />
          </Grid>
        </ListItemButton>
      </ListItem>
    </div>
  );
};
