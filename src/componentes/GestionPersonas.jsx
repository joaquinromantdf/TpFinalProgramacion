import React, { Component } from "react";
import axios from "axios";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
    error: null
  };

  componentDidMount() {
    this.cargarPersonas();
  }

  cargarPersonas = () => {
    axios.get("https://personas.ctpoba.edu.ar/api/personas", {
      headers: { Authorization: this.props.token }
    })
    .then((response) => {
      console.log("Respuesta de la API:", response.data);
      if (response.data && response.data.personas) {
        this.setState({ personas: response.data.personas });
      } else {
        console.error("Respuesta de la API no contiene personas.");
      }
    })
    .catch((error) => {
      console.error("Error mostrando personas:", error);
      this.setState({ error: error.message });
    });
  };

  agregarPersona = (persona) => {
    console.log("Persona agregada al estado:", persona);
    this.setState((prevState) => ({
      personas: [...prevState.personas, persona]
    }), () => {
      console.log("Estado actualizado después de agregar:", this.state.personas);
    });
  };

  eliminarPersona = (persona_id) => {
    console.log("ID de persona para eliminar:", persona_id); // Verifica que el ID no sea undefined
    axios.delete(`https://personas.ctpoba.edu.ar/api/personas/${persona_id}`, {
      headers: { Authorization: this.props.token }
    })
    .then(response => {
      console.log("Respuesta de la API:", response);
      if (response.status === 200) { // Verifica que el estado sea 200 OK
        console.log("Persona eliminada:", persona_id);
        this.setState((prevState) => ({
          personas: prevState.personas.filter(persona => persona.persona_id !== persona_id)
        }), () => {
          console.log("Estado actualizado después de eliminar:", this.state.personas);
        });
      } else {
        console.error("La eliminación no fue exitosa. Código de estado:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error eliminando persona:", error);
      this.setState({ error: error.message });
    });
  };  
  
  render() {
    const { token } = this.props;
    const { personas, error } = this.state;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <AgregarPersona token={token} onPersonaAgregada={this.agregarPersona} />
        <ListaPersonas personas={personas} onEliminarPersona={this.eliminarPersona} />
      </div>
    );
  }
}