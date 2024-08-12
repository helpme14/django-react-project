import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext"; // Adjust the import path as needed
import { getCart } from "../context/CartApi"; // Adjust the import path as needed

const CartUser = () => {
  const { authTokens, refreshToken, setAuthTokens } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(authTokens, refreshToken, setAuthTokens);
        // console.log("Fetched cart data:", data); // Log fetched data

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
      <h1>My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              Product: {item.product_name} - Quantity: {item.quantity} - Price:{" "}
              {item.price}
              <br />
              Total : {item.quantity * item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartUser;
