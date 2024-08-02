import React, { Component } from "react";
import axios from "axios";

export default class EliminarPersona extends Component {
  eliminarPersona = () => {
    const { persona_id, token, onPersonaEliminada } = this.props;

    console.log("id de la persona a eliminar:", persona_id); // Verifica el ID

    if (!persona_id) {
      console.error("el id de la persona no está disponible");
      return;
    }

    axios.delete("https://personas.ctpoba.edu.ar/api/personas", {
      headers: { Authorization: token },
      params: { persona_id }  // Asegúrate de que persona_id esté en los params
    })
    .then((response) => {
      console.log("Respuesta de la API:", response.data); // Para depuración
      if (response.data && response.data.status === "success") {
        onPersonaEliminada(persona_id); // Notificar al componente padre
      } else {
        console.error("Error al eliminar la persona:", response.data);
      }
    })
    .catch((error) => {
      console.error("Error al eliminar la persona:", error);
    });
  };

  render() {
    return (
      <button onClick={this.eliminarPersona}>
        Eliminar
      </button>
    );
  }
}