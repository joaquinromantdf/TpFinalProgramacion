import React, { Component } from "react";
import axios from "axios";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
    error: null
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("https://personas.ctpoba.edu.ar/api/personas", {
        headers: { Authorization: this.props.token }, 
        personas: [ persona_id, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail ] }
      )
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
        if (response.data && response.data.personas) {
          this.setState({
            personas: response.data.personas
          });
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
      console.log("Estado actualizado:", this.state.personas);
    });
  };

  render() {
    const { token } = this.props;
    const { personas } = this.state;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        <AgregarPersona token={token} onPersonaAgregada={this.agregarPersona}/>
        <ListaPersonas personas={personas}/>
      </div>
    );
  }
}