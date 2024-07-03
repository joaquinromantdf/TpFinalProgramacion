import React, { Component } from "react";
import axios from "axios";

export default class IniciarSesion extends Component {
  state = {
    user: "",
    pass: "",
    error: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://personas.ctpoba.edu.ar/api/ingresar", this.state)
      .then((response) => {
        console.log("Respuesta de la API:", response.data); // Añade este mensaje de depuración
        this.props.onLogin(response.data.token, response.data.user);
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
          <button type="submit">Iniciar Sesión</button>
        </form>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <p>
          ¿No tienes cuenta?{" "}
          <a href="#" onClick={() => this.props.cambiarVista("registro")}>
            Regístrate
          </a>
        </p>
      </div>
    );
  }
}