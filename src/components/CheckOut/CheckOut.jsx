// // // // import React, { useEffect, useState } from "react";
// // // // import "./CheckOut.css";
// // // // import Navbar from "../NavBar/Navbar";
// // // // import { Link } from "react-router-dom";
// // // // import { useNavigate } from "react-router-dom";

// // // // const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

// // // // function CheckOut() {
// // // //   const [items, setItems] = useState([]);
// // // //   const [formData, setFormData] = useState({
// // // //     firstName: "",
// // // //     lastName: "",
// // // //     paymentMethod: "",
// // // //     address: "",
// // // //     city: "",
// // // //     state: "",
// // // //     zip: "",
// // // //   });
// // // //   const [currentStep, setCurrentStep] = useState(1);
// // // //   const [errors, setErrors] = useState({});
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [successMessage, setSuccessMessage] = useState("");
// // // //   const [errorMessage, setErrorMessage] = useState("");

// // // //   useEffect(() => {
// // // //     const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
// // // //     setItems(cartItems);
// // // //   }, []);

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData({ ...formData, [name]: value });
// // // //     setErrors({ ...errors, [name]: "" });
// // // //   };

// // // //   const validateFields = () => {
// // // //     let validationErrors = {};
// // // //     if (currentStep === 1) {
// // // //       if (!formData.firstName)
// // // //         validationErrors.firstName = "First name is required.";
// // // //       if (!formData.lastName)
// // // //         validationErrors.lastName = "Last name is required.";
// // // //     } else if (currentStep === 2) {
// // // //       if (!formData.address) validationErrors.address = "Address is required.";
// // // //       if (!formData.city) validationErrors.city = "City is required.";
// // // //       if (!formData.state) validationErrors.state = "State is required.";
// // // //       if (!formData.zip) validationErrors.zip = "Zip code is required.";
// // // //     } else if (currentStep === 3 && !formData.paymentMethod) {
// // // //       validationErrors.paymentMethod = "Please select a payment method.";
// // // //     }
// // // //     setErrors(validationErrors);
// // // //     return Object.keys(validationErrors).length === 0;
// // // //   };

// // // //   const handleNextStep = () => {
// // // //     if (validateFields()) {
// // // //       setCurrentStep(currentStep + 1);
// // // //     }
// // // //   };

// // // //   const handlePreviousStep = () => {
// // // //     setCurrentStep(currentStep - 1);
// // // //   };

// // // //   const handleRemoveItem = (index) => {
// // // //     const updatedItems = items.filter((_, i) => i !== index);
// // // //     setItems(updatedItems);
// // // //     sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!validateFields()) return;

// // // //     setLoading(true);
// // // //     const paymentDetails = preparePaymentDetails();
// // // //     try {
// // // //       const response = await sendPaymentDetailsToServer(paymentDetails);
// // // //       if (response.ok) {
// // // //         setSuccessMessage("Order placed successfully!");
// // // //         sessionStorage.removeItem("CartItems");
// // // //         setItems([]);
// // // //       } else {
// // // //         throw new Error("Failed to place order");
// // // //       }
// // // //     } catch (error) {
// // // //       setErrorMessage("There was an error placing your order.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const preparePaymentDetails = () => {
// // // //     const PaymentDate = new Date().toLocaleDateString();
// // // //     const TotalPrice = items
// // // //       .reduce((total, item) => total + parseFloat(item.Price), 0)
// // // //       .toFixed(2);

// // // //     return {
// // // //       PaymentDate,
// // // //       PaymentMethod: formData.paymentMethod,
// // // //       TotalPrice: `R${TotalPrice}`,
// // // //     };
// // // //   };

// // // //   const sendPaymentDetailsToServer = async (paymentDetails) => {
// // // //     return await fetch(`${baseURL}:3000/payment-history`, {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //       },
// // // //       body: JSON.stringify(paymentDetails),
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div className="every">
// // // //       <Navbar />
// // // //       <h2 className="checkout-heading">Ready to pay?</h2>
// // // //       <form className="content" onSubmit={handleSubmit}>
// // // //         {successMessage && <p className="success">{successMessage}</p>}
// // // //         {errorMessage && <p className="error">{errorMessage}</p>}

