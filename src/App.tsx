import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthForms from "./GeneralComponents/AuthForm";
import InventoryDashboard from "./GeneralComponents/InventoryDashboard";
import Sidebar from "./GeneralComponents/SideBar";
import ProductForm from "./GeneralComponents/CreateProduct";
import Component from "./GeneralComponents/GetUserCredentials";
import Navbar from "./GeneralComponents/Navbar";
import TestingComponent from "./GeneralComponents/TestingComponent";
import ManageInventory from "./GeneralComponents/ManageInventory";
import ConnectSites from "./GeneralComponents/ConnectSites";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication when the component mounts
    if (localStorage.getItem("AccessToken")) {
      setAuthenticated(true);
    }
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <BrowserRouter>
      <div className="bg-background p-5">
        {authenticated ? (
          <div className="flex flex-col">
            <Navbar />
            <Sidebar>
              <Routes>
                <Route path="/" element={<InventoryDashboard />} />

                <Route path="/createproduct" element={<ProductForm />} />
                <Route path="/manageinventory" element={<ManageInventory />} />
                <Route path="/connect-sites" element={<ConnectSites />} />

                <Route path="*" element={<InventoryDashboard />} />
              </Routes>
            </Sidebar>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <Routes>
              <Route path="/" element={<AuthForms />} />
              {/* Fallback route to handle non-authenticated paths */}
              <Route path="*" element={<AuthForms />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
