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
          width={450}
          height={450}
          fontFamily="Arial"
          data={[
            {
              label: `Line Chart`,
              value: 1,
            },
            { label: "Line Chart Okay", value: 2 },
            { label: "Service Level Agreements", value: 3 },
            { label: "AGH", value: 4 },
            { label: "plsworkgoddamn", value: 5 },
          ]}
          showLegend={false}
          graph={{
            zoom: 1,
            offsetX: 2,
            offsety: 2,
          }}
          charsBeforeSplit={12}
        />
      </div>
    );
  }
}

export default App;
