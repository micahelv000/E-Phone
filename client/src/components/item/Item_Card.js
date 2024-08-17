import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button as BootstrapButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleViewDetails = () => {
    navigate(`/item?slug=${item.slug}&price=${item.price}&stock=${item.stock}`);
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }

    addToCart({
      slug: item.slug,
      ...item,
      quantity: 1,
      price: item.price,
      stock: item.stock,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  return (
    <Card className="card-container">
      <Card.Img variant="top" src={item.image} className="card-img" />
      <Card.Body>
        <Card.Title className="card-title">{item.phone_name}</Card.Title>
        <Card.Text className="card-text">
          {item.stock > 0 ? (
            <span className="price">Price: ${item.price}</span>
          ) : (
            "Out of stock"
          )}
        </Card.Text>
        <div className="card-actions">
          <BootstrapButton
            variant="primary"
            onClick={handleViewDetails}
            className="view-details-button"
          >
            View Details
          </BootstrapButton>
          {item.stock > 0 && (
            <button onClick={handleAddToCart} className="add-to-cart-button">
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          )}
        </div>
        {showNotification && (
          <div className="notification">Item added to cart!</div>
        )}
      </Card.Body>
    </Card>
  );
}
