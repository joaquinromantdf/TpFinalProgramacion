import React, { Component } from "react";
import axios from "axios";

export default class Registro extends Component {
  state = {
    user: "",
    pass: "",
    nombres: "",
    apellidos: "",
    documento: "",
    error: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", this.state); // Añade este mensaje de depuración
    axios
      .post("https://personas.ctpoba.edu.ar/api/registrar", this.state)
      .then((response) => {
        console.log("Respuesta de la API:", response.data); // Añade este mensaje de depuración
        // manejar respuesta, posiblemente iniciar sesión automáticamente
        this.props.cambiarVista("iniciarSesion");
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="Usuario"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="documento"
            placeholder="Documento"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <p>
          ¿Ya tienes cuenta?{" "}
          <a href="#" onClick={() => this.props.cambiarVista("iniciarSesion")}>
            Inicia Sesión
          </a>
        </p>
      </div>
    );
  }
}