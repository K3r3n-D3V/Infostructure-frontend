import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaHome } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

const Navbar = ({isAuthenticated}) => {
  const navigate = useNavigate();

  const handleProceedToCart = () => {
    if (isAuthenticated) {
      // Redirect to the checkout page
      navigate('/checkout');
    } else {
      // Redirect to the login page if the user is not logged in
      navigate('/login');
    }
  };  
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [products, setProducts] = useState([]); // State to store products fetched from MongoDB
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  // Fetch products from the backend
  useEffect(() => {


    console.log(baseURL,"URL From env")

    const fetchProducts = async () => {
      try {
        // const URL = process.env.REACT_APP_EC2_PUBLIC_IP;

        const response = await fetch(`${baseURL}:3000/products`);
        const data = await response.json();
        setProducts(data); // Store products in state
        setFilteredProducts(data); // Initially set all products as filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input change and filter products using regex
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Update search term

    try {
      const regex = new RegExp(term, "i"); // Create regex from search term
      const filtered = products.filter((product) =>
        regex.test(product.ProductName)
      ); // Filter products by name
      setFilteredProducts(filtered); // Update filtered products
    } catch (error) {
      console.error("Invalid regex:", error);
      setFilteredProducts([]); // Set filtered products to empty array if there's an error
    }
  };

  const handleCartButton = () => {
    navigate("/cart");
  };

  const goHome = () => {
    navigate("/");
  };

  const productscreen = () => {
    navigate("/productscreen")
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="../../Screens/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Dropdown/Search Result Section */}
      {searchTerm && (
        <ul className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product._id}
                className="search-item"
                // onClick={() => navigate(`/productscreen/${product._id}`)}
                onClick={productscreen}
              >
                <img
                  src={product.Image}
                  alt={product.ProductName}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="product-info">
                  <p>{product.ProductName}</p>
                  <p>Price: ${product.Price}</p>
                  <p>{product.Description}</p>
                </div>
              </li>
            ))
          ) : (
            <h5>No matching products found</h5>
          )}
        </ul>
      )}

      <div className="navbar-icons">
        <Link to="/">
          <FaHome className="icon" />
        </Link>
        <Link to="/profile">
          <FaUser className="icon" />
        </Link>
        {/* <Link to="/cart"> */}
          <FaShoppingCart className="icon" onClick={handleProceedToCart}/>
        {/* </Link> */}
        <Link to="/login">
        <button className="navbar-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
