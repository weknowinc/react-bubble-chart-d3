import React, { Component } from "react";
import logo from "./logo.svg";

import BubbleChart from "react-bubble-chart-d3";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1 className="App-intro">
          Example of 'react-bubble-chart-d3' Component.
        </h1>
        <br />
        <BubbleChart
          width={500}
          height={500}
          fontFamily="Arial"
          data={[
            { label: "CRM", value: 1 },
            { label: "API", value: 2 },
            { label: "Data", value: 3 },
            { label: "Commerce", value: 4 },
            { label: "AI", value: 5 },
          ]}
          showLegend={false}
          overflow={true}
          graph={{
            zoom: 0.8,
            offsetX: 2,
            offsety: 2,
          }}
        />
      </div>
    );
  }
}

export default App;
