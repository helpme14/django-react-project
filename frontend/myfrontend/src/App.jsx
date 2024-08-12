import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./index.css";
import NotFound from "./views/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./views/Navbar";
import Homepage from "./views/Homepage";
import Dashboard from "./views/Dashboard";
import Loginpage from "./views/Loginpage";
import Registerpage from "./views/Registerpage";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import DashboardItems from "./views/CartUser";

// import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <CartProvider> */}
        <AppContent />
        {/* </CartProvider> */}
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  // const noNavbarRoutes = ["/login", "/register", "/dashboard"];
  const showNavbar = location.pathname === "/";
  const { user } = useContext(AuthContext);

  // Redirect logged-in users trying to access the login page
  if (user && location.pathname === "/login") {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/cart"
          element={
            <PrivateRoute>
              <DashboardItems />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
    </>
  );
}

export default App;
