import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { debounce } from "lodash";
import { useCallback } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://helpme14.github.io/sicat-gio/">
        My Full Stack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function RegisterSide() {
  const { registerUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const debouncedValidate = useCallback(
    debounce((name, value) => {
      let emailError = errors.email;
      let passwordError = errors.password;
      let confirmPasswordError = errors.confirmPassword;

      if (name === "email") {
        emailError = validateEmail(value) ? "" : "Invalid email address";
      }

      if (name === "password") {
        passwordError = validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long and include at least one letter and one number";
      }

      if (name === "confirmPassword" || name === "password") {
        confirmPasswordError =
          value === inputValues.password ||
          value === inputValues.confirmPassword
            ? ""
            : "Passwords do not match";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      }));
    }, 300),
    [errors, inputValues]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    debouncedValidate(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = inputValues;

    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (!validateEmail(email)) {
      emailError = "Invalid email address";
    }

    if (!validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long and include at least one letter and one number";
    }

    if (password !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    try {
      await registerUser(email, username, password, confirmPassword);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "An unexpected error occurred",
      }));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "linear-gradient(to bottom, #0a1929, #1e3a8a)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
                value={inputValues.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={inputValues.username}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password}
                value={inputValues.password}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                value={inputValues.confirmPassword}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Copyright sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
