import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Ensure the correct path

const CartPage = () => {
  const { currentUser } = useAuth(); // Destructure the currentUser

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchCartItems = async () => {
        const cartCollectionRef = collection(
          db,
          "users",
          currentUser.uid,
          "cart"
        );
        const cartSnapshot = await getDocs(cartCollectionRef);
        const items = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      };

      fetchCartItems();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.productName} />
            <p>{item.productName}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
