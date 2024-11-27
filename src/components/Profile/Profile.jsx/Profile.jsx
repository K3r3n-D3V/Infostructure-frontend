import "./Profile.css";
import { useNavigate } from "react-router-dom";
import React, { useState,useContext } from "react";
import { Box, Typography, Button, Grid, Avatar, Divider } from "@mui/material";
import { InfostructureContext } from "../../../context/context";

const Profile = () => {
  const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  const {savedSettings,setSavedSettings} = useContext(InfostructureContext)

  const handlePlaceholderTheme = ()=>{
    if(savedSettings?.theme == "Dark"){
      return "search-input search-input-dark"
    }else if(savedSettings?.theme == "light"){
      return "search-input search-input-light"
    }else{
      return "search-input"
    }
  }
    // Toggle Theme
    const toggleTheme = () => {
      setIsLightMode(!isLightMode);
      document.body.classList.toggle("light-theme", isLightMode); // Toggle class for light theme
      document.body.classList.toggle("dark-theme", !isLightMode); // Toggle class for dark theme
    }; 
  
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate("/settings")
  }


  const user = {
    name: "Keren Botombe",
    email: "kerenbotombe125@gmail.com",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Box sx={{ p: 4, height:800, maxWidth: 1500, mx: "auto", borderRadius: 2 ,backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff"}} >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff" }}>
        <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold" style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{color:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Options */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => navigate("/")}
          >
           Return to Home
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" ,backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff"}}
            onClick={handleSettings}
          >
            Go to Settings
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
