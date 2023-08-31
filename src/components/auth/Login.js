import React, { useState } from "react";
import axios from "axios"; 
import Register from "./Register";
import {
  ButtonLogin,
  ButtonRegister,
  DivLogin,
  DivWelcome,
  FormLogin,
  InputLogin,
} from "./LoginStyled";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const user = response.data;

      if (user) {
        setLoggedInUser(user);
        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
        }, 5000);
      } else {
        console.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = (firstName) => {
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  return (
    <div>
      {!showRegister && (
        <DivLogin>
          <FormLogin onSubmit={handleLogin}>
            <label htmlFor="email">EMAIL</label>
            <InputLogin
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">PASSWORD</label>
            <InputLogin
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <ButtonLogin type="submit">LOGIN</ButtonLogin>
            <ButtonRegister type="button" onClick={openRegister}>
              SIGN IN
            </ButtonRegister>
          </FormLogin>
        </DivLogin>
      )}

      {showRegister && (
        <Register onRegister={handleRegister} onClose={closeRegister} />
      )}

      {showWelcomeMessage && (
        <DivWelcome className="floating-message">
          Welcome, {loggedInUser && loggedInUser.firstName}! Close the login
          window to make your purchases.
        </DivWelcome>
      )}
    </div>
  );
};

export default Login;
