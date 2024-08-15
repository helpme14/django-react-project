// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Box,
//   Button,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";
// import AuthContext from "../context/AuthContext";
// import { useContext, useEffect, useState } from "react";
// import { getCart } from "../context/CartApi";
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

// const ProfilePage = () => {
//   const classes = useStyles();
//   const { authTokens, refreshToken, user, setAuthTokens } =
//     useContext(AuthContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // Example user data
//   //   const user = {
//   //     name: "John Doe",
//   //     email: "johndoe@example.com",
//   //     bio: "Software Engineer with a passion for coding and technology.",
//   //     profilePicture: "https://via.placeholder.com/120", // Replace with actual profile picture URL
//   //     orders: 12, // Example number of orders
//   //     preferredPayment: "Visa ending in 1234", // Example preferred payment method
//   //   };
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const data = await getCart(authTokens, refreshToken, setAuthTokens);
//         if (Array.isArray(data) && data.length > 0) {
//           const cartData = data[0];
//           setCartItems(cartData.items || []);
//           // setCartLenght(cartItems.items.length || 0);
//         } else {
//           setCartItems([]);
//           // setCartLenght(0);
//         }
//       } catch (error) {
//         setError("Failed to fetch cart items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [authTokens, refreshToken, setAuthTokens]);

//   return (
//     <Card className={classes.root}>
//       <CardContent>
//         <Avatar
//           alt={user.username}
//           src={user.profilePicture}
//           className={classes.avatar}
//         />

//         <Typography variant="h5" component="div" gutterBottom>
//           {user.username}
//         </Typography>
//         <Typography variant="body1" color="textSecondary">
//           {user.email}
//         </Typography>
//         <Box className={classes.details}>
//           <Typography variant="body2" color="textSecondary">
//             {user.full_name}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             Orders Placed: {cartItems.length}
//           </Typography>
//           {/* <Typography variant="body2" color="textSecondary">
//             Preferred Payment Method: {user.preferredPayment}
//           </Typography> */}
//         </Box>
//         <Button className={classes.button} component={Link} to="/dashboard">
//           Back
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProfilePage;
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getCart } from "../context/CartApi";
import { Link } from "react-router-dom";

// Define styled components
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

const ProfilePage = () => {
  const { authTokens, refreshToken, user, setAuthTokens } =
    useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(authTokens, refreshToken, setAuthTokens);
        if (Array.isArray(data) && data.length > 0) {
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

  // Fallback for when `user` is not available
  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <StyledCard>
      <CardContent>
        <StyledAvatar
          alt={user.username || "User Avatar"}
          src={user.profilePicture || "https://via.placeholder.com/120"}
        />
        <Typography variant="h5" component="div" gutterBottom>
          {user.username || "Username"}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email || "Email"}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {user.full_name || "Full Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Orders Placed: {cartItems.length}
          </Typography>
        </Box>
        <StyledButton component={Link} to="/dashboard">
          Back
        </StyledButton>
      </CardContent>
    </StyledCard>
  );
};

export default ProfilePage;
