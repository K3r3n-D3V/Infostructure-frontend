import "./Profile.css";
import { useNavigate } from "react-router-dom";

import React from "react";
import { Box, Typography, Button, Grid, Avatar, Divider } from "@mui/material";

const Profile = () => {
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
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
            onClick={() => alert("Navigating to Profile Details")}
          >
            View Profile Details
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" }}
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
