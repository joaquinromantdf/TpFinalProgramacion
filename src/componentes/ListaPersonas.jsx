import React, { Component } from "react";

export default class ListaPersonas extends Component {
  state = {
    personas: []
  };
  render() {
    const { personas } = this.props;
  
    if (!Array.isArray(personas) || personas.length === 0) {
      return <p>No hay personas registradas.</p>;
    }
  
    return (
      <div>
        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona, index) => (
            <li key={persona.id || index}>
              {persona.nombres} {persona.apellidos}
            </li>
          ))}
        </ul>
      </div>
    );
  }  
}