import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class BubbleChart extends Component {
  constructor(props){
    super(props);

    this.renderChart = this.renderChart.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
    this.renderLegend = this.renderLegend.bind(this);
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
    } = this.props;
    // Reset the svg element to a empty state.
    this.svg.innerHTML = '';

    const bubblesWidth = width * .8;
    const legendWidth = width - bubblesWidth;
    const color = d3.scaleOrdinal(d3.schemeCategory20c);

    const pack = d3.pack()
        .size([bubblesWidth, height])
        .padding(0);

    // Process the data to have a hierarchy structure;
    const root = d3.hierarchy({children: data})
    .sum(function(d) { return d.value; })
    .sort(function(a, b) { return b.value - a.value; })
    .each((d) => {
      if(d.data.label) {
        d.label = d.data.label;
        d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
      }
    });

    // Pass the data to the pack layout to calculate the distribution.
    const nodes = pack(root).leaves();

    // Call to the function that draw the bubbles.
    this.renderBubbles(nodes, color);
    // Call to the function that draw the legend.
    this.renderLegend(legendWidth, height, bubblesWidth, nodes, color);
  }

  renderBubbles(nodes, color) {
    const {
      data,
      valueFont,
    } = this.props;
    const bubbleChart = d3.select(this.svg).append("g")
      .attr("class", "bubble-chart");

    const node = bubbleChart.selectAll(".node")
    .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
      .attr("id", function(d) { return d.id; })
      .attr("r", function(d) { return d.r - (d.r * .04); })
      .style("fill", function(d) { return d.data.color ? d.data.color : color(nodes.indexOf(d)); });

    node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.id; })
      .append("use")
      .attr("xlink:href", function(d) { return "#" + d.id; });

    node.append("text")
      .attr("class", "value-text")
      .style("font-size", `${valueFont.size}px`)
      .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
      .style("font-weight", (d) => {
        return valueFont.weight ? valueFont.weight : 600;
      })
      .style("font-family", valueFont.family)
      .style("fill", () => {
        return valueFont.color ? valueFont.color : '#000';
      })
      .text(function(d) { return d.value; });

    // Center the texts inside the circles.
    d3.selectAll(".value-text").attr("x", function(d) {
      const self = d3.select(this);
      const width = self.node().getBBox().width;
      return -(width/2);
    })
    .attr("y", function(d) {
      return (valueFont.size/3);
    })

    node.append("title")
      .text(function(d) { return d.label; });
  }

  renderLegend(width, height, offset, nodes, color) {
    const {
      data,
      legendFont,
    } = this.props;
    const bubble = d3.select('.bubble-chart');
    const bubbleHeight = bubble.node().getBBox().height;

    const legend = d3.select(this.svg).append("g")
      .attr("transform", function() { return `translate(${offset},${(height - bubbleHeight)/2})`; })
      .attr("class", "legend");

    let textOffset = 0;
    const texts = legend.selectAll(".legend-text")
    .data(nodes)
    .enter()
    .append("g")
      .attr("transform", (d, i) => {
        const offset = textOffset;
        textOffset+= legendFont.size + 10;
        return `translate(0,${offset})`;
      });

    texts.append("rect")
      .attr("width", legendFont.size)
      .attr("height", legendFont.size)
      .attr("x", 0)
      .attr("y", -legendFont.size)
      .style("fill", function(d) { return d.data.color ? d.data.color : color(nodes.indexOf(d)); });

    texts.append("text")
      .style("font-size", `${legendFont.size}px`)
      .style("font-weight", (d) => {
        return legendFont.weight ? legendFont.weight : 600;
      })
      .style("font-family", legendFont.family)
      .style("fill", () => {
        return legendFont.color ? legendFont.color : '#000';
      })
      .attr("x", (d) => { return legendFont.size + 10 })
      .attr("y", 0)
      .text((d) => { return d.label });
  }
}

BubbleChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  legendFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
  valueFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
}
BubbleChart.defaultProps = {
  width: 1000,
  height: 800,
  legendFont: {
    family: 'Arial',
    size: 12,
    color: '#000',
    weight: 'bold',
  },
  valueFont: {
    family: 'Arial',
    size: 24,
    color: '#fff',
    weight: 'bold',
  },
}
