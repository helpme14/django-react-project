import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paginationbottom from "./Pagination";
import { addItemToCart } from "../context/CartApi";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import swal from "sweetalert2";

function DashboardImagesection() {
  const [products, setProducts] = useState([]);
  const [cartQuantities, setCartQuantities] = useState({});
  const { authTokens, refreshToken, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://my-django-react.onrender.com/catalog/products/"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, increment) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + increment,
    }));
  };

  const handleAddToCart = async (product) => {
    if (!user || !authTokens) {
      console.error("User is not authenticated");
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to be logged in to add items to the cart!",
      });
      return;
    }

    try {
      const quantity = cartQuantities[product.id] || 0;

      // Check if quantity is 0
      if (quantity === 0) {
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Quantity must not be 0. Please select a valid quantity.",
        });
        return; // Exit the function early if quantity is 0
      }

      // Proceed to add the item to the cart
      await addItemToCart(product.id, quantity, authTokens, refreshToken, user);

      swal.fire({
        icon: "success",
        title: "Added to cart",
        text: `${quantity} ${product.name} added to cart`,
      });
      setCartQuantities(0);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error adding the item to your cart. Please try again.",
      });
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: {
            xs: "5px",
            sm: "8px",
            md: "10px",
            lg: "15px",
            xl: "30px",
          },
        }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.id}>
            <Card
              sx={{
                backgroundColor: "#e0f7fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #0288d1",
                borderRadius: "10px",
                height: "100%",
                marginX: "5px",
              }}
            >
              <CardMedia
                component="img"
                image={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                sx={{
                  height: 200,
                  objectFit: "cover", // This will make sure the image covers the area without distortion
                  width: "100%", // Ensure the image fills the container width
                }}
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
              <Box
                sx={{ display: "flex", alignItems: "center", padding: "10px" }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  sx={{
                    marginRight: "15px",
                    // backgroundColor: "deepskyblue",
                    "&:hover": {
                      backgroundColor: "skyblue", // Change color on hover
                    },
                    "&:active": {
                      backgroundColor: "dodgerblue", // Change color on click
                    },
                  }}
                  // backgroundColor="skyblue"
                >
                  -
                </Button>
                <Typography variant="body1">
                  {cartQuantities[product.id] || 0}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  sx={{
                    marginLeft: "15px",
                    "&:hover": {
                      backgroundColor: "skyblue", // Change color on hover
                    },
                    "&:active": {
                      backgroundColor: "dodgerblue", // Change color on click
                    },
                  }}
                >
                  +
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleAddToCart(product)}
                sx={{
                  margin: "20px",
                  "&:hover": {
                    backgroundColor: "skyblue", // Change color on hover
                  },
                  "&:active": {
                    backgroundColor: "dodgerblue", // Change color on click
                  },
                }}
              >
                Add to Cart
              </Button>
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
          justifyContent: "center",
          marginTop: "100px",
          padding: 2,
        }}
      >
        <Paginationbottom />
      </Box>
    </>
  );
}

export default DashboardImagesection;
