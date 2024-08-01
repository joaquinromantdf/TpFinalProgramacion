import React, { Component } from "react";

export default class ListaPersonas extends Component {
  render() {
    const { personas } = this.props;

    console.log("Personas recibidas:", personas); // Para depuración

    if (!Array.isArray(personas) || personas.length === 0) {
      return <p>No hay personas registradas.</p>;
    }

    return (
      <div>
        <h2>Lista de Personas</h2>
        <ul>
          {personas.map((persona, index) => (
            <li key={persona.id || index}>
              <p>Nombre: {persona.nombres}</p> 
              <p>Apellido: {persona.apellidos}</p>
              <p>DNI: {persona.documento}</p>
              <p>Fecha de Nacimiento: {persona.fechaNac}</p>
              <p>Teléfono: {persona.telefono}</p>
              <p>Domicilio: {persona.domicilio}</p>
              <p>Email: {persona.mail}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}