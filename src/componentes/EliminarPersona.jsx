import React, { Component } from "react";
import axios from "axios";

export default class EliminarPersona extends Component {
  state = {
    confirmacion: false,
    error: null,
    token: null
  };

  // Maneja la solicitud de eliminación
  handleEliminar = () => {
    const { persona_id, token, onPersonaEliminada } = this.props;
    const url = `https://personas.ctpoba.edu.ar/api/personas`;

    axios
      .delete(url, {
        headers: { Authorization: token },
        data: { persona_id: persona_id }, // Usa el nombre correcto del parámetro
      })
      .then(response => {
        console.log("Respuesta de la API:", response.data);
        if (response.data.status === "success") {
          onPersonaEliminada(persona_id); // Llama a la función proporcionada por el padre para actualizar la lista
        } else {
          this.setState({ error: "No se pudo eliminar la persona." });
        }
      })
      .catch(error => {
        console.error("Error al eliminar persona:", error);
        this.setState({ error: error.message });
      });
  };
  

  render() {
    const { error } = this.state;

    return (
      <div>
        <button onClick={this.handleEliminar}>Eliminar Persona</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
}