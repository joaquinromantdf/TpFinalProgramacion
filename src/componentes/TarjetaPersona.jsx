import React, { Component } from "react";
import EliminarPersona from "./EliminarPersona";

export default class TarjetaPersona extends Component {
  render() {
    const { persona, token, onPersonaEliminada } = this.props;
    return (
      <div className="tarjeta">
        <p>Nombre: {persona.nombres}</p>
        <p>Apellido: {persona.apellidos}</p>
        <p>DNI: {persona.documento}</p>
        <p>Fecha de Nacimiento: {persona.fechaNac}</p>
        <p>Teléfono: {persona.telefono}</p>
        <p>Domicilio: {persona.domicilio}</p>
        <p>Email: {persona.mail}</p>
        <EliminarPersona 
          persona_id={persona.persona_id}
          token={token}
          onPersonaEliminada={onPersonaEliminada}
        />
      </div>
    );
  }
}