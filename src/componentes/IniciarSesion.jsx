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

    const { user, pass } = this.state;

    axios
      .post("https://personas.ctpoba.edu.ar/api/ingresar", { user, pass })
      .then((response) => {
        const { token, user } = response.data;
        if (token) {
          this.props.onLogin(token, user);// Llama a la función onLogin del padre con el token y el usuario
          console.log("el token es", token)
        } else {
          this.setState({ error: "Credenciales inválidas" });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        this.setState({ error: "Error al iniciar sesión" });
      });
  };

  render() {
    const { user, pass, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            value={user}
            placeholder="Usuario"
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            value={pass}
            placeholder="Contraseña"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
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