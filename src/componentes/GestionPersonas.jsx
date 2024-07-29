import React, { Component } from "react";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: []
  };

  agregarPersona = (persona) => {
    console.log("Persona agregada al estado:", persona); // Añadir esta línea para depuración
    this.setState((prevState) => ({
      personas: [...prevState.personas, persona]
    }), () => {
      console.log("Estado actualizado:", this.state.personas); // Añadir esta línea para verificar el estado actualizado
    });
  };

  render() {
    const { token } = this.props;
    const { personas } = this.state;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        <AgregarPersona token={token} onPersonaAgregada={this.agregarPersona} />
        <ListaPersonas personas={personas} />
      </div>
    );
  }
}
