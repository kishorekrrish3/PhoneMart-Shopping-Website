import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase"; // Import Firestore database
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions
import "./Product.css"; // Optional: Add your styles

import { useAuth } from "../../context/AuthContext"; // Assuming you have an Auth Context

const Product = () => {
  const { currentUser } = useAuth(); // Get the current logged-in user

  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State for the product details
  const [loading, setLoading] = useState(true); // State for loading status

  const addToCart = async (userId, product) => {
    try {
      // Log the product object
      console.log("Adding product to cart:", product);

      // Validate that all necessary fields are defined
      if (!product.productName || !product.price) {
        console.error("Product data is incomplete:", product);
        return; // Stop execution if data is invalid
      }

      // Reference to the user's cart document in Firestore
      const cartRef = doc(db, "users", userId, "cart", product.id);

      // Set the product data in the cart
      await setDoc(cartRef, {
        productName: product.productName,
        price: product.price,
        quantity: product.quantity || 1, // Default to 1 if quantity is undefined
        // Add other necessary product fields here
      });

      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // Function to fetch product details from Firestore
  const fetchProductDetails = async () => {
    try {
      const docRef = doc(db, "products", id); // Reference to the specific product document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() }); // Set product data
      } else {
        console.error("No such document!");
      }
      setLoading(false); // Turn off loading state
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div className="loader">Loading...</div>; // Show a loading message while data is being fetched
  }

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div className="product">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-cont-1">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-brand">{product.brand}</p>
      </div>
      <div className="product-cont-2">
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
      </div>

      {/* Add more product details as needed */}
    </div>
  );
};

export default Product;
