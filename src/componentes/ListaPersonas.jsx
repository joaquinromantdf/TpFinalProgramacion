import React, { Component } from "react";

export default class ListaPersonas extends Component {
  render() {
    const { personas } = this.props;

    if (!personas || personas.length === 0) {
      return <p>No hay personas registradas.</p>;
    }

    return (
      <div>
        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona, index) => (
            <li key={persona._id || index}>
              {persona.nombres} {persona.apellidos} - {persona.documento}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}