import React, { useEffect, useState, useContext } from "react";
import { InfostructureContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./ProductScreen.css";
import Navbar from "../NavBar/Navbar";

const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

const ProductScreen = () => {
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const {setCartCount , cartCount} = useContext(InfostructureContext);

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setCartCount(cartItems.length);

    fetch(`${baseURL}:3000/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if(!savedSettings.showPricing){
    console.log("it is null ..now updating with data : ", sessionStorage.getItem("currentSettings"))
    setSavedSettings(JSON.parse(sessionStorage.getItem("currentSettings")))
  }


  const goHome = () => {
    navigate("/");
  };

  const handleAddToCart = (item) => {
    console.log(item);
    if (sessionStorage.getItem("CartItems")) {
      var currentItems = JSON.parse(sessionStorage.getItem("CartItems"));
      var updateNewItems = [...currentItems];

      updateNewItems.push(item);
      console.log(updateNewItems);
      sessionStorage.setItem("CartItems", JSON.stringify(updateNewItems));
      setCartCount(cartCount + 1);
    } else {
      var emptyCart = [];
      emptyCart.push(item);
      sessionStorage.setItem("CartItems", JSON.stringify(emptyCart));
    }
  };
  return (
    <div className="all" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff"}}>
     <Navbar/>
      <div className="heading">
        <FaArrowLeft className="arrow-icon" onClick={goHome} />
        <h1>Products</h1>
      </div>
      <div className="image-gallery">
        <div className="product-list">
          <div className="product">
            {products.length > 0 ? (
              products.map((product,index) => (
                <div key={product._id + index} className="image-item" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff": "#000"}}>
                  <img src={product.Image} alt={product.ProductName} />
                  <div className="product-info" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff"}}>
                    <h3 className="product-name">{product.ProductName}</h3>
                    <p>Description</p>
                    <p className="product-description" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff" : "#000"}}>{product.Description}</p>
                    <p className="product-price" style={{backgroundColor:savedSettings.theme == "Dark" ? "#000":"#fff", color:savedSettings.theme == "Dark" ? "#fff" : "#000"}}>${product.Price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="addToCartBtn"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
