import DashboardNavbar from "./DashboardNavbar";
import Box from "@mui/material/Box";
import DashboardImagesection from "./DashboardImagesection";

function Dashboard() {
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
      </Box>
    </div>
  );
}

export default Dashboard;
