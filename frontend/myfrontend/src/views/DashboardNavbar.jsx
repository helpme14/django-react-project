import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AuthContext from "../context/AuthContext";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useEffect, useState } from "react";
import { getCart } from "../context/CartApi";
// import { useCart } from "../context/cartContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user, logoutUser, authTokens, refreshToken, setAuthTokens } =
    useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [cartLenght, setCartLenght] = useState(0);

  // const { cartItems1 } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(authTokens, refreshToken, setAuthTokens);
        if (Array.isArray(data) && data.length > 0) {
          const cartData = data[0];
          setCartItems(cartData.items || []);
          // setCartLenght(cartItems.items.length || 0);
        } else {
          setCartItems([]);
          // setCartLenght(0);
        }
      } catch (error) {
        setError("Failed to fetch cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [authTokens, refreshToken, setAuthTokens]);

  // useEffect(() => {
  //   // console.log("Cart items updated:", cartItems);
  // }, [cartItems]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const handleProfileMenuOpen = (event) => {
    if (event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    if (event.currentTarget) {
      setMobileMoreAnchorEl(event.currentTarget);
    }
  };

  const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={Boolean(anchorEl)}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  //   </Menu>
  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{ display: { xs: "flex", md: "none" } }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleProfileMenuOpen}
        component={Link}
        to="/dashboard/profile"
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <AccountCircle />
          </Badge>
        </IconButton>
        <p>Profile</p>
      </MenuItem>

      <MenuItem component={Link} to="/dashboard/cart">
        <IconButton size="large" aria-label="cart" color="inherit">
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={logoutUser}>
        <IconButton size="large" aria-label="logout" color="inherit">
          <Badge color="error">
            <LogoutIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {user && user.username}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
              component={Link}
              to="/dashboard/cart"
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              component={Link}
              to="/dashboard/profile"
            >
              <AccountCircle />
            </IconButton>

            <Button onClick={logoutUser} variant="">
              Logout
            </Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
}
