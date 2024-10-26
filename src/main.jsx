// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import ContextProvider from './context/ContextProvider.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ContextProvider>
//     <App />
//     </ContextProvider>
//   </StrictMode>,
// )


// ContextProvider.jsx
import { createContext, useState } from 'react';

// Create the context
const MyContext = createContext();

// Define the provider component
const ContextProvider = ({ children }) => {
  // Define any state or functions you want to share
  const [state, setState] = useState(null);

  // This value will be accessible to any component that consumes this context
  const value = {
    state,
    setState,
    // Add other shared state or functions here
  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};

// Export the provider as default and the context itself
export default ContextProvider;
export { MyContext };
