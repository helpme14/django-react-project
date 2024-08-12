import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Make sure the import is correct

const API_URL = "http://localhost:8000/cart/";

const getAuthHeaders = async (authTokens, refreshToken) => {
  if (!authTokens || !authTokens.access || !refreshToken) {
    console.error("Missing authTokens or refreshToken");
    return {};
  }

  const isExpired = (token) => {
    try {
      const expiry = jwtDecode(token).exp * 1000;
      return Date.now() >= expiry;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Treat as expired if decoding fails
    }
  };

  if (isExpired(authTokens.access)) {
    try {
      const newAccessToken = await refreshToken();
      return { Authorization: `Bearer ${newAccessToken}` };
    } catch (error) {
      console.error("Error refreshing token:", error);
      return {};
    }
  }
  return { Authorization: `Bearer ${authTokens.access}` };
};

export const getCart = async (authTokens, refreshToken) => {
  try {
    const headers = await getAuthHeaders(authTokens, refreshToken);
    const response = await axios.get(API_URL, { headers });
    console.log("Cart response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addItemToCart = async (
  itemId,
  quantity,
  authTokens,
  refreshToken,
  user
) => {
  if (!user || !authTokens) {
    console.error("User is not authenticated");
    return;
  }

  try {
    // Ensure authentication headers are obtained
    const headers = await getAuthHeaders(authTokens, refreshToken);

    // Construct payload with product ID and quantity
    const payload = { product_id: itemId, quantity: quantity };

    // Post request to add item to cart
    const response = await axios.post(`${API_URL}add-item/`, payload, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log("Item added to cart:", response.data);
      return response.data;
    } else {
      console.error("Failed to add item to cart:", response.data);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};
// export const addItemToCart = async (
//   itemId,
//   quantity,
//   authTokens,
//   refreshToken,
//   user
// ) => {
//   if (!user || !authTokens) {
//     console.error("User is not authenticated");
//     return;
//   }

//   try {
//     const headers = await getAuthHeaders(authTokens, refreshToken);
//     const payload = { product_id: itemId, quantity: quantity };

//     const response = await axios.post(`${API_URL}add-item/`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//     });

//     if (response.status === 201 || response.status === 200) {
//       console.log("Item added to cart:", response.data);
//       return response.data.cart; // Ensure your API returns the updated cart
//     } else {
//       console.error("Failed to add item to cart:", response.data);
//     }
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     throw error;
//   }
// };
