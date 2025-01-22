import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import { useLocation, useNavigate } from "react-router-dom";


function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
      // Clear the token from localStorage
      localStorage.removeItem("jwt_token");
      // Redirect to login
      navigate("/login");
  };

  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper</h1>
        {location.pathname === "/notes" && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
    </header>
  );
}

export default Header;
