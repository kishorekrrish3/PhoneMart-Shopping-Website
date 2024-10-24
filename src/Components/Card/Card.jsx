import React from "react";
import "./Card.css";

const Card = ({ title, price, image, brand }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
      </div>
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <p className="card-brand">{brand}</p>
        <p className="card-price">{price}</p>
      </div>
    </div>
  );
};

export default Card;
