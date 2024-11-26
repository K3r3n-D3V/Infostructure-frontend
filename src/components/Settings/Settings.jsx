import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { InfostructureContext } from '../../context/context';


const Settings = () => {
    const [theme, setTheme] = useState('Light');
    const [showPricing, setShowPricing] = useState(true);
    const [notifications, setNotifications] = useState(false);
    const [fontSize, setFontSize] = useState('Medium');
    const {savedSettings,setSavedSettings} = useContext(InfostructureContext)
    const [isLightMode, setIsLightMode] = useState(true); // State to toggle themes
  
  const navigate = useNavigate();

    const handleHome = () => {
        navigate("/")
    }
    const handleSaveSettings = () => {
        // Save all settings in a single object
        const settings = {
            theme,
            showPricing,
            notifications,
            fontSize,
        };
        sessionStorage.setItem("currentSettings",JSON.stringify(settings))
        alert('Settings Saved Successfully!');
        setSavedSettings(settings); // Update the savedSettings state


        console.log(savedSettings)
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif',height: "100vh",backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#000":"#fff" }}>
            <h1 style={{ color: '#fff', marginBottom: "20px", padding: "10px 30px", color:savedSettings?.theme == "Dark" ? "#fff":"#000",backgroundColor:savedSettings?.theme == "Dark" ? "#000":"#fff", borderColor:savedSettings?.theme == "Dark" ? "#fff":"#000"}}>Settings</h1>

            <div style={{padding: "10px 30px", backgroundColor:savedSettings?.theme == "Dark" ? "#333":"#ccc" }}>
                {/* Theme Setting */}
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '18px', color:savedSettings?.theme === "Dark" ? "#fff" : "#000" }}>Theme:</label>
                    <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #fff', fontSize: '14px' }}
                    >
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                </div>

                {/* Show Pricing Setting */}
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', backgroundColor:savedSettings?.theme == "Dark" ? "#333":"#ccc" }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '18px', color:savedSettings?.theme === "Dark" ? "#fff" : "#000" }}>Show Pricing:</label>
                    <input
                        type="checkbox"
                        checked={showPricing}
                        onChange={() => setShowPricing(!showPricing)}
                        style={{ transform: 'scale(1.1)', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '14px', color: showPricing ? '#007700' : '#770000' }}>
                        {showPricing ? 'Enabled' : 'Disabled'}
                    </span>
                </div>

                {/* Notifications Setting */}
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '18px', color:savedSettings?.theme === "Dark" ? "#fff" : "#000" }}>Notifications:</label>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                        style={{ transform: 'scale(1.1)', marginRight: '10px' }}
                    />
                    <span style={{ fontSize: '14px', color: notifications ? '#007700' : 'red' }}>
                        {notifications ? 'On' : 'Off'}
                    </span>
                </div>

                {/* Font Size Setting */}
                <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ fontWeight: 'bold', marginRight: '10px',fontSize: '18px', color:savedSettings?.theme === "Dark" ? "#fff" : "#000" }}>Font Size:</label>
                    <select
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        style={{ padding: '5px', borderRadius: '4px', border: '1px solid #fff', fontSize: '14px' }}
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                {/* Save Settings Button */}
                <button
                    onClick={handleSaveSettings}
                    style={{
                        padding: '10px 20px',
                        borderColor:savedSettings?.theme === "Dark" ? '#fff' : "#000",
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        marginTop: '10px',
                        color:savedSettings?.theme === "Dark" ? "#000" : "#fff",
                        backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000"
                    }}
                >
                    Save Settings
                </button>
            </div>

            {/* Display Saved Settings */}
            {savedSettings && (
                <div style={{ marginTop: '20px', padding: '10px 20px',color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    backgroundColor:savedSettings?.theme == "Dark" ? "#333":"#ddd" }}>
                    <h2 style={{color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    }}>Saved Settings</h2>
                    <p style={{color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    }}><strong>Theme:</strong> {savedSettings?.theme}</p>
                    <p style={{color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    }}><strong>Show Pricing:</strong> {savedSettings.showPricing ? 'Enabled' : 'Disabled'}</p>
                    <p style={{color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    }}><strong>Notifications:</strong> {savedSettings.notifications ? 'On' : 'Off'}</p>
                    <p style={{color:savedSettings?.theme === "Dark" ? "#fff" : "#000",
                    }}><strong>Font Size:</strong> {savedSettings.fontSize}</p>
                </div>
            )}
            <button className="goHome" onClick={handleHome} style={{backgroundColor:savedSettings?.theme == "Dark" ? "#fff":"#000", color:savedSettings?.theme == "Dark" ? "#000":"#fff"}}>Return to home</button>
        </div>
    );
}

export default Settings;
