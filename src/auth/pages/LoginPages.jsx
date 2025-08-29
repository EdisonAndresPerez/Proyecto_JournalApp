import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

const formDate = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formDate);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    // console.log({ email, password })
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
        style={{ width: "100%" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              sx={{
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
                backgroundColor: "#f7f7f7",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              sx={{
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
                backgroundColor: "#f7f7f7",
              }}
            />
          </Grid>

          <Grid container display={!!errorMessage ? "" : "none"} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.07)",
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="outlined"
                fullWidth
                onClick={onGoogleSignIn}
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  color: "#4285F4",
                  borderColor: "#4285F4",
                  boxShadow: "0px 2px 8px rgba(66,133,244,0.07)",
                  "&:hover": {
                    backgroundColor: "#e3f0fd",
                  },
                }}
                startIcon={<Google />}
              >
                Google
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Link
              component={RouterLink}
              color="primary"
              to="/auth/register"
              sx={{
                fontWeight: "bold",
                textDecoration: "underline",
                mt: 1,
              }}
            >
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
