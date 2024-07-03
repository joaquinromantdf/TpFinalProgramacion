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
        {/* Componente para agregar persona */}
        <AgregarPersona token={token} onPersonaAgregada={this.agregarPersona} />
        {/* Componente para mostrar lista de personas */}
        <ListaPersonas personas={personas} />
      </div>
    );
  }
}