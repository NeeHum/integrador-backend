import React, { useState } from "react";
import axios from "axios";
import {
  ButtonCancelRegister,
  ButtonRegisterOk,
  DivRegister,
  FormRegister,
  InputRegister,
  ShadowRegister,
} from "./RegisterStyled";

const Register = ({ onClose, onRegister }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "https://backend-integradorbackend.vercel.app/api/usuarios",
        user
      );
      console.log("Usuario registrado:", response.data);
      onRegister(response.data.firstName); // Llama a la función onRegister con el nombre del usuario
      // Realiza alguna acción adicional aquí, como cerrar el componente de registro o redirigir.
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Maneja el error de alguna manera adecuada, como mostrar un mensaje de error.
    }
  };

  const handleCancel = () => {
    onClose(); // Cerrar la ventana flotante y volver al componente Login
  };

  return (
    <ShadowRegister>
      <DivRegister>
        <FormRegister onSubmit={handleSubmit}>
          <label htmlFor="firstName">FIRST NAME</label>
          <InputRegister
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastName">LAST NAME</label>
          <InputRegister
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="email">EMAIL</label>
          <InputRegister
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">PASSWORD</label>
          <InputRegister
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <ButtonRegisterOk type="submit">REGISTER</ButtonRegisterOk>
          <ButtonCancelRegister type="button" onClick={handleCancel}>
            CANCEL
          </ButtonCancelRegister>
        </FormRegister>
      </DivRegister>
    </ShadowRegister>
  );
};

export default Register;
