import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="home-container">
            <h1>Welcome to Keeper App</h1>
            <p>Organize your thoughts and keep track of your notes!</p>
            <div className="home-button-container">
                <button className="home-button" onClick={handleLogin}>
                    Login
                </button>
                <button className="home-button" onClick={handleRegister}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Home;