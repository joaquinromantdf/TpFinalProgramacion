import React, { Component } from "react";
import axios from "axios";

export default class EliminarPersona extends Component {
  eliminarPersona = () => {
    const { persona, token, onPersonaEliminada } = this.props;
    const id = persona._id;

    console.log("id de la persona a eliminar:", id); // verificar ID

    axios.delete("https://personas.ctpoba.edu.ar/api/personas", {
      headers: { Authorization: token },
      params: { id }  // asegurar de que persona_id esté en los params
    })
      .then((response) => {
        console.log("Respuesta de la API:", response);
        if (response.data.status === "success") {
          onPersonaEliminada(id); // notificar al componente padre
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