import React, { Component } from "react";
import logo from "./logo.svg";

import BubbleChart from "react-bubble-chart-d3";

import "./App.css";

const chartColors = [
  "#FF5733",
  "#3498DB",
  "#2ECC71",
  "#FFC300",
  "#9B59B6",
  "#E74C3C",
  "#5dabd8",
  "#F66D44",

  "#FEAE65",
  "#E6F69D",
  "#2D87BB",
  "#f8987c",
  "#5dabd8",
  "#FEAE65",
  "#AADEA7",
  "#64C2A6",
];
const imageUrl =
  "https://surveys-temp-data.s3.af-south-1.amazonaws.com/s001_loreal_ppd_initial/images/logos/tcb_naturals.png";

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
          width={800}
          height={800}
          fontFamily="Arial"
          valueFont={{
            size: 12,
            color: "#000",
            weight: "bold",
          }}
          labelFont={{
            size: 13,
            color: "#000",
            weight: "bold",
          }}
          data={[
            {
              label: "CRM",
              value: 1,
              color: chartColors[0],
              imageUrl: imageUrl,
            },
            {
              label: "API",
              value: 1,
              color: chartColors[1],
              imageUrl: imageUrl,
            },
            {
              label: "Data",
              value: 1,
              color: chartColors[2],
              imageUrl: imageUrl,
            },
            {
              label: "Commerce",
              value: 1,
              color: chartColors[3],
              imageUrl: imageUrl,
            },
            {
              label: "AI",
              value: 3,
              color: chartColors[4],
              imageUrl: imageUrl,
            },
            {
              label: "Management",
              value: 5,
              color: chartColors[5],
              imageUrl: imageUrl,
            },
            {
              label: "Testing",
              value: 6,
              color: chartColors[6],
              imageUrl: imageUrl,
            },
            {
              label: "Mobile",
              value: 9,
              color: chartColors[7],
              imageUrl: imageUrl,
            },
            {
              label: "Conversion",
              value: 9,
              color: chartColors[8],
              imageUrl: imageUrl,
            },
            {
              label: "Misc",
              value: 21,
              color: chartColors[9],
              imageUrl: imageUrl,
            },
            {
              label: "Databases",
              value: 22,
              color: chartColors[10],
              imageUrl: imageUrl,
            },
            {
              label: "DevOps",
              value: 22,
              color: chartColors[11],
              imageUrl: imageUrl,
            },
            {
              label: "Javascript",
              value: 23,
              color: chartColors[12],
              imageUrl: imageUrl,
            },
            {
              label: "Languages / Frameworks",
              value: 25,
              color: chartColors[13],
              imageUrl: imageUrl,
            },
            {
              label: "Front End",
              value: 26,
              color: chartColors[14],
              imageUrl: imageUrl,
            },
            {
              label: "Content",
              value: 26,
              color: chartColors[15],
              imageUrl: imageUrl,
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
