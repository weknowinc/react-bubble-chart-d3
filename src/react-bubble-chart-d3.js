import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class BubbleChart extends Component {
  constructor(props){
    super(props);

    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.svg = ReactDOM.findDOMNode(this);
    this.renderChart();
  }

  componentDidUpdate() {
    const {
      width,
      height,
    } = this.props;
    if(width !== 0 && height !== 0) {
      this.renderChart();
    }
  }

  render() {
    const {
      width,
      height,
    } = this.props;
    return (
      <svg width={width} height={height} />
    )
  }

  renderChart() {
    const {
      data,
      height,
      width,
      fontFamily,
    } = this.props;
    const fontSize = (width < height ? width * 0.015 : height * 0.015);
    // Reset the svg element to a empty state.
    this.svg.innerHTML = '';

    const bubbleChart = d3.select(this.svg).append("g")
      .attr("class", "bubble-chart");

    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    const pack = d3.pack()
        .size([width, height])
        .padding(.5);

    const root = d3.hierarchy({children: data})
    .sum(function(d) { return d.value + (d.value * .16); })
    .sort(function(a, b) { return b.value - a.value; })
    .each((d) => {
      if(d.data.label) {
        d.label = d.data.label;
        d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
      }
    });
    const nodes = pack(root).leaves();
    const node = bubbleChart.selectAll(".node")
    .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r - (d.r * .08); })
      .style("fill", function(d) { return d.data.color ? d.data.color : color(nodes.indexOf(d)); });

    node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

    node.append("text")
      .style("font-size", `${fontSize}px`)
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .selectAll("tspan")
      .data(function(d) { return d.label.trim().split(/ /g); })
      .enter().append("tspan")
        .style("font-weight", "bold")
        .style("font-family", fontFamily)
        .attr("x", function(d, i, nodes) {
          return -(d.trim().length * (fontSize/2))/2;
        })
        .attr("y", function(d, i, nodes) {
          return (i * fontSize + 3);
        })
        .text(function(d) { return d.trim(); });
    node.append("title")
      .text(function(d) { return d.label; });

  }
}

BubbleChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontFamily: PropTypes.string,
}
BubbleChart.defaultProps = {
  width: 400,
  height: 400,
  fontFamily: 'Arial',
}
