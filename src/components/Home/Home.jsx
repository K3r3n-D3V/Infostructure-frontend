import React, {useState, useEffect,useContext, } from "react";
import Navbar from "../NavBar/Navbar";
import { InfostructureContext } from "../../context/context";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  // AiOutlineArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay } from "swiper/modules";
import { FiArrowRightCircle } from "react-icons/fi";



// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

import "./Home.css";

const Home = () => {
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)


  // Toggle Theme
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.body.classList.toggle("light-theme", isLightMode); // Toggle class for light theme
    document.body.classList.toggle("dark-theme", !isLightMode); // Toggle class for dark theme
  };

  const handlePlaceholderTheme = ()=>{
    if(savedSettings?.theme?.toLowerCase() == "dark"){
      return "contact-input-dark"
    }else if(savedSettings?.theme?.toLowerCase() == "light"){
      return "contact-input-light"
    }else{
      return "contact-input"
    }
  }


  const navigate = useNavigate();
  const productscreen = () => {
    navigate("/productscreen");
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
    <div className="home" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
      <Navbar />
      <div className="box" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
        <div className="box2" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
          <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            Home sweet <span className="span">stylish</span> home.
          </h1>
          <p className="designers" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            A warm, welcoming sanctuary filled with personal touches and
            peaceful comfort
          </p>
          <Link to="/productscreen">
          <button type="button" className="shop-collection" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000":"#fff"}}>SHOP COLLECTION</button>
          </Link>
        </div>
        <div className="box2">
          <img src="../../Screens/home-pic1.jpg" alt="" className="zoom" />
        </div>
      </div>

      <div className="box3 designers">
        <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Explore our <span className="span">Curated Collections</span> By <span className="span">Designers...</span></h1>
        <div className="collection" >
        <div 
  className="collection-item" 
  style={{
    boxShadow: savedSettings?.theme === "Dark" 
      ? "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)" 
      : "0 0 15px rgba(0, 0, 0, 0.1), 0 0 30px rgba(0, 0, 0, 0.05)",
  }}
>
            <div className="collection-pic">
              <img
                src="../../Screens/pic1.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer" >
                <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Sophia LeLor</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic2.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Marinette Dupeng-Cheng</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic3.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Agnes Levine</h1>
                {/* <p>Eye-catching accents to complete your look</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic4.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Patrick Dior</h1>
                {/* <p>Dreamy furniture fit for royalty</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic5.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Annabelle Ford</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic6.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Lucrazia Santos</h1>
                {/* <p>Bathtubs, sinks and more to create a unique oasis of refreshment</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img src="../../Screens/pic7.jpg" alt="" />
              <div className="collection-info designer">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Boketsu Peace</h1>
                {/* <p>Warm, inviting, culinary hub of creativity</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic8.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Emma Bulore</h1>
                {/* <p>kjgvkyh</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box3">
        <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Shop By <span className="span">Categories</span></h1>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-living-room.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Living Room</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Sophisticated sofas, rugs and more</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-dining-room.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Dining Room</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Tables, Chairs and more to help you set a city-chic scene</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-decor.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Decor & more</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Eye-catching accents to complete your look</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-bedroom.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Bedroom</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Dreamy furniture fit for royalty</p>
              </div>
            </div>
          </div>
        </div>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/babykids.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Baby & Kids</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Let your little ones grow in comfort</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/bathroom.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Bathroom</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
                  Bathtubs, sinks and more to create a unique oasis of
                  refreshment
                </p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/kitchen.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Kitchen</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Warm, inviting, culinary hub of creativity</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/outdoor.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1 style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Outdoor</h1>
                <p style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Be comfortable anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="float">
       
<Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 3000, // Time in milliseconds (3 seconds per slide)
          disableOnInteraction: false, // Keep autoplay running even after user interactions
        }}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="../../../Screens/babykids.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/bathroom.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/cat-decor.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../../Screens/pic6.jpg" />
        </SwiperSlide>
      </Swiper>

      </div>
      <div className="more-info">
        <h3 >Be the first to know about our best deals!</h3>
        <input type="checkbox" className="input2" />
        <label htmlFor="">All</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Furniture</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Appliances</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Decor</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Specials</label>
        <div className="email-container"></div>
        <input
          type="email"
          className="email-input search-input"
          placeholder="Email Address"
          
        />
        <FiArrowRightCircle className="rightArrow"/>
      </div>

      <div className="contact" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor: savedSettings?.theme === "Dark" ? "#fff" : "#000" }}>
        <div className="contact-form" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings == "Dark" ? "#fff" : "#000"}}>
          <div className="form" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff",borderColor:savedSettings == "Dark" ? "#fff" : "#000"}}>
            <h1 style={{color:savedSettings == "Dark" ? "#fff" : "#000"}}>Contact Us</h1>
            <form action="" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor: "#fff",}}>
              <input className={handlePlaceholderTheme()} type="text" placeholder="Name" required style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#fff" : "#000",padding:"10px",border:savedSettings?.theme == "Dark" ? "1px solid #fff":"1px solid #000", borderRadius:"10px"}}/>
              <input className={handlePlaceholderTheme()} type="text" placeholder="Email" required style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#fff" : "#000",padding:"10px",border:savedSettings?.theme == "Dark" ? "1px solid #fff":"1px solid #000", borderRadius:"10px"}}/>
              <textarea className={handlePlaceholderTheme()} name="message" id="" placeholder="Message" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#fff" : "#000",padding:"10px",border:savedSettings?.theme == "Dark" ? "1px solid #fff":"1px solid #000", borderRadius:"10px"}}></textarea>
              <button type="submit" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000" : "#fff"}}>SEND </button>
            </form>
          </div>
        </div>
        <div className="contact-details" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000" : "#fff"}}>
          <div className="details" style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000" : "#fff", borderColor:savedSettings?.theme == "Dark" ? "#000" : "#fff"}}>
            <h1 style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000" : "#fff"}}>Our Information</h1>
            <p>
              <FaEnvelope /> infostructureWarehouse@gmail.com
            </p>
            <p>
              <FaPhoneAlt /> +44 98 55 736
            </p>
            <p>
              <FaMapMarkerAlt /> 12 Keren Street, Melview
            </p>
            <p>
              <FaClock /> 09:00 - 18:00
            </p>
            <div className="socials">
              <div className="social">
                <a href="https://x.com/?lang=en">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.6526 3.80762H43.3995L28.6594 20.6546L46 43.5796H32.4225L21.7881 29.6757L9.61989 43.5796H2.86886L18.6349 25.5598L2 3.80762H15.9222L25.5348 16.5163L36.6526 3.80762ZM34.2846 39.5412H38.0232L13.8908 7.63388H9.87892L34.2846 39.5412Z"
                      fill="#424242"
                    ></path>
                  </svg>
                </a>
                <a href="https://instagram.com/">
                  <img src="../../Screens/instagram-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.tiktok.com/en/">
                  <img src="../../Screens/tiktok-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.youtube.com/">
                  <img src="../../Screens/youtube-168-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://web.whatsapp.com/">
                  <img src="../../Screens/whatsapp-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.facebook.com/">
                  <img src="../../Screens/facebook-svgrepo-com.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
