import React, { Component } from "react";
import TarjetaPersona from "./TarjetaPersona";

export default class ListaPersonas extends Component {
  render() {
    const { personas, token, onPersonaEliminada } = this.props;

    console.log("Personas recibidas:", personas); 

    if (!Array.isArray(personas) || personas.length === 0) {
      return <p>No hay personas registradas.</p>;
    }

    return (
      <div>
        <h2>Lista de Personas</h2>
        <div className="lista-tarjetas">
          {personas.map((persona, index) => (
            <TarjetaPersona 
              key={persona.persona_id || index} 
              persona={persona} 
              token={token}
              onPersonaEliminada={onPersonaEliminada}
            />
          ))}
        </div>
      </div>
    );
  }
}