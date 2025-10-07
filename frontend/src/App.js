// src/App.js
import React, { Component } from "react";
import { createActor } from "xstate";
import { navigationMachine } from "./state_machines/navigation";

import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: "screen1",
    };

    this.actor = createActor(navigationMachine);

    this.actor.subscribe((snapshot) => {
      const newScreen = snapshot.value;
      if (newScreen !== this.state.currentScreen) {
        this.setState({ currentScreen: newScreen });
      }
    });

    this.actor.start();
  }

  send = (event) => {
    this.actor.send({ type: event });
  };

  renderScreen() {
    const { currentScreen } = this.state;

    const screens = {
      screen1: <Page1 send={this.send} />,
      screen2: <Page2 send={this.send} />,
      screen3: <Page3 send={this.send} />,
      screen4: <Page4 send={this.send} />,
      screen5: <Page5 send={this.send} />,
      screen6: <Page6 send={this.send} />,
    };

    return screens[currentScreen] || <Page1 send={this.send} />;
  }

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Aplikacja 6 ekranów z XState 5 (bez hooków)</h2>
        {this.renderScreen()}
      </div>
    );
  }
}

export default App;
