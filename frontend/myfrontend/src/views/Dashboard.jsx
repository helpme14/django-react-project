import DashboardNavbar from "./DashboardNavbar";
import Box from "@mui/material/Box";
import DashboardImagesection from "./DashboardImagesection";
import DashboardAddItems from "./DashboardAddItem";
// import { useEffect } from "react";

// import { getCart } from "../context/CartApi";
// import { useContext} from "react";
// import AuthContext from "../context/AuthContext";

function Dashboard() {
  // const [cartItems, setCartItems] = useState([]);
  // const { authTokens, refreshToken } = useContext(AuthContext);

  // Use useCallback to memoize fetchCart
  // const fetchCart = useCallback(async () => {
  //   try {
  //     const data = await getCart(authTokens, refreshToken);
  //     if (Array.isArray(data)) {
  //       setCartItems(data[0]?.items || []);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch cart items:", error);
  //   }
  // }, [authTokens, refreshToken]);

  // useEffect(() => {
  //   fetchCart();
  // }, [fetchCart]);

  return (
    <div>
      {/* <h1>Welcome, {user && user.username}!</h1>
      <Button
        onClick={logoutUser} 
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Logout
      </Button> */}
      <DashboardNavbar />
      <Box
        sx={{
          minHeight: "100vh", // Fullscreen height
          backgroundColor: "#e0f7fa", // Another background color to differentiate sections
          margin: 0,
          padding: "50px",
          scrollBehavior: "smooth",
          // overflowX: "hidden",
        }}
      >
        <DashboardImagesection />
        {/* <DashboardAddItems /sl> */}
      </Box>
    </div>
  );
}

export default Dashboard;
