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

    const { user, pass, nombres, apellidos, documento } = this.state;

    // Enviar datos al servidor
    axios
      .post("https://personas.ctpoba.edu.ar/api/registrar", {
        user,
        pass,
        nombres,
        apellidos,
        documento,
      })
      .then((response) => {
        console.log("Respuesta de la API:", response.data); // Depura para ver la respuesta de la API
        // Manejar la respuesta según sea necesario, por ejemplo, redirigir o mostrar un mensaje de éxito
        alert("Usuario registrado exitosamente");
        // Reiniciar el estado del formulario
        this.setState({
          user: "",
          pass: "",
          nombres: "",
          apellidos: "",
          documento: "",
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { user, pass, nombres, apellidos, documento, error } = this.state;

    return (
      <div>
        <h2>Registro de Usuario</h2>
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
          <input
            type="text"
            name="nombres"
            value={nombres}
            placeholder="Nombres"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            value={apellidos}
            placeholder="Apellidos"
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="documento"
            value={documento}
            placeholder="Documento"
            onChange={this.handleChange}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
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