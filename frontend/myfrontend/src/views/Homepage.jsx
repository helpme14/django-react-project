import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Imagesection from "./Imagesection"; // Import Imagesection
import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        scrollBehavior: "smooth",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* First Section: Main Homepage */}
      <Box
        sx={{
          backgroundColor: "#e0f7fa", // Light blue background
          minHeight: "100vh", // Minimum height to cover full viewport
          overflow: "hidden", // Prevent content overflow
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant={isSmallScreen ? "h4" : "h2"}
          component="h1"
          gutterBottom
          sx={{
            color: "#0277bd", // Darker blue for the main heading
            fontWeight: "bold",
          }}
        >
          Welcome to Our{" "}
          <span style={{ color: "#0288d1", fontWeight: "bold" }}>
            E-Commerce Store
          </span>
        </Typography>
        <Typography
          variant={isSmallScreen ? "body1" : "h6"}
          component="p"
          sx={{
            color: "#0288d1", // Slightly lighter blue for the subheading
            marginBottom: 4,
          }}
        >
          Discover amazing products and great deals. Shop now and enjoy a
          seamless online shopping experience.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size={isSmallScreen ? "medium" : "large"}
          sx={{
            backgroundColor: "#01579b", // Darker blue button
            textTransform: "none",
            fontSize: isSmallScreen ? "1rem" : "1.2rem",
            "&:hover": {
              backgroundColor: "#0288d1", // Lighter blue on hover
            },
          }}
        >
          Start Shopping
        </Button>
      </Box>

      {/* Second Section: Imagesection */}
      <Box
        sx={{
          minHeight: "100vh", // Fullscreen height
          backgroundColor: "#e0f7fa", // Another background color to differentiate sections
          margin: 0,
          padding: 0,
        }}
      >
        <Imagesection />
      </Box>
    </Box>
  );
}

export default Homepage;
