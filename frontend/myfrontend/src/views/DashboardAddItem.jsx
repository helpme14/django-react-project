import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { addItemToCart } from "../context/CartApi";

const DashboardAddItem = () => {
  const { authTokens, refreshToken, user } = useContext(AuthContext);

  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddItem = async () => {
    if (!itemId || !quantity) {
      console.log("User data:", user);
      console.error("Item ID and quantity are required");
      return;
    }

    try {
      const result = await addItemToCart(
        itemId,
        quantity,
        authTokens,
        refreshToken,
        user
      );
      console.log("Item added to cart:", result);

      // Call the callback to refresh the cart (if provided)
      // if (onCartUpdate) onCartUpdate();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Item ID"
        value={itemId}
        onChange={(e) => setItemId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddItem}>Add to Cart</button>
      {/* <p>{newCartItems}</p> */}
    </div>
  );
};

export default DashboardAddItem;
