import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import "./Cart.css";
import { InfostructureContext } from "../../context/context";

// import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [items, setItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(10); // Default shipping cost
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)

   // Toggle Theme
   const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-theme", isLightMode); // Toggle class for light theme
    document.body.classList.toggle("dark-theme", !isLightMode); // Toggle class for dark theme
  };

  useEffect(() => {
    // Get items stored locally
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setItems(cartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    // Update the sessionStorage with the new cart items
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...items];
    const currentQuantity = Number(updatedItems[index].quantity) || 1;

    if (currentQuantity > 1) {
      updatedItems[index].quantity = currentQuantity - 1;
      setItems(updatedItems);
      sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...items];
    const currentQuantity = Number(updatedItems[index].quantity) || 1;

    updatedItems[index].quantity = currentQuantity + 1;
    setItems(updatedItems);
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  // Calculate total sum
  let totalSum = items.reduce((curr, item) => {
    // Remove non-numeric characters and parse price to a number
    let itemPrice = parseFloat(item.Price.replace(/[^0-9.-]+/g, "")) || 0;
    return curr + itemPrice * (Number(item.quantity) || 1);
  }, 0);

  // Update shipping cost based on selected option
  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;

    // Set shipping cost based on the selected option
    if (selectedOption === "Standard Delivery") {
      setShippingCost(10);
    } else if (selectedOption === "Express Delivery") {
      setShippingCost(25);
    } else if (selectedOption === "Free Delivery") {
      setShippingCost(0);
    }
  };

  // Total amount with shipping included
  const totalAmountWithShipping = totalSum + shippingCost;

  return (
    <div className="Cart-box" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
      <Navbar />
      <div className="cart" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
        <div className="cart-info" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
          <div className="cart-info-headings" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#066c74":"#066c74"}}>Shopping Cart</h1>
            <h1 className={"cart-info-h1"} style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
              Items:{" "}
              {items.reduce(
                (sum, item) => sum + (Number(item.quantity) || 1),
                0
              )}
            </h1>
            <hr />
          </div>
          <div className="cart-products" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <div className="cart-heading" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000", borderColor:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
              <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Product Name</p>
              <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Product Brand</p>
              <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Quantity</p>
              <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Price</p>
            </div>

            {items.map((product, index) => (
              <div key={index} className="cart-item" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000", borderColor:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>{product.ProductName}</p>
                <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>{product.ProductBrand}</p>
                <div className="counter" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                  <button className="decrease" onClick={() => handleDecreaseQuantity(index)} style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000":"#fff"}}>
                    -
                  </button>
                  <h6>{Number(product.quantity) || 1}</h6>
                  <button className="increase" onClick={() => handleIncreaseQuantity(index)} style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000":"#fff"}}>
                    +
                  </button>
                </div>
                <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>R{product.Price}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(index)}
                  style={{backgroundColor:savedSettings?.theme == "Dark" ? "red":"red", color:savedSettings?.theme == "Dark" ? "#fff":"#fff"}}>
                  x
                </button>
              </div>
            ))}
            <div className="return" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
              <Link to="/productscreen">
                <button>Back to Product Screen</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="cart-info2" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
          <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#066c74":"#066c74"}}>Order Summary</h1>
          <div className="cart-info2-item" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
              Total Items:{" "}
              {items.reduce(
                (sum, item) => sum + (Number(item.quantity) || 1),
                0
              )}
            </p>
            <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#066c74":"#066c74"}}>R{totalSum.toFixed(2)}</p>
          </div>
          <div className="shipping-info" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <h4 tyle={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#066c74"}}>SHIPPING</h4>
            <form>
              <select name="deliveryMethod" onChange={handleShippingChange} style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                <option value="Standard Delivery" tyle={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                  Standard Delivery - R10
                </option>
                <option value="Express Delivery" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Express Delivery - R25</option>
                <option value="Free Delivery" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Free Delivery - R0</option>
              </select>
            </form>
          </div>
          <hr />
          <div className="cart-info2-item" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Total Amount (with shipping): </p>
            <p style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#066c74":"#066c74"}}>R{totalAmountWithShipping.toFixed(2)}</p>
          </div>
          <div className="checkout-btn" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            <Link to="/checkout">
              <button style={{backgroundColor:savedSettings?.theme == "Dark" ? "#066c74":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
