import React, { Component } from "react";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: []
  };

  agregarPersona = (persona) => {
    this.setState((prevState) => ({
      personas: [...prevState.personas, persona]
    }));
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