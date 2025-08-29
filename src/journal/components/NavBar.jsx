import { useDispatch } from "react-redux";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { startLogout } from "../../store/auth";

export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

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
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        background: "linear-gradient(90deg, #4F46E5 0%, #bbdefb 100%)",
        boxShadow: "0 2px 12px 0 rgba(25,118,210,0.10)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="animated-text cursor-pointer">
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                fontWeight: "bold",
                letterSpacing: 1,
                color: "#FFFFFF",
                display: "inline-block",
              }}
            >
              {createAnimatedText("JournalApp")}
            </Typography>
          </div>

          <Box>
            <IconButton
              onClick={onLogout}
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#F87171", // Color inicial (rojo suave)
                ml: 1,
                transition: "all 0.3s ease-in-out", 
                "&:hover": {
                  backgroundColor: "rgba(220, 38, 38, 0.2)", 
                  color: "#DC2626",
                  transform: "scale(1.1)", 
                  boxShadow: "0 4px 15px rgba(220, 38, 38, 0.4)", 
                },
              }}
            >
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
