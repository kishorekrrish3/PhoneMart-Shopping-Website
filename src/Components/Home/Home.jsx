import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import { db } from "../../firebase"; // Import Firestore database
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const Home = () => {
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to fetch product data from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray); // Update the state with product data
      setLoading(false); // Turn off loading state
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loader">Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-section-content">
          <h1 className="hero-title">Phone Mart</h1>
          <p className="hero-subtitle">
            Upgrade Your World,
            <span className="color-text"> One Phone at a Time!</span>
          </p>
        </div>
        <img src="/assets/ecommerce.svg" alt="E-commerce" />
      </section>

      <section className="recommended-section">
        <h1 className="recommended-section-title">
          Grab the best deal on <span className="color-text">Smartphones</span>
        </h1>
        <div className="cards-container">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card
                price={product.price}
                title={product.title}
                image={product.image}
                brand={product.brand}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="brands-section">
        <h1 className="brands-section-title">
          Deals from <span className="color-text">Top Brands</span>
        </h1>
        <div className="banners-container">
          <img
            src="/assets/brand-banner-1.jpg"
            alt="Banner 1"
            className="brand-banner"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
