import React, { Component } from "react";
import Registro from "./componentes/Registro";
import IniciarSesion from "./componentes/IniciarSesion";
import GestionPersonas from "./componentes/GestionPersonas";

class App extends Component {
  state = {
    vista: "iniciarSesion", // 'iniciarSesion', 'registro', 'gestionPersonas'
    token: null,
    user: null,
  };

  cambiarVista = (vista) => {
    this.setState({ vista });
  };

  onLogin = (token, user) => {
    this.setState({ token, user, vista: "gestionPersonas" });
  };

  onLogout = () => {
    this.setState({ token: null, user: null, vista: "iniciarSesion" });
  };

  render() {
    const { vista, token, user } = this.state;

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
            <h1>Bienvenido, {user}</h1>
            <button onClick={this.onLogout}>Cerrar Sesión</button>
            <GestionPersonas token={token} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
