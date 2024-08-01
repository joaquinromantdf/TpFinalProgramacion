import React from "react";

const TarjetaPersona = ({ persona }) => (
  <div className="tarjeta">
    <p>Nombre: {persona.nombres}</p>
    <p>Apellido: {persona.apellidos}</p>
    <p>DNI: {persona.documento}</p>
    <p>Fecha de Nacimiento: {persona.fechaNac}</p>
    <p>Teléfono: {persona.telefono}</p>
    <p>Domicilio: {persona.domicilio}</p>
    <p>Email: {persona.mail}</p>
  </div>
);

export default TarjetaPersona;
