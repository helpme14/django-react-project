import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paginationbottom from "./Pagination";

function DashboardImagesection() {
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
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: {
            xs: "5px", // Extra-small screens
            sm: "8px", // Small screens
            md: "10px", // Medium screens
            lg: "15px", // Large screens
            xl: "30px", // Extra-large screens
          },

          //   marginLeft: {
          //     xl: "1px",
          //   },
        }}
      >
        {sampleProducts.map((product) => (
          <Grid
            item
            xs={12} // Full width on extra-small screens
            sm={6} // Half width on small screens
            md={4} // One-third width on medium screens
            lg={3} // One-quarter width on large screens
            xl={2} // One-sixth width on extra-large screens
            key={product.id}
          >
            <Card
              sx={{
                backgroundColor: "#e0f7fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #0288d1",
                borderRadius: "10px",
                height: "95%", // Ensure the card takes full height of grid item
                marginX: "5px",
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
                  padding: "15px 0",
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
          marginTop: "100px",
          padding: 2, // Optional padding
        }}
      >
        {" "}
        <Paginationbottom />
      </Box>
    </>
  );
}

export default DashboardImagesection;
