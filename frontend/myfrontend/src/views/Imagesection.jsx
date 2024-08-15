import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paginationbottom from "./Pagination";
import React from "react";
function Imagesection() {
  const sampleProducts = [
    { id: 1, imageUrl: "https://via.placeholder.com/150", name: "Product 1" },
    { id: 2, imageUrl: "https://via.placeholder.com/150", name: "Product 2" },
    { id: 3, imageUrl: "https://via.placeholder.com/150", name: "Product 3" },
    { id: 4, imageUrl: "https://via.placeholder.com/150", name: "Product 4" },
    { id: 5, imageUrl: "https://via.placeholder.com/150", name: "Product 5" },
    { id: 6, imageUrl: "https://via.placeholder.com/150", name: "Product 6" },
    { id: 7, imageUrl: "https://via.placeholder.com/150", name: "Product 7" },
    { id: 8, imageUrl: "https://via.placeholder.com/150", name: "Product 8" },
    { id: 9, imageUrl: "https://via.placeholder.com/150", name: "Product 9" },
    { id: 10, imageUrl: "https://via.placeholder.com/150", name: "Product 10" },
    { id: 11, imageUrl: "https://via.placeholder.com/150", name: "Product 11" },
    { id: 12, imageUrl: "https://via.placeholder.com/150", name: "Product 12" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1700px",
        backgroundColor: "#e0f7fa", // Light blue background
        // Adjust this value based on navbar height
        padding: 6,
      }}
    >
      <Grid container spacing={4} sx={{ marginTop: "80px" }}>
        {sampleProducts.map((product) => (
          <Grid item xs={16} sm={6} md={4} xl={2} key={product.id}>
            <Card
              sx={{
                backgroundColor: "#e0f7fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #0288d1", // Blue border color
                borderRadius: "10px", // Rounded corners
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#01579b",
                  textAlign: "center",
                  padding: "10px 0",
                }}
              >
                {product.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          backgroundColor: "#e0f7fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Center horizontally and vertically
          marginTop: "90px",
          padding: 2, // Optional padding
        }}
      >
        {" "}
        <Paginationbottom />
      </Box>
    </Box>
  );
}

export default Imagesection;
