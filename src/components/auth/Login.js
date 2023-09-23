import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "./Register";
import {
  ButtonLogin,
  ButtonRegister,
  ButtonClose,
  DivLogin,
  DivWelcome,
  FormLogin,
  InputLogin,
  ShadowLogin,
} from "./LoginStyled";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isLoggedIn, setIsLoggedInLocal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showShadow, setShowShadow] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const user = response.data;

      if (user) {
        setLoggedInUser(user);
        setIsLoggedInLocal(true);
        setShowWelcomeMessage(true);
        setTimeout(() => {
          setShowWelcomeMessage(false);
          setShowRegister(false);
          setShowLogin(false);
          setShowShadow(false);
          setIsLoggedIn(true); // Aquí actualizamos el estado en Sidebar
        }, 5000);
      } else {
        console.error("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = (firstName) => {
    setShowRegister(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
    setShowShadow(false);
  };

  // UseEffect para reiniciar el estado del botón de inicio de sesión cuando se cierra la ventana
  useEffect(() => {
    setShowLogin(true);
    setShowShadow(true);
    setEmail(""); // Reiniciar los campos de email y contraseña
    setPassword("");
  }, [isLoggedIn]);

  return (
    <div>
      {showShadow && (
        <ShadowLogin>
          {showLogin && !isLoggedIn && !showRegister && (
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
                <ButtonRegister type="button" onClick={() => setShowRegister(true)}>
                  SIGN IN
                </ButtonRegister>
                <ButtonClose type="button" onClick={closeLogin}>
                  CLOSE
                </ButtonClose>
              </FormLogin>
            </DivLogin>
          )}

          {showRegister && (
            <Register onRegister={handleRegister} onClose={() => setShowRegister(false)} />
          )}

          {showWelcomeMessage && (
            <DivWelcome className="floating-message">
              Welcome, {loggedInUser && loggedInUser.firstName}!
            </DivWelcome>
          )}
        </ShadowLogin>
      )}
    </div>
  );
};

export default Login;

