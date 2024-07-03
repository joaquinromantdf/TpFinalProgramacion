import React, { Component } from "react";
import Registro from "./componentes/Registro";
import IniciarSesion from "./componentes/IniciarSesion";
import GestionPersonas from "./componentes/GestionPersonas";

class App extends Component {
  state = {
    vista: "iniciarSesion", // 'iniciarSesion', 'registro', 'gestionPersonas'
    token: null,
  };

  cambiarVista = (vista) => {
    this.setState({ vista });
  };

  onLogin = (token) => {
    this.setState({ token, vista: "gestionPersonas" });
  };

  onLogout = () => {
    this.setState({ token: null, vista: "iniciarSesion" });
  };

  render() {
    const {vista} = this.state;
    return (
      <div>
        {vista === "registro" && (
          <Registro cambiarVista={this.cambiarVista} />
        )}
        {vista === "iniciarSesion" && (
          <IniciarSesion
            cambiarVista={this.cambiarVista}
            onLogin={this.onLogin}
          />
        )}
        {vista === "gestionPersonas" && (
          <div>
            <h1>Bienvenido</h1>
            <button onClick={this.onLogout}>Cerrar Sesión</button>
            <GestionPersonas token={this.state.token} />
          </div>
        )}
      </div>
    );
  }
}

export default App;