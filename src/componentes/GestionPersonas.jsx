import React, { Component } from "react";
import axios from "axios";
import ListaPersonas from "./ListaPersonas";
import AgregarPersona from "./AgregarPersona";

export default class GestionPersonas extends Component {
  state = {
    personas: [],
  };

  componentDidMount() {
    this.fetchPersonas();
  }

  fetchPersonas = () => {
    const { token } = this.props;
    axios
      .get("https://personas.ctpoba.edu.ar/api/personas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({ personas: response.data });
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  };

  onPersonaAgregada = (persona) => {
    this.setState((prevState) => ({
      personas: [...prevState.personas, persona],
    }));
  };

  render() {
    const { token } = this.props;
    const { personas } = this.state;

    return (
      <div>
        <h2>Gestionar Personas</h2>
        <AgregarPersona token={token} onPersonaAgregada={this.onPersonaAgregada} />
        <ListaPersonas personas={personas} />
      </div>
    );
  }
}