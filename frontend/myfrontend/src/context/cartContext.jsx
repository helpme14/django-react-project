// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems1, setCartItems] = useState([]);

//   // Function to add item to cart
//   const addItem = (item) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         // Update the quantity if item exists
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//       } else {
//         // Add new item
//         return [...prevItems, item];
//       }
//     });
//   };

//   // Function to remove item from cart
//   const removeItem = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//   };

//   return (
//     <CartContext.Provider value={{ cartItems1, addItem, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
// };
