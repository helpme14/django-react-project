import React from "react";
import Button from "@mui/material/Button";
import AuthContext from "../context/AuthContext"; // Import AuthContext

function Dashboard() {
  const { user, logoutUser } = React.useContext(AuthContext); // Access user and logoutUser from context

  return (
    <div>
      <h1>Welcome, {user && user.username}!</h1> {/* Display the username */}
      <Button
        onClick={logoutUser} // Call logoutUser function on button click
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
