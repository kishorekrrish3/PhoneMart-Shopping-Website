import React from "react";
import "./CartCard.css";

const CartCard = ({ image, title, brand, price, quantity }) => {
  return (
    <div className="cart-card">
      <div className="cart-card-content">
        <div className="cart-card-image-container">
          <img src={image} alt="Product Image" className="cart-card-image" />
        </div>
        <div className="cart-card-title-brand-qty">
          <h1 className="cart-card-title">{title}</h1>
          <p className="cart-card-brand">{brand}</p>

          <div className="cart-card-qty-count">
            <span className="minus-cont">-</span>
            <p className="cart-card-qty">{quantity}</p>
            <span className="plus-cont">+</span>
          </div>
        </div>
      </div>
      <div className="cart-card-qty-container">
        <img src="/assets/bin.svg" alt="Delete" className="cart-card-delete" />
        <h1 className="cart-card-price">{price}</h1>
      </div>
    </div>
  );
};

export default CartCard;
