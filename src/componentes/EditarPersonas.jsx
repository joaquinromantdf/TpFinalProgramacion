import React, { Component } from "react";
import axios from "axios";

export default class EditarPersona extends Component {
  constructor(props) {
    super(props);
    // Estado inicial con los datos de la persona
    this.state = {
      documento: props.persona.documento || "",
      nombres: props.persona.nombres || "",
      apellidos: props.persona.apellidos || "",
      fechaNac: props.persona.fechaNac || "",
      telefono: props.persona.telefono || "",
      domicilio: props.persona.domicilio || "",
      mail: props.persona.mail || "",
      error: null,
    };
  }

  // Maneja los cambios en los campos del formulario
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Envía la solicitud PUT para actualizar la persona
  handleSubmit = (e) => {
    e.preventDefault();

    // Datos actualizados de la persona desde el estado
    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail } = this.state;

    // ID de la persona
    const { persona_id } = this.props.persona;

    // URL para actualizar la persona específica usando su ID
    const url = `/api/personas/${persona_id}`;

    // Token de autorización para la API
    const headers = { Authorization: `Bearer ${this.props.token}` };

    // Solicitud PUT usando Axios
    axios.put(url, { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail }, { headers })
      .then(response => {
        console.log("Persona actualizada:", response.data);
        // Llama a la función proporcionada por el padre para manejar la actualización
        this.props.onPersonaActualizada();
      })
      .catch(error => {
        console.error("Error al actualizar persona:", error);
        this.setState({ error: error.message });
      });
  };

  render() {
    const { documento, nombres, apellidos, fechaNac, telefono, domicilio, mail, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Documento:</label>
          <input type="text" name="documento" value={documento} onChange={this.handleChange} />
        </div>
        <div>
          <label>Nombres:</label>
          <input type="text" name="nombres" value={nombres} onChange={this.handleChange} />
        </div>
        <div>
          <label>Apellidos:</label>
          <input type="text" name="apellidos" value={apellidos} onChange={this.handleChange} />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="fechaNac" value={fechaNac} onChange={this.handleChange} />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={telefono} onChange={this.handleChange} />
        </div>
        <div>
          <label>Domicilio:</label>
          <input type="text" name="domicilio" value={domicilio} onChange={this.handleChange} />
        </div>
        <div>
          <label>Mail:</label>
          <input type="email" name="mail" value={mail} onChange={this.handleChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Actualizar Persona</button>
      </form>
    );
  }
}