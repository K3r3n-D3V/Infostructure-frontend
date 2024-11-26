
import React, { useEffect, useState, useContext } from "react";
import "./CheckOut.css";
import Navbar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import { InfostructureContext } from "../../context/context";


const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

function CheckOut() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    paymentMethod: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState(""); // Set delivery method
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setItems(cartItems);

    // Get delivery method from sessionStorage
    const cartDeliveryMethod = sessionStorage.getItem("DeliveryMethod");
    setDeliveryMethod(cartDeliveryMethod || "Standard shipping"); // Default to Standard if not set
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    let validationErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName)
        validationErrors.firstName = "First name is required.";
      if (!formData.lastName)
        validationErrors.lastName = "Last name is required.";
    } else if (currentStep === 2) {
      if (!formData.address) validationErrors.address = "Address is required.";
      if (!formData.city) validationErrors.city = "City is required.";
      if (!formData.state) validationErrors.state = "State is required.";
      if (!formData.zip) validationErrors.zip = "Zip code is required.";
    } else if (currentStep === 3) {
      if (!formData.paymentMethod)
        validationErrors.paymentMethod = "Please select a payment method.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      // On Step 3, go to Step 4 (Review), not place the order yet
      setCurrentStep(currentStep + 1);
    } else if (validateFields()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    const paymentDetails = preparePaymentDetails();
    try {
      const response = await sendPaymentDetailsToServer(paymentDetails);
      if (response.ok) {
        // setSuccessMessage("Order placed successfully!");
        sessionStorage.removeItem("CartItems");
        sessionStorage.removeItem("DeliveryMethod"); // Clear delivery method after order
        setItems([]);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setErrorMessage("There was an error placing your order.");
    } finally {
      setLoading(false);
    }
  };

  const preparePaymentDetails = () => {
    const PaymentDate = new Date().toLocaleDateString();
    const TotalPrice = items
      .reduce((total, item) => total + parseFloat(item.Price), 0)
      .toFixed(2);

    const TransactionId = Math.floor(Math.random() * 1000000); // Random transaction ID

    const ProductId = items[0]?.ProductId || '';
    const ProductName = items[0]?.ProductName || '';
    const UnitPrice = items[0]?.Price || '0'; // Assuming price is stored as "Price"
    const PaymentAmount = `R${TotalPrice}`;
    const UserId = formData.firstName + formData.lastName + "@gmail.com"; // Example user ID

    const Status = "Complete"; // Static status, could be changed based on payment success/failure

    // Include the delivery method in payment details
    return {
      PaymentDate,
      PaymentMethod: formData.paymentMethod,
      ProductId,
      Quantity: items.length.toString(),
      TotalPrice: `R${TotalPrice}`,
      TransactionId,
      UnitPrice: `R${UnitPrice}`,
      PaymentAmount,
      ProductName,
      UserId,
      Status,
      DeliveryMethod: deliveryMethod, // Add delivery method here
    };
  };

  const sendPaymentDetailsToServer = async (paymentDetails) => {
    return await fetch(`${baseURL}:3000/payment-history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });
  };

  const handleReturnToCart = () => {
    navigate("/cart"); // Navigate back to Cart page
  };


  const handlePlaceOrder = async (event) => {
    event.preventDefault(); // Prevents the form from submitting and reloading the page
  
    if (loading) return; // Avoid multiple clicks
  
    setLoading(true);
    setErrorMessage("");
  
    if (!validateFields()) {
      setLoading(false);
      return;
    }
  
    const paymentDetails = preparePaymentDetails();
  
    try {
      const response = await sendPaymentDetailsToServer(paymentDetails);
      if (response.ok) {
        setSuccessMessage("Your order has been placed successfully!"); // Show success popup
        sessionStorage.removeItem("CartItems");
        sessionStorage.removeItem("DeliveryMethod");
        setItems([]);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setErrorMessage("There was an error placing your order.");
    } finally {
      setLoading(false);
    }
  };
  
     // Toggle Theme
     const toggleTheme = () => {
      setIsLightMode(!isLightMode);
      document.body.classList.toggle("light-theme", isLightMode); // Toggle class for light theme
      document.body.classList.toggle("dark-theme", !isLightMode); // Toggle class for dark theme
    };
    
  return (
    <div className="every" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>
      <Navbar />
      <div className="checkout-container" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>
         <h2 className="checkout-heading" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>Ready to pay?</h2>
      <form className="checkout-form" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}} onSubmit={handleSubmit}>
        {successMessage && <p className="success-message" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>{successMessage}</p>}
        {errorMessage && <p className="error-message" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>{errorMessage}</p>}

        {/* Step 1: User Info */}
        {currentStep === 1 && (
          <div>
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>First Name:</label>
            <input
              className="checkout-input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>Last Name:</label>
            <input
              className="checkout-input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        )}

        {/* Step 2: Address Info */}
        {currentStep === 2 && (
          <div>
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>Address:</label>
            <input
              className="checkout-input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
            
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>City:</label>
            <input
              className="checkout-input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
            
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>State:</label>
            <input
              className="checkout-input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.state && <p className="error-text">{errors.state}</p>}
            
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>Zip Code:</label>
            <input
              className="checkout-input"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
            />
            {errors.zip && <p className="error-text">{errors.zip}</p>}
          </div>
        )}

        {/* Step 3: Payment Method Info */}
        {currentStep === 3 && (
          <div>
            <label className="checkout-label" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>Payment Method:</label>
            <select
              className="checkout-select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
            {errors.paymentMethod && <p className="error-text">{errors.paymentMethod}</p>}
          </div>
        )}

        {/* Step 4: Review Order */}
        {currentStep === 4 && (
          <div className="order" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>
      style={{color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
      <h3 >Order Summary</h3>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.ProductName} - R{item.Price}
                  <button className="remove-item-button" onClick={() => handleRemoveItem(index)}>Remove</button>
                </li>
              ))}
            </ul>
            <p>Total Price: R{items.reduce((total, item) => total + parseFloat(item.Price), 0).toFixed(2)}</p>
            <p>Delivery Method: {deliveryMethod}</p>
          </div>
        )}

<div className="buttons" >
  {currentStep > 1 && (
    <button className="prev-button" type="button" onClick={handlePreviousStep}
    style={{backgroundColor:savedSettings.theme == "Dark" ? "#066c74":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
    >
      Previous
    </button>
  )}
  {currentStep <= 3 ? (
    <button className="next-button" type="button" onClick={handleNextStep}
    style={{backgroundColor:savedSettings.theme == "Dark" ? "#066c74":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
    >
      Next
    </button>
  ) : (
    <button
      className="submit-button"
      type="button" // Prevent default submission
      disabled={loading}
      onClick={handlePlaceOrder} // Trigger the order placement
      style={{backgroundColor:savedSettings.theme == "Dark" ? "#066c74":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  )}

  {/* Popup for Order Success */}
  {successMessage && (
    <div className="popup">
      <div className="popup-content">
        <span className="popup-checkmark">✔</span>
        <p className="popup-message">Order placed successfully!</p>
        <button
          className="popup-close-button"
          onClick={() => setSuccessMessage("")}
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>


        
    
        <div className="return-cart" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>
          <button className="return-cart-button" type="button" onClick={handleReturnToCart} style={{backgroundColor:savedSettings.theme == "Dark" ? "#066c74":"#fff", color:savedSettings.theme == "Dark" ? "#fff":"#000"}}>
            Return to Cart
          </button>
        </div>
      </form>
      </div>
     
    </div>
  );
}

export default CheckOut;