// // // //         {currentStep === 1 && (
// // // //           <div className="personal-info">
// // // //             <h3>1. Personal Information</h3>
// // // //             <input
// // // //               type="text"
// // // //               name="firstName"
// // // //               placeholder="First Name"
// // // //               value={formData.firstName}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.firstName && <p className="error">{errors.firstName}</p>}
// // // //             <input
// // // //               type="text"
// // // //               name="lastName"
// // // //               placeholder="Last Name"
// // // //               value={formData.lastName}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.lastName && <p className="error">{errors.lastName}</p>}
// // // //             <button type="button" onClick={handleNextStep}>
// // // //               Next
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {currentStep === 2 && (
// // // //           <div className="personal-info">
// // // //             <h3>2. Shipping Information</h3>
// // // //             <input
// // // //               type="text"
// // // //               name="address"
// // // //               placeholder="Address"
// // // //               value={formData.address}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.address && <p className="error">{errors.address}</p>}
// // // //             <input
// // // //               type="text"
// // // //               name="city"
// // // //               placeholder="City"
// // // //               value={formData.city}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.city && <p className="error">{errors.city}</p>}
// // // //             <input
// // // //               type="text"
// // // //               name="state"
// // // //               placeholder="State"
// // // //               value={formData.state}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.state && <p className="error">{errors.state}</p>}
// // // //             <input
// // // //               type="text"
// // // //               name="zip"
// // // //               placeholder="Zip Code"
// // // //               value={formData.zip}
// // // //               onChange={handleInputChange}
// // // //               required
// // // //             />
// // // //             {errors.zip && <p className="error">{errors.zip}</p>}
// // // //             <button type="button" onClick={handlePreviousStep}>
// // // //               Previous
// // // //             </button>
// // // //             <button type="button" onClick={handleNextStep}>
// // // //               Next
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {currentStep === 3 && (
// // // //           <div className="personal-info">
// // // //             <h3>3. Payment Method</h3>
// // // //             {["PayPal", "Credit Card", "Bank Transfer"].map((method) => (
// // // //               <label key={method} className="checkbox-label">
// // // //                 <input
// // // //                   type="radio"
// // // //                   name="paymentMethod"
// // // //                   checked={formData.paymentMethod === method}
// // // //                   onChange={() => {
// // // //                     setFormData({ ...formData, paymentMethod: method });
// // // //                     setErrors({ ...errors, paymentMethod: "" });
// // // //                   }}
// // // //                   required
// // // //                 />
// // // //                 {method}
// // // //               </label>
// // // //             ))}
// // // //             {errors.paymentMethod && (
// // // //               <p className="error">{errors.paymentMethod}</p>
// // // //             )}
// // // //             <button type="button" onClick={handlePreviousStep}>
// // // //               Previous
// // // //             </button>
// // // //             <button type="button" onClick={handleNextStep}>
// // // //               Next
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         {currentStep === 4 && (
// // // //           <div className="personal-info">
// // // //             <h3>4. Review Order</h3>
// // // //             <p>
// // // //               <strong>Name:</strong> {formData.firstName} {formData.lastName}
// // // //             </p>
// // // //             <p>
// // // //               <strong>Address:</strong> {formData.address}, {formData.city},{" "}
// // // //               {formData.state} {formData.zip}
// // // //             </p>
// // // //             <p>
// // // //               <strong>Payment Method:</strong> {formData.paymentMethod}
// // // //             </p>
// // // //             <h4>Items in Cart:</h4>
// // // //             <ul>
// // // //               {items.map((item, index) => (
// // // //                 <li key={index}>
// // // //                   {item.ProductName} - R{item.Price}
// // // //                   <button type="button" onClick={() => handleRemoveItem(index)}>
// // // //                     Remove
// // // //                   </button>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //             <h4>
// // // //               Total Price: R
// // // //               {items
// // // //                 .reduce(
// // // //                   (total, item) => total + (parseFloat(item.Price) || 0),
// // // //                   0
// // // //                 )
// // // //                 .toFixed(2)}
// // // //             </h4>
// // // //             <button type="button" onClick={handlePreviousStep}>
// // // //               Previous
// // // //             </button>
// // // //             <button type="submit" className="submit-btn" disabled={loading}>
// // // //               {loading ? "Placing Order..." : "Place Order"}
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </form>
// // // //       <div className="return-cart">
// // // //         <Link to="/cart">
// // // //           <button>Return to cart</button>
// // // //         </Link>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default CheckOut;
// // // import React, { useEffect, useState } from "react";
// // // import "./CheckOut.css";
// // // import Navbar from "../NavBar/Navbar";
// // // import { Link } from "react-router-dom";
// // // import { useNavigate } from "react-router-dom";

// // // const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

// // // function CheckOut() {
// // //   const [items, setItems] = useState([]);
// // //   const [formData, setFormData] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     paymentMethod: "",
// // //     address: "",
// // //     city: "",
// // //     state: "",
// // //     zip: "",
// // //   });
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [errors, setErrors] = useState({});
// // //   const [loading, setLoading] = useState(false);
// // //   const [successMessage, setSuccessMessage] = useState("");
// // //   const [errorMessage, setErrorMessage] = useState("");

// // //   useEffect(() => {
// // //     const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
// // //     setItems(cartItems);
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //     setErrors({ ...errors, [name]: "" });
// // //   };

// // //   const validateFields = () => {
// // //     let validationErrors = {};
// // //     if (currentStep === 1) {
// // //       if (!formData.firstName)
// // //         validationErrors.firstName = "First name is required.";
// // //       if (!formData.lastName)
// // //         validationErrors.lastName = "Last name is required.";
// // //     } else if (currentStep === 2) {
// // //       if (!formData.address) validationErrors.address = "Address is required.";
// // //       if (!formData.city) validationErrors.city = "City is required.";
// // //       if (!formData.state) validationErrors.state = "State is required.";
// // //       if (!formData.zip) validationErrors.zip = "Zip code is required.";
// // //     } else if (currentStep === 3 && !formData.paymentMethod) {
// // //       validationErrors.paymentMethod = "Please select a payment method.";
// // //     }
// // //     setErrors(validationErrors);
// // //     return Object.keys(validationErrors).length === 0;
// // //   };

// // //   const handleNextStep = () => {
// // //     if (validateFields()) {
// // //       setCurrentStep(currentStep + 1);
// // //     }
// // //   };

// // //   const handlePreviousStep = () => {
// // //     setCurrentStep(currentStep - 1);
// // //   };

// // //   const handleRemoveItem = (index) => {
// // //     const updatedItems = items.filter((_, i) => i !== index);
// // //     setItems(updatedItems);
// // //     sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateFields()) return;

// // //     setLoading(true);
// // //     const paymentDetails = preparePaymentDetails();
// // //     try {
// // //       const response = await sendPaymentDetailsToServer(paymentDetails);
// // //       if (response.ok) {
// // //         setSuccessMessage("Order placed successfully!");
// // //         sessionStorage.removeItem("CartItems");
// // //         setItems([]);
// // //       } else {
// // //         throw new Error("Failed to place order");
// // //       }
// // //     } catch (error) {
// // //       setErrorMessage("There was an error placing your order.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const preparePaymentDetails = () => {
// // //     const PaymentDate = new Date().toLocaleDateString();
// // //     const TotalPrice = items
// // //       .reduce((total, item) => total + parseFloat(item.Price), 0)
// // //       .toFixed(2);

// // //     const TransactionId = Math.floor(Math.random() * 1000000); // Random transaction ID

// // //     const ProductId = items[0]?.ProductId || '';
// // //     const ProductName = items[0]?.ProductName || '';
// // //     const UnitPrice = items[0]?.Price || '0'; // Assuming price is stored as "Price"
// // //     const PaymentAmount = `R${TotalPrice}`;
// // //     const UserId = formData.firstName + formData.lastName + "@gmail.com"; // Example user ID

// // //     const Status = "Complete"; // Static status, could be changed based on payment success/failure

// // //     return {
// // //       PaymentDate,
// // //       PaymentMethod: formData.paymentMethod,
// // //       ProductId,
// // //       Quantity: items.length.toString(),
// // //       TotalPrice: `R${TotalPrice}`,
// // //       TransactionId,
// // //       UnitPrice: `R${UnitPrice}`,
// // //       PaymentAmount,
// // //       ProductName,
// // //       UserId,
// // //       Status,
// // //     };
// // //   };

// // //   const sendPaymentDetailsToServer = async (paymentDetails) => {
// // //     return await fetch(`${baseURL}:3000/payment-history`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify(paymentDetails),
// // //     });
// // //   };

// // //   return (
// // //     <div className="every">
// // //       <Navbar />
// // //       <h2 className="checkout-heading">Ready to pay?</h2>
// // //       <form className="content" onSubmit={handleSubmit}>
// // //         {successMessage && <p className="success">{successMessage}</p>}
// // //         {errorMessage && <p className="error">{errorMessage}</p>}

// // //         {/* Step 1: User Info */}
// // //         {currentStep === 1 && (
// // //           <div>
// // //             <label className="first-name">First Name:</label>
// // //             <input
// // //               className="first-name-input"
// // //               type="text"
// // //               name="firstName"
// // //               value={formData.firstName}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            
// // //             <label className="last-name">Last Name:</label>
// // //             <input
// // //               className="last-name-input"
// // //               type="text"
// // //               name="lastName"
// // //               value={formData.lastName}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.lastName && <p className="error-message">{errors.lastName}</p>}
// // //           </div>
// // //         )}

// // //         {/* Step 2: Address Info */}
// // //         {currentStep === 2 && (
// // //           <div>
// // //             <label className="address">Address:</label>
// // //             <input
// // //               className="address-input"
// // //               type="text"
// // //               name="address"
// // //               value={formData.address}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.address && <p className="error-message">{errors.address}</p>}
            
// // //             <label className="city">City:</label>
// // //             <input
// // //               className="city-input"
// // //               type="text"
// // //               name="city"
// // //               value={formData.city}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.city && <p className="error-message">{errors.city}</p>}
            
// // //             <label className="state">State:</label>
// // //             <input
// // //               className="state-input"
// // //               type="text"
// // //               name="state"
// // //               value={formData.state}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.state && <p className="error-message">{errors.state}</p>}
            
// // //             <label className="zip">Zip Code:</label>
// // //             <input
// // //               className="zip-input"
// // //               type="text"
// // //               name="zip"
// // //               value={formData.zip}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.zip && <p className="error-message">{errors.zip}</p>}
// // //           </div>
// // //         )}

// // //         {/* Step 3: Payment Info */}
// // //         {currentStep === 3 && (
// // //           <div>
// // //             <label className="payment-method">Payment Method:</label>
// // //             <select
// // //               className="payment-method-select"
// // //               name="paymentMethod"
// // //               value={formData.paymentMethod}
// // //               onChange={handleInputChange}
// // //             >
// // //               <option value="">Select a Payment Method</option>
// // //               <option value="Credit Card">Credit Card</option>
// // //               <option value="Debit Card">Debit Card</option>
// // //               <option value="PayPal">PayPal</option>
// // //             </select>
// // //             {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
// // //           </div>
// // //         )}

// // //         {/* Step 4: Order Review */}
// // //         {currentStep === 4 && (
// // //           <div>
// // //             <h3 className="review-heading">Order Review</h3>
// // //             <div className="order-summary">
// // //               {items.map((item, index) => (
// // //                 <div key={index} className="order-item">
// // //                   <p>{item.ProductName} - R{item.Price}</p>
// // //                   <button
// // //                     type="button"
// // //                     className="remove-item-button"
// // //                     onClick={() => handleRemoveItem(index)}
// // //                   >
// // //                     Remove
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //               <div className="total-price">
// // //                 <p>Total: R{items.reduce((total, item) => total + parseFloat(item.Price), 0).toFixed(2)}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Navigation Buttons */}
// // //         <div className="buttons">
// // //           {currentStep > 1 && (
// // //             <button type="button" className="previous-button" onClick={handlePreviousStep}>
// // //               Back
// // //             </button>
// // //           )}
// // //           {currentStep < 4 ? (
// // //             <button type="button" className="next-button" onClick={handleNextStep}>
// // //               Next
// // //             </button>
// // //           ) : (
// // //             <button type="submit" className="submit-button" disabled={loading}>
// // //               {loading ? "Processing..." : "Place Order"}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </form>
      
// // //       <div className="return-cart">
// // //         <Link to="/cart">
// // //           <button className="return-cart-button">Return to cart</button>
// // //         </Link>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default CheckOut;

// // // import React, { useEffect, useState } from "react";
// // // import "./CheckOut.css";
// // // import Navbar from "../NavBar/Navbar";
// // // import { Link } from "react-router-dom";
// // // import { useNavigate } from "react-router-dom";

// // // const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

// // // function CheckOut() {
// // //   const [items, setItems] = useState([]);
// // //   const [formData, setFormData] = useState({
// // //     firstName: "",
// // //     lastName: "",
// // //     paymentMethod: "",
// // //     address: "",
// // //     city: "",
// // //     state: "",
// // //     zip: "",
// // //   });
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [errors, setErrors] = useState({});
// // //   const [loading, setLoading] = useState(false);
// // //   const [successMessage, setSuccessMessage] = useState("");
// // //   const [errorMessage, setErrorMessage] = useState("");
// // //   const [deliveryMethod, setDeliveryMethod] = useState(""); // Set delivery method

// // //   useEffect(() => {
// // //     const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
// // //     setItems(cartItems);

// // //     // Get delivery method from session or default to "Standard shipping"
// // //     const cartDeliveryMethod = sessionStorage.getItem("DeliveryMethod")
// // //     setDeliveryMethod(cartDeliveryMethod);
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData({ ...formData, [name]: value });
// // //     setErrors({ ...errors, [name]: "" });
// // //   };

// // //   const validateFields = () => {
// // //     let validationErrors = {};
// // //     if (currentStep === 1) {
// // //       if (!formData.firstName)
// // //         validationErrors.firstName = "First name is required.";
// // //       if (!formData.lastName)
// // //         validationErrors.lastName = "Last name is required.";
// // //     } else if (currentStep === 2) {
// // //       if (!formData.address) validationErrors.address = "Address is required.";
// // //       if (!formData.city) validationErrors.city = "City is required.";
// // //       if (!formData.state) validationErrors.state = "State is required.";
// // //       if (!formData.zip) validationErrors.zip = "Zip code is required.";
// // //     } else if (currentStep === 3) {
// // //       if (!formData.paymentMethod)
// // //         validationErrors.paymentMethod = "Please select a payment method.";
// // //     }
// // //     setErrors(validationErrors);
// // //     return Object.keys(validationErrors).length === 0;
// // //   };

// // //   const handleNextStep = () => {
// // //     if (validateFields()) {
// // //       setCurrentStep(currentStep + 1);
// // //     }
// // //   };

// // //   const handlePreviousStep = () => {
// // //     setCurrentStep(currentStep - 1);
// // //   };

// // //   const handleRemoveItem = (index) => {
// // //     const updatedItems = items.filter((_, i) => i !== index);
// // //     setItems(updatedItems);
// // //     sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateFields()) return;

// // //     setLoading(true);
// // //     const paymentDetails = preparePaymentDetails();
// // //     try {
// // //       const response = await sendPaymentDetailsToServer(paymentDetails);
// // //       if (response.ok) {
// // //         setSuccessMessage("Order placed successfully!");
// // //         sessionStorage.removeItem("CartItems");
// // //         sessionStorage.removeItem("DeliveryMethod"); // Clear delivery method after order
// // //         setItems([]);
// // //       } else {
// // //         throw new Error("Failed to place order");
// // //       }
// // //     } catch (error) {
// // //       setErrorMessage("There was an error placing your order.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const preparePaymentDetails = () => {
// // //     const PaymentDate = new Date().toLocaleDateString();
// // //     const TotalPrice = items
// // //       .reduce((total, item) => total + parseFloat(item.Price), 0)
// // //       .toFixed(2);

// // //     const TransactionId = Math.floor(Math.random() * 1000000); // Random transaction ID

// // //     const ProductId = items[0]?.ProductId || '';
// // //     const ProductName = items[0]?.ProductName || '';
// // //     const UnitPrice = items[0]?.Price || '0'; // Assuming price is stored as "Price"
// // //     const PaymentAmount = `R${TotalPrice}`;
// // //     const UserId = formData.firstName + formData.lastName + "@gmail.com"; // Example user ID

// // //     const Status = "Complete"; // Static status, could be changed based on payment success/failure

// // //     return {
// // //       PaymentDate,
// // //       PaymentMethod: formData.paymentMethod,
// // //       ProductId,
// // //       Quantity: items.length.toString(),
// // //       TotalPrice: `R${TotalPrice}`,
// // //       TransactionId,
// // //       UnitPrice: `R${UnitPrice}`,
// // //       PaymentAmount,
// // //       ProductName,
// // //       UserId,
// // //       Status,
// // //     };
// // //   };

// // //   const sendPaymentDetailsToServer = async (paymentDetails) => {
// // //     return await fetch(`${baseURL}:3000/payment-history`, {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //       },
// // //       body: JSON.stringify(paymentDetails),
// // //     });
// // //   };

// // //   return (
// // //     <div className="every">
// // //       <Navbar />
// // //       <h2 className="checkout-heading">Ready to pay?</h2>
// // //       <form className="content" onSubmit={handleSubmit}>
// // //         {successMessage && <p className="success">{successMessage}</p>}
// // //         {errorMessage && <p className="error">{errorMessage}</p>}

// // //         {/* Step 1: User Info */}
// // //         {currentStep === 1 && (
// // //           <div>
// // //             <label className="first-name">First Name:</label>
// // //             <input
// // //               className="first-name-input"
// // //               type="text"
// // //               name="firstName"
// // //               value={formData.firstName}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            
// // //             <label className="last-name">Last Name:</label>
// // //             <input
// // //               className="last-name-input"
// // //               type="text"
// // //               name="lastName"
// // //               value={formData.lastName}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.lastName && <p className="error-message">{errors.lastName}</p>}
// // //           </div>
// // //         )}

// // //         {/* Step 2: Address Info */}
// // //         {currentStep === 2 && (
// // //           <div>
// // //             <label className="address">Address:</label>
// // //             <input
// // //               className="address-input"
// // //               type="text"
// // //               name="address"
// // //               value={formData.address}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.address && <p className="error-message">{errors.address}</p>}
            
// // //             <label className="city">City:</label>
// // //             <input
// // //               className="city-input"
// // //               type="text"
// // //               name="city"
// // //               value={formData.city}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.city && <p className="error-message">{errors.city}</p>}
            
// // //             <label className="state">State:</label>
// // //             <input
// // //               className="state-input"
// // //               type="text"
// // //               name="state"
// // //               value={formData.state}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.state && <p className="error-message">{errors.state}</p>}
            
// // //             <label className="zip">Zip Code:</label>
// // //             <input
// // //               className="zip-input"
// // //               type="text"
// // //               name="zip"
// // //               value={formData.zip}
// // //               onChange={handleInputChange}
// // //             />
// // //             {errors.zip && <p className="error-message">{errors.zip}</p>}
// // //           </div>
// // //         )}

// // //         {/* Step 3: Payment Method Info */}
// // //         {currentStep === 3 && (
// // //           <div>
// // //             <label className="payment-method">Payment Method:</label>
// // //             <select
// // //               className="payment-method-select"
// // //               name="paymentMethod"
// // //               value={formData.paymentMethod}
// // //               onChange={handleInputChange}
// // //             >
// // //               <option value="">Select a Payment Method</option>
// // //               <option value="Credit Card">Credit Card</option>
// // //               <option value="Debit Card">Debit Card</option>
// // //               <option value="PayPal">PayPal</option>
// // //             </select>
// // //             {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}

// // //             {/* Display Delivery Method from cart */}
// // //             <label className="delivery-method">Delivery Method:</label>
// // //             <input
// // //               className="delivery-method-input"
// // //               type="text"
// // //               name="deliveryMethod"
// // //               value={deliveryMethod}
// // //               readOnly
// // //             />
// // //           </div>
// // //         )}

// // //         {/* Step 4: Order Review */}
// // //         {currentStep === 4 && (
// // //           <div>
// // //             <h3 className="review-heading">Review Your Order</h3>
// // //             <div className="review-items">
// // //               {items.map((item, index) => (
// // //                 <div key={index} className="review-item">
// // //                   <span className="product-name">{item.ProductName}</span>
// // //                   <span className="product-price">{`R${item.Price}`}</span>
// // //                   <button
// // //                     className="remove-item-button"
// // //                     onClick={() => handleRemoveItem(index)}
// // //                   >
// // //                     Remove
// // //                   </button>
// // //                 </div>
// // //               ))}
// // //               <div className="total-price">
// // //                 <span>Total:</span>
// // //                 <span>{`R${items.reduce((total, item) => total + parseFloat(item.Price), 0).toFixed(2)}`}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Navigation Buttons */}
// // //         <div className="checkout-buttons">
// // //           {currentStep > 1 && (
// // //             <button type="button" className="previous-button" onClick={handlePreviousStep}>
// // //               Back
// // //             </button>
// // //           )}
// // //           {currentStep < 4 ? (
// // //             <button type="button" className="next-button" onClick={handleNextStep}>
// // //               Next
// // //             </button>
// // //           ) : (
// // //             <button type="submit" className="submit-button" disabled={loading}>
// // //               {loading ? "Processing..." : "Place Order"}
// // //             </button>
// // //           )}
// // //         </div>
// // //       </form>

// // //       <div className="return-cart">
// // //         <Link to="/cart">
// // //           <button className="return-cart-button">Return to cart</button>
// // //         </Link>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default CheckOut;

// // import React, { useEffect, useState } from "react";
// // import "./CheckOut.css";
// // import Navbar from "../NavBar/Navbar";
// // import { Link, useNavigate } from "react-router-dom";

// // const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

// // function CheckOut() {
// //   const [items, setItems] = useState([]);
// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     paymentMethod: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     zip: "",
// //   });
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState("");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [deliveryMethod, setDeliveryMethod] = useState(""); // Set delivery method

// //   const navigate = useNavigate(); // For navigation

// //   useEffect(() => {
// //     const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
// //     setItems(cartItems);

// //     // Get delivery method from sessionStorage
// //     const cartDeliveryMethod = sessionStorage.getItem("DeliveryMethod");
// //     setDeliveryMethod(cartDeliveryMethod || "Standard shipping"); // Default to Standard if not set
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //     setErrors({ ...errors, [name]: "" });
// //   };

// //   const validateFields = () => {
// //     let validationErrors = {};
// //     if (currentStep === 1) {
// //       if (!formData.firstName)
// //         validationErrors.firstName = "First name is required.";
// //       if (!formData.lastName)
// //         validationErrors.lastName = "Last name is required.";
// //     } else if (currentStep === 2) {
// //       if (!formData.address) validationErrors.address = "Address is required.";
// //       if (!formData.city) validationErrors.city = "City is required.";
// //       if (!formData.state) validationErrors.state = "State is required.";
// //       if (!formData.zip) validationErrors.zip = "Zip code is required.";
// //     } else if (currentStep === 3) {
// //       if (!formData.paymentMethod)
// //         validationErrors.paymentMethod = "Please select a payment method.";
// //     }
// //     setErrors(validationErrors);
// //     return Object.keys(validationErrors).length === 0;
// //   };

// //   const handleNextStep = () => {
// //     if (validateFields()) {
// //       setCurrentStep(currentStep + 1);
// //     }
// //   };

// //   const handlePreviousStep = () => {
// //     setCurrentStep(currentStep - 1);
// //   };

// //   const handleRemoveItem = (index) => {
// //     const updatedItems = items.filter((_, i) => i !== index);
// //     setItems(updatedItems);
// //     sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateFields()) return;

// //     setLoading(true);
// //     const paymentDetails = preparePaymentDetails();
// //     try {
// //       const response = await sendPaymentDetailsToServer(paymentDetails);
// //       if (response.ok) {
// //         setSuccessMessage("Order placed successfully!");
// //         sessionStorage.removeItem("CartItems");
// //         sessionStorage.removeItem("DeliveryMethod"); // Clear delivery method after order
// //         setItems([]);
// //       } else {
// //         throw new Error("Failed to place order");
// //       }
// //     } catch (error) {
// //       setErrorMessage("There was an error placing your order.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const preparePaymentDetails = () => {
// //     const PaymentDate = new Date().toLocaleDateString();
// //     const TotalPrice = items
// //       .reduce((total, item) => total + parseFloat(item.Price), 0)
// //       .toFixed(2);

// //     const TransactionId = Math.floor(Math.random() * 1000000); // Random transaction ID

// //     const ProductId = items[0]?.ProductId || '';
// //     const ProductName = items[0]?.ProductName || '';
// //     const UnitPrice = items[0]?.Price || '0'; // Assuming price is stored as "Price"
// //     const PaymentAmount = `R${TotalPrice}`;
// //     const UserId = formData.firstName + formData.lastName + "@gmail.com"; // Example user ID
   
// //     const Status = "Complete"; // Static status, could be changed based on payment success/failure

// //     return {
// //       PaymentDate,
// //       PaymentMethod: formData.paymentMethod,
// //       ProductId,
// //       Quantity: items.length.toString(),
// //       TotalPrice: `R${TotalPrice}`,
// //       TransactionId,
// //       UnitPrice: `R${UnitPrice}`,
// //       PaymentAmount,
// //       ProductName,
// //       UserId,
// //       Status,
// //     };
// //   };

// //   const sendPaymentDetailsToServer = async (paymentDetails) => {
// //     return await fetch(`${baseURL}:3000/payment-history`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(paymentDetails),
// //     });
// //   };

// //   const handleReturnToCart = () => {
// //     navigate("/cart"); // Navigate back to Cart page
// //   };

// //   return (
// //     <div className="every">
// //       <Navbar />
// //       <h2 className="checkout-heading">Ready to pay?</h2>
// //       <form className="content" onSubmit={handleSubmit}>
// //         {successMessage && <p className="success">{successMessage}</p>}
// //         {errorMessage && <p className="error">{errorMessage}</p>}

// //         {/* Step 1: User Info */}
// //         {currentStep === 1 && (
// //           <div>
// //             <label className="first-name">First Name:</label>
// //             <input
// //               className="first-name-input"
// //               type="text"
// //               name="firstName"
// //               value={formData.firstName}
// //               onChange={handleInputChange}
// //             />
// //             {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            
// //             <label className="last-name">Last Name:</label>
// //             <input
// //               className="last-name-input"
// //               type="text"
// //               name="lastName"
// //               value={formData.lastName}
// //               onChange={handleInputChange}
// //             />
// //             {errors.lastName && <p className="error-message">{errors.lastName}</p>}
// //           </div>
// //         )}

// //         {/* Step 2: Address Info */}
// //         {currentStep === 2 && (
// //           <div>
// //             <label className="address">Address:</label>
// //             <input
// //               className="address-input"
// //               type="text"
// //               name="address"
// //               value={formData.address}
// //               onChange={handleInputChange}
// //             />
// //             {errors.address && <p className="error-message">{errors.address}</p>}
            
// //             <label className="city">City:</label>
// //             <input
// //               className="city-input"
// //               type="text"
// //               name="city"
// //               value={formData.city}
// //               onChange={handleInputChange}
// //             />
// //             {errors.city && <p className="error-message">{errors.city}</p>}
            
// //             <label className="state">State:</label>
// //             <input
// //               className="state-input"
// //               type="text"
// //               name="state"
// //               value={formData.state}
// //               onChange={handleInputChange}
// //             />
// //             {errors.state && <p className="error-message">{errors.state}</p>}
            
// //             <label className="zip">Zip Code:</label>
// //             <input
// //               className="zip-input"
// //               type="text"
// //               name="zip"
// //               value={formData.zip}
// //               onChange={handleInputChange}
// //             />
// //             {errors.zip && <p className="error-message">{errors.zip}</p>}
// //           </div>
// //         )}

// //         {/* Step 3: Payment Method Info */}
// //         {currentStep === 3 && (
// //           <div>
// //             <label className="payment-method">Payment Method:</label>
// //             <select
// //               className="payment-method-select"
// //               name="paymentMethod"
// //               value={formData.paymentMethod}
// //               onChange={handleInputChange}
// //             >
// //               <option value="">Select a Payment Method</option>
// //               <option value="Credit Card">Credit Card</option>
// //               <option value="Debit Card">Debit Card</option>
// //               <option value="PayPal">PayPal</option>
// //             </select>
// //             {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
// //           </div>
// //         )}

// //         {/* Step 4: Order Review */}
// //         {currentStep === 4 && (
// //           <div>
// //             <h3 className="review-heading">Review Your Order</h3>
// //             <div className="review-items">
// //               {items.map((item, index) => (
// //                 <div key={index} className="review-item">
// //                   <span className="product-name">{item.ProductName}</span>
// //                   <span className="product-price">{`R${item.Price}`}</span>
// //                   <button
// //                     className="remove-item-button"
// //                     onClick={() => handleRemoveItem(index)}
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               ))}
// //               <div className="total-price">
// //                 <span>Total:</span>
// //                 <span>{`R${items.reduce((total, item) => total + parseFloat(item.Price), 0).toFixed(2)}`}</span>
// //               </div>
// //             </div>
// //             <div className="delivery-method-review">
// //               <span>Delivery Method:</span>
// //               <span>{deliveryMethod}</span>
// //             </div>
// //             {/* Return to Cart Button */}
// //             <button
// //               type="button"
// //               className="return-cart-button"
// //               onClick={handleReturnToCart}
// //             >
// //               Return to Cart
// //             </button>
// //           </div>
// //         )}

// //         {/* Navigation Buttons */}
// //         <div className="checkout-buttons">
// //           {currentStep > 1 && (
// //             <button type="button" className="previous-button" onClick={handlePreviousStep}>
// //               Back
// //             </button>
// //           )}
// //           {currentStep < 4 ? (
// //             <button type="button" className="next-button" onClick={handleNextStep}>
// //               Next
// //             </button>
// //           ) : (
// //             <button type="submit" className="submit-button" disabled={loading}>
// //               {loading ? "Processing..." : "Place Order"}
// //             </button>
// //           )}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default CheckOut;





// import React, { useEffect, useState } from "react";
// import "./CheckOut.css";
// import Navbar from "../NavBar/Navbar";
// import { Link, useNavigate } from "react-router-dom";

// const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

// function CheckOut() {
//   const [items, setItems] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     paymentMethod: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//   });
//   const [currentStep, setCurrentStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [deliveryMethod, setDeliveryMethod] = useState(""); // Set delivery method

//   const navigate = useNavigate(); // For navigation

//   useEffect(() => {
//     const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
//     setItems(cartItems);

//     // Get delivery method from sessionStorage
//     const cartDeliveryMethod = sessionStorage.getItem("DeliveryMethod");
//     setDeliveryMethod(cartDeliveryMethod || "Standard shipping"); // Default to Standard if not set
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   const validateFields = () => {
//     let validationErrors = {};
//     if (currentStep === 1) {
//       if (!formData.firstName)
//         validationErrors.firstName = "First name is required.";
//       if (!formData.lastName)
//         validationErrors.lastName = "Last name is required.";
//     } else if (currentStep === 2) {
//       if (!formData.address) validationErrors.address = "Address is required.";
//       if (!formData.city) validationErrors.city = "City is required.";
//       if (!formData.state) validationErrors.state = "State is required.";
//       if (!formData.zip) validationErrors.zip = "Zip code is required.";
//     } else if (currentStep === 3) {
//       if (!formData.paymentMethod)
//         validationErrors.paymentMethod = "Please select a payment method.";
//     }
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const handleNextStep = () => {
//     if (currentStep === 3) {
//       // On Step 3, go to Step 4 (Review), not place the order yet
//       setCurrentStep(currentStep + 1);
//     } else if (validateFields()) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePreviousStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   const handleRemoveItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//     sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateFields()) return;

//     setLoading(true);
//     const paymentDetails = preparePaymentDetails();
//     try {
//       const response = await sendPaymentDetailsToServer(paymentDetails);
//       if (response.ok) {
//         setSuccessMessage("Order placed successfully!");
//         sessionStorage.removeItem("CartItems");
//         sessionStorage.removeItem("DeliveryMethod"); // Clear delivery method after order
//         setItems([]);
//       } else {
//         throw new Error("Failed to place order");
//       }
//     } catch (error) {
//       setErrorMessage("There was an error placing your order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const preparePaymentDetails = () => {
//     const PaymentDate = new Date().toLocaleDateString();
//     const TotalPrice = items
//       .reduce((total, item) => total + parseFloat(item.Price), 0)
//       .toFixed(2);

//     const TransactionId = Math.floor(Math.random() * 1000000); // Random transaction ID

//     const ProductId = items[0]?.ProductId || '';
//     const ProductName = items[0]?.ProductName || '';
//     const UnitPrice = items[0]?.Price || '0'; // Assuming price is stored as "Price"
//     const PaymentAmount = `R${TotalPrice}`;
//     const UserId = formData.firstName + formData.lastName + "@gmail.com"; // Example user ID

//     const Status = "Complete"; // Static status, could be changed based on payment success/failure

//     // Include the delivery method in payment details
//     return {
//       PaymentDate,
//       PaymentMethod: formData.paymentMethod,
//       ProductId,
//       Quantity: items.length.toString(),
//       TotalPrice: `R${TotalPrice}`,
//       TransactionId,
//       UnitPrice: `R${UnitPrice}`,
//       PaymentAmount,
//       ProductName,
//       UserId,
//       Status,
//       DeliveryMethod: deliveryMethod, // Add delivery method here
//     };
//   };

//   const sendPaymentDetailsToServer = async (paymentDetails) => {
//     return await fetch(`${baseURL}:3000/payment-history`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paymentDetails),
//     });
//   };

//   const handleReturnToCart = () => {
//     navigate("/cart"); // Navigate back to Cart page
//   };

//   return (
//     <div className="every">
//       <Navbar />
//       <h2 className="checkout-heading">Ready to pay?</h2>
//       <form className="content" onSubmit={handleSubmit}>
//         {successMessage && <p className="success">{successMessage}</p>}
//         {errorMessage && <p className="error">{errorMessage}</p>}

//         {/* Step 1: User Info */}
//         {currentStep === 1 && (
//           <div>
//             <label className="first-name">First Name:</label>
//             <input
//               className="first-name-input"
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//             />
//             {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            
//             <label className="last-name">Last Name:</label>
//             <input
//               className="last-name-input"
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//             />
//             {errors.lastName && <p className="error-message">{errors.lastName}</p>}
//           </div>
//         )}

//         {/* Step 2: Address Info */}
//         {currentStep === 2 && (
//           <div>
//             <label className="address">Address:</label>
//             <input
//               className="address-input"
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//             />
//             {errors.address && <p className="error-message">{errors.address}</p>}
            
//             <label className="city">City:</label>
//             <input
//               className="city-input"
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleInputChange}
//             />
//             {errors.city && <p className="error-message">{errors.city}</p>}
            
//             <label className="state">State:</label>
//             <input
//               className="state-input"
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleInputChange}
//             />
//             {errors.state && <p className="error-message">{errors.state}</p>}
            
//             <label className="zip">Zip Code:</label>
//             <input
//               className="zip-input"
//               type="text"
//               name="zip"
//               value={formData.zip}
//               onChange={handleInputChange}
//             />
//             {errors.zip && <p className="error-message">{errors.zip}</p>}
//           </div>
//         )}

//         {/* Step 3: Payment Method Info */}
//         {currentStep === 3 && (
//           <div>
//             <label className="payment-method">Payment Method:</label>
//             <select
//               className="payment-method-select"
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleInputChange}
//             >
//               <option value="">Select a Payment Method</option>
//               <option value="Credit Card">Credit Card</option>
//               <option value="Debit Card">Debit Card</option>
//               <option value="PayPal">PayPal</option>
//             </select>
//             {errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
//           </div>
//         )}

//         {/* Step 4: Review Order */}
//         {currentStep === 4 && (
//           <div>
//             <h3>Order Summary</h3>
//             <ul>
//               {items.map((item, index) => (
//                 <li key={index}>
//                   {item.ProductName} - R{item.Price}
//                   <button onClick={() => handleRemoveItem(index)}>Remove</button>
//                 </li>
//               ))}
//             </ul>
//             <p>Total Price: R{items.reduce((total, item) => total + parseFloat(item.Price), 0).toFixed(2)}</p>
//             <p>Delivery Method: {deliveryMethod}</p>
//           </div>
//         )}

//         {/* Navigation Buttons */}
//         <div className="buttons">
//           {currentStep > 1 && (
//             <button className="prev-button" type="button" onClick={handlePreviousStep}>
//               Previous
//             </button>
//           )}
//           {currentStep < 4 ? (
//             <button className="next-button" type="button" onClick={handleNextStep}>
//               Next
//             </button>
//           ) : (
//             <button className="submit-button" type="submit" disabled={loading}>
//               {loading ? "Processing..." : "Place Order"}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CheckOut;



import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import Navbar from "../NavBar/Navbar";
import { useNavigate } from "react-router-dom";

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
  
  return (
    <div className="every ">
      <Navbar />
      <div className="checkout-container">
         <h2 className="checkout-heading">Ready to pay?</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Step 1: User Info */}
        {currentStep === 1 && (
          <div>
            <label className="checkout-label">First Name:</label>
            <input
              className="checkout-input"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <p className="error-text">{errors.firstName}</p>}
            
            <label className="checkout-label">Last Name:</label>
            <input
              className="checkout-input"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>
        )}

        {/* Step 2: Address Info */}
        {currentStep === 2 && (
          <div>
            <label className="checkout-label">Address:</label>
            <input
              className="checkout-input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
            
            <label className="checkout-label">City:</label>
            <input
              className="checkout-input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
            
            <label className="checkout-label">State:</label>
            <input
              className="checkout-input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            {errors.state && <p className="error-text">{errors.state}</p>}
            
            <label className="checkout-label">Zip Code:</label>
            <input
              className="checkout-input"
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
            />
            {errors.zip && <p className="error-text">{errors.zip}</p>}
          </div>
        )}

        {/* Step 3: Payment Method Info */}
        {currentStep === 3 && (
          <div>
            <label className="checkout-label">Payment Method:</label>
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
          <div className="order">
            <h3>Order Summary</h3>
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

<div className="buttons">
  {currentStep > 1 && (
    <button className="prev-button" type="button" onClick={handlePreviousStep}>
      Previous
    </button>
  )}
  {currentStep <= 3 ? (
    <button className="next-button" type="button" onClick={handleNextStep}>
      Next
    </button>
  ) : (
    <button
      className="submit-button"
      type="button" // Prevent default submission
      disabled={loading}
      onClick={handlePlaceOrder} // Trigger the order placement
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


        
    
        <div className="return-cart">
          <button className="return-cart-button" type="button" onClick={handleReturnToCart}>
            Return to Cart
          </button>
        </div>
      </form>
      </div>
     
    </div>
  );
}

export default CheckOut;
