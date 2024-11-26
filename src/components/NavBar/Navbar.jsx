import React, { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaHome } from "react-icons/fa";
import "./Navbar.css";
import { InfostructureContext } from "../../context/context";

const baseURL = import.meta.env.VITE_EC2_PUBLIC_URL;

const Navbar = ({ signedIn, setSignedIn }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { cartCount, setCartCount } = useContext(InfostructureContext);
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)

  // Handle Logout
  const handleLogout = () => {
    setSignedIn(false);
    sessionStorage.removeItem("AuthStatus");
  };
  
  const handlePlaceholderTheme = ()=>{
    if(savedSettings.theme == "Dark"){
      return "search-input search-input-dark"
    }else if(savedSettings.theme == "light"){
      return "search-input search-input-light"
    }else{
      return "search-input"
    }
  }


  const handleProceedToCart = () => {
    if (signedIn) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  // Toggle Theme
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-theme", isLightMode); // Toggle class for light theme
    document.body.classList.toggle("dark-theme", !isLightMode); // Toggle class for dark theme
  };

  // Fetch products from the backend
  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setCartCount(cartItems.length);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}:3000/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    if(!savedSettings.showPricing){
      console.log("it is null ..now updating with data : ", sessionStorage.getItem("currentSettings"))
      setSavedSettings(JSON.parse(sessionStorage.getItem("currentSettings")))
    }


    console.log("saved settings in navbar: ",savedSettings);

  }, [setCartCount]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

  //   try {
  //     const regex = new RegExp(term, "i");
  //     const filtered = products.filter((product) =>
  //       regex.test(product.ProductName)
  //     );
  //     setFilteredProducts(filtered);
  //   } catch (error) {
  //     console.error("Invalid regex:", error);
  //     setFilteredProducts([]);
  //   }
  // };
  if (term) {
    const regex = new RegExp(term, "i");
    const filtered = products.filter((product) => regex.test(product.ProductName));
    setFilteredProducts(filtered);
  } else {
    setFilteredProducts(products); // Reset to all products if search term is empty
  }
};

const themeStyles = {
  input: {
    color: savedSettings?.theme === "Dark" ? "#fff" : "#000", // Input text color
  },
  placeholder: {
    color: savedSettings?.theme === "Dark" ? "#fff" : "#777", // Placeholder color
  },
};
  return (

    <nav className="navbar" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff"}}>
      <style>
        {`
          .input-placeholder::placeholder{
            color: ${themeStyles.placeholder.color};
          }
            .search-input{
            color: ${themeStyles.input.color};
            }

            .search-input::placeholder{
            olor: ${themeStyles.placeholder.color};
            }
        `}
      </style>
      
      <div className="navbar-logo">
        <Link to="/">
          <img src="../../Screens/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-search">
        <div className="search-container">
          <FaSearch className="search-icon" style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}} />
          <input
            type="text"
            placeholder="What are you looking for?"
            className={handlePlaceholderTheme()}
            value={searchTerm}
            onChange={handleSearch}
            style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#fff": "#000"}}
          />
        </div>
      </div>

      {/* Dropdown/Search Result Section */}
      {searchTerm && (
        <ul className="search-results" style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
              style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000", backgroundColor:savedSettings?.theme == "Dark" ? "#000": "#fff"}}
                key={product._id}
                className="search-item"
                onClick={() => navigate(`/productscreen/${product._id}`)}
              >
                <img
                  src={product.Image}
                  alt={product.ProductName}
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="product-info" style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                  <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>{product.ProductName}</p>
                  <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Price: ${product.Price}</p>
                  <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>{product.Description}</p>
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
          <FaHome size={30} color={savedSettings?.theme == "Dark" ? "#fff":"#000"}/>
        </Link>
        <Link to="/profile">
          <FaUser size={30} color={savedSettings?.theme == "Dark" ? "#fff":"#000"} />
        </Link>
        {/* <i className="cart-icon">
          <FaShoppingCart  size={30} color={savedSettings?.theme == "Dark" ? "#fff":"#000"} onClick={handleProceedToCart} />
        </i> */}

        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={30} color={savedSettings?.theme == "Dark" ? "#fff":"#000"} className="product-navbar-icon" />
        <div className="cart-tag">{cartCount}</div>
        </Link>



     {/* <p style={{color:"red"}}>
         {savedSettings?.theme}
         </p> */}
   
      </div>
    </nav>
  );
};

export default Navbar;
