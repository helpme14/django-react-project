// import { useContext, useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext"; // Adjust the import path as needed
// import { getCart } from "../context/CartApi"; // Adjust the import path as needed
// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Box,
//   Button,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 600,
//     margin: "auto",
//     marginTop: theme.spacing(4),
//     padding: theme.spacing(2),
//     textAlign: "center",
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     margin: "auto",
//     border: "3px solid #0288d1",
//   },
//   details: {
//     marginTop: theme.spacing(2),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     backgroundColor: "#0288d1",
//     color: "#fff",
//     "&:hover": {
//       backgroundColor: "#0277bd",
//     },
//   },
// }));

// const CartUser = () => {
//   const classes = useStyles();
//   const { authTokens, refreshToken, setAuthTokens } = useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const data = await getCart(authTokens, refreshToken, setAuthTokens);
//         // console.log("Fetched cart data:", data); // Log fetched data

//         // Ensure data structure is correct
//         if (Array.isArray(data) && data.length > 0) {
//           // Assuming the first item in the array is what you need
//           const cartData = data[0];
//           setCartItems(cartData.items || []);
//         } else {
//           setCartItems([]);
//         }
//       } catch (error) {
//         setError("Failed to fetch cart items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [authTokens, refreshToken, setAuthTokens]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Card className={classes.root}>
//         <CardContent>
//           <Typography variant="h4" component="div" gutterBottom>
//             My Cart
//           </Typography>

//           <Avatar
//             // alt={user.username}
//             // src={user.profilePicture}
//             className={classes.avatar}
//           />

//           <Typography variant="h5" gutterBottom>
//             Username
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             email
//           </Typography>
//           <Box className={classes.details}>
//             <Typography variant="body2" color="textSecondary">
//               Full name
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Orders Placed: {cartItems.length}
//             </Typography>
//             {/* <Typography variant="body2" color="textSecondary">
//             Preferred Payment Method: {user.preferredPayment}
//           </Typography> */}

//             {cartItems.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               <Box
//                 component="ul"
//                 sx={{ listStyle: "none", padding: 0, margin: 0 }}
//               >
//                 {cartItems.map((item) => (
//                   <li key={item.id}>
//                     Product: {item.product_name} - Quantity: {item.quantity} -
//                     Price: {item.price}
//                     <br />
//                     Total : {item.quantity * item.price}
//                   </li>
//                 ))}
//               </Box>
//             )}
//           </Box>
//           <Button className={classes.button} component={Link} to="/dashboard">
//             Back
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CartUser;
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext"; // Adjust the import path as needed
import { getCart } from "../context/CartApi"; // Adjust the import path as needed
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  textAlign: "center",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: "auto",
  border: "3px solid #0288d1",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#0288d1",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0277bd",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const CartUser = () => {
  const { authTokens, refreshToken, setAuthTokens } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(authTokens, refreshToken, setAuthTokens);
        // Ensure data structure is correct
        if (Array.isArray(data) && data.length > 0) {
          // Assuming the first item in the array is what you need
          const cartData = data[0];
          setCartItems(cartData.items || []);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [authTokens, refreshToken, setAuthTokens]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            My Cart
          </Typography>

          <StyledAvatar
          // alt={user.username}
          // src={user.profilePicture}
          />

          <Typography variant="h5" gutterBottom>
            Username
          </Typography>
          <Typography variant="body1" color="textSecondary">
            email
          </Typography>
          <StyledBox>
            <Typography variant="body2" color="textSecondary">
              Full name
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Orders Placed: {cartItems.length}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
              Preferred Payment Method: {user.preferredPayment}
            </Typography> */}

            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <Box
                component="ul"
                sx={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {cartItems.map((item) => (
                  <li key={item.id}>
                    Product: {item.product_name} - Quantity: {item.quantity} -
                    Price: {item.price}
                    <br />
                    Total : {item.quantity * item.price}
                  </li>
                ))}
              </Box>
            )}
          </StyledBox>
          <StyledButton component={Link} to="/dashboard">
            Back
          </StyledButton>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default CartUser;
