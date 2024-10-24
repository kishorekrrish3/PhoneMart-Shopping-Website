import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Product from "./Components/Product/Product";
import Cart from "./Components/Cart/Cart";
import Profile from "./Components/Profile/Profile";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Listening to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // User signed out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Conditionally render Navbar based on route
  const hideNavbarRoutes = ["/sign-in", "/sign-up"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Show loading screen while waiting for auth state to resolve
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar user={user} handleSignOut={handleSignOut} />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Private Routes */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/product/:id"
          element={user ? <Product /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
}

// Wrapping App in Router for proper routing
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
