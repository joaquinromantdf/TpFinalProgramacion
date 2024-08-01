import React, { Component } from "react";
import axios from "axios";

export default class AgregarPersona extends Component {
  state = {
    nombres: "",
    apellidos: "",
    documento: "",
    fechaNac: "",
    telefono: "",
    domicilio: "",
    mail: "",
    error: null
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail } = this.state;
    const nuevaPersona = { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail };

    axios.post("https://personas.ctpoba.edu.ar/api/personas", nuevaPersona, {
      headers: { Authorization: this.props.token }
    })
    .then(response => {
      console.log("Respuesta de la API al agregar persona:", response.data);
      if (response.data && response.data.persona_id) {
        const personaAgregada = {
          ...nuevaPersona,
          id: response.data.persona_id
        };
        this.props.onPersonaAgregada(personaAgregada);
        this.setState({
          nombres: "",
          apellidos: "",
          documento: "",
          fechaNac: "",
          telefono: "",
          domicilio: "",
          mail: "",
          error: null
        });
      } else {
        console.error("Respuesta de la API no contiene persona_id.");
      }
    })
    .catch(error => {
      console.error("Error agregando persona:", error);
      this.setState({ error: error.message });
    });
  };

  render() {
    const { nombres, apellidos, documento, fechaNac, telefono, domicilio, mail, error } = this.state;

    return (
      <div>
        <h2>Agregar Persona</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="nombres" value={nombres} onChange={this.handleChange} placeholder="Nombres" required />
          <input type="text" name="apellidos" value={apellidos} onChange={this.handleChange} placeholder="Apellidos" required />
          <input type="text" name="documento" value={documento} onChange={this.handleChange} placeholder="DNI" required />
          <input type="date" name="fechaNac" value={fechaNac} onChange={this.handleChange} placeholder="Fecha de Nacimiento" required />
          <input type="text" name="telefono" value={telefono} onChange={this.handleChange} placeholder="Teléfono" required />
          <input type="text" name="domicilio" value={domicilio} onChange={this.handleChange} placeholder="Domicilio" required />
          <input type="email" name="mail" value={mail} onChange={this.handleChange} placeholder="Email" required />
          <button type="submit">Agregar Persona</button>
        </form>
      </div>
    );
  }
}