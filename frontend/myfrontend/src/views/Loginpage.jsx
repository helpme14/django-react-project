import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const defaultTheme = createTheme();

export default function SignInSide() {
  const { loginUser } = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [inputValues, setInputValues] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Debounced validation function
  const debouncedValidate = useCallback(
    debounce((name, value) => {
      let emailError = errors.email;
      let passwordError = errors.password;

      if (name === "email") {
        emailError = validateEmail(value) ? "" : "Invalid email address";
      }

      if (name === "password") {
        passwordError = validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long and include at least one letter and one number";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
        password: passwordError,
      }));
    }, 300),
    [errors]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Call the debounced validation function
    debouncedValidate(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = inputValues;

    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "Invalid email address";
    }

    if (!validatePassword(password)) {
      passwordError =
        "Password must be at least 8 characters long and include at least one letter and one number";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setErrors({ ...errors, password: "An unexpected error occurred" });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
              Sign in
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
                error={!!errors.email}
                helperText={errors.email}
                autoFocus
                value={inputValues.email}
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
