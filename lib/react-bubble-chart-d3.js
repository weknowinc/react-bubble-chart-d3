'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BubbleChart = function (_Component) {
  _inherits(BubbleChart, _Component);

  function BubbleChart(props) {
    _classCallCheck(this, BubbleChart);

    var _this = _possibleConstructorReturn(this, (BubbleChart.__proto__ || Object.getPrototypeOf(BubbleChart)).call(this, props));

    _this.renderChart = _this.renderChart.bind(_this);
    _this.renderBubbles = _this.renderBubbles.bind(_this);
    _this.renderLegend = _this.renderLegend.bind(_this);
    return _this;
  }

  _createClass(BubbleChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.svg = _reactDom2.default.findDOMNode(this);
      this.renderChart();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _props = this.props,
          width = _props.width,
          height = _props.height;

      if (width !== 0 && height !== 0) {
        this.renderChart();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height;

      return _react2.default.createElement('svg', { width: width, height: height });
    }
  }, {
    key: 'renderChart',
    value: function renderChart() {
      var _props3 = this.props,
          graph = _props3.graph,
          data = _props3.data,
          height = _props3.height,
          width = _props3.width,
          showLegend = _props3.showLegend,
          legendPercentage = _props3.legendPercentage;
      // Reset the svg element to a empty state.

      this.svg.innerHTML = '';

      var bubblesWidth = showLegend ? width * (1 - legendPercentage / 100) : width;
      var legendWidth = width - bubblesWidth;
      var color = d3.scaleOrdinal(d3.schemeCategory20c);

      var pack = d3.pack().size([bubblesWidth * graph.zoom, bubblesWidth * graph.zoom]).padding(0);

      // Process the data to have a hierarchy structure;
      var root = d3.hierarchy({ children: data }).sum(function (d) {
        return d.value;
      }).sort(function (a, b) {
        return b.value - a.value;
      }).each(function (d) {
        if (d.data.label) {
          d.label = d.data.label;
          d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
        }
      });

      // Pass the data to the pack layout to calculate the distribution.
      var nodes = pack(root).leaves();

      // Call to the function that draw the bubbles.
      this.renderBubbles(bubblesWidth, nodes, color);
      // Call to the function that draw the legend.
      if (showLegend) {
        this.renderLegend(legendWidth, height, bubblesWidth, nodes, color);
      }
    }
  }, {
    key: 'renderBubbles',
    value: function renderBubbles(width, nodes, color) {
      var _props4 = this.props,
          graph = _props4.graph,
          data = _props4.data,
          bubbleClickFun = _props4.bubbleClickFun,
          valueFont = _props4.valueFont,
          labelFont = _props4.labelFont;


      var bubbleChart = d3.select(this.svg).append("g").attr("class", "bubble-chart").attr("transform", function (d) {
        return "translate(" + width * graph.offsetX + "," + width * graph.offsetY + ")";
      });;

      var node = bubbleChart.selectAll(".node").data(nodes).enter().append("g").attr("class", "node").attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
      on("click", function (d) {
        bubbleClickFun(d.label);
      });

      node.append("circle").attr("id", function (d) {
        return d.id;
      }).attr("r", function (d) {
        return d.r - d.r * .04;
      }).style("fill", function (d) {
        return d.data.color ? d.data.color : color(nodes.indexOf(d));
      }).style("z-index", 1).on('mouseover', function (d) {
        d3.select(this).attr("r", d.r * 1.04);
      }).on('mouseout', function (d) {
        var r = d.r - d.r * 0.04;
        d3.select(this).attr("r", r);
      });

      node.append("clipPath").attr("id", function (d) {
        return "clip-" + d.id;
      }).append("use").attr("xlink:href", function (d) {
        return "#" + d.id;
      });

      node.append("text").attr("class", "value-text").style("font-size", valueFont.size + 'px').attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      }).style("font-weight", function (d) {
        return valueFont.weight ? valueFont.weight : 600;
      }).style("font-family", valueFont.family).style("fill", function () {
        return valueFont.color ? valueFont.color : '#000';
      }).style("stroke", function () {
        return valueFont.lineColor ? valueFont.lineColor : '#000';
      }).style("stroke-width", function () {
        return valueFont.lineWeight ? valueFont.lineWeight : 0;
      }).text(function (d) {
        return d.value;
      });

      node.append("text").attr("class", "label-text").style("font-size", labelFont.size + 'px').attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      }).style("font-weight", function (d) {
        return labelFont.weight ? labelFont.weight : 600;
      }).style("font-family", labelFont.family).style("fill", function () {
        return labelFont.color ? labelFont.color : '#000';
      }).style("stroke", function () {
        return labelFont.lineColor ? labelFont.lineColor : '#000';
      }).style("stroke-width", function () {
        return labelFont.lineWeight ? labelFont.lineWeight : 0;
      }).text(function (d) {
        return d.label;
      });

      // Center the texts inside the circles.
      d3.selectAll(".label-text").attr("x", function (d) {
        var self = d3.select(this);
        var width = self.node().getBBox().width;
        return -(width / 2);
      }).style("opacity", function (d) {
        var self = d3.select(this);
        var width = self.node().getBBox().width;
        d.hideLabel = width * 1.05 > d.r * 2;
        return d.hideLabel ? 0 : 1;
      }).attr("y", function (d) {
        return labelFont.size / 2;
      });

      // Center the texts inside the circles.
      d3.selectAll(".value-text").attr("x", function (d) {
        var self = d3.select(this);
        var width = self.node().getBBox().width;
        return -(width / 2);
      }).attr("y", function (d) {
        if (d.hideLabel) {
          return valueFont.size / 3;
        } else {
          return -valueFont.size * 0.5;
        }
      });

      node.append("title").text(function (d) {
        return d.label;
      });
    }
  }, {
    key: 'renderLegend',
    value: function renderLegend(width, height, offset, nodes, color) {
      var _props5 = this.props,
          data = _props5.data,
          legendClickFun = _props5.legendClickFun,
          legendFont = _props5.legendFont;

      var bubble = d3.select('.bubble-chart');
      var bubbleHeight = bubble.node().getBBox().height;

      var legend = d3.select(this.svg).append("g").attr("transform", function () {
        return 'translate(' + offset + ',' + bubbleHeight * 0.05 + ')';
      }).attr("class", "legend");

      var textOffset = 0;
      var texts = legend.selectAll(".legend-text").data(nodes).enter().append("g").attr("transform", function (d, i) {
        var offset = textOffset;
        textOffset += legendFont.size + 10;
        return 'translate(0,' + offset + ')';
      }).on('mouseover', function (d) {
        d3.select('#' + d.id).attr("r", d.r * 1.04);
      }).on('mouseout', function (d) {
        var r = d.r - d.r * 0.04;
        d3.select('#' + d.id).attr("r", r);
      }).on("click", function (d) {
        legendClickFun(d.label);
      });;

      texts.append("rect").attr("width", 30).attr("height", legendFont.size).attr("x", 0).attr("y", -legendFont.size).style("fill", "transparent");

      texts.append("rect").attr("width", legendFont.size).attr("height", legendFont.size).attr("x", 0).attr("y", -legendFont.size).style("fill", function (d) {
        return d.data.color ? d.data.color : color(nodes.indexOf(d));
      });

      texts.append("text").style("font-size", legendFont.size + 'px').style("font-weight", function (d) {
        return legendFont.weight ? legendFont.weight : 600;
      }).style("font-family", legendFont.family).style("fill", function () {
        return legendFont.color ? legendFont.color : '#000';
      }).style("stroke", function () {
        return legendFont.lineColor ? legendFont.lineColor : '#000';
      }).style("stroke-width", function () {
        return legendFont.lineWeight ? legendFont.lineWeight : 0;
      }).attr("x", function (d) {
        return legendFont.size + 10;
      }).attr("y", 0).text(function (d) {
        return d.label;
      });
    }
  }]);

  return BubbleChart;
}(_react.Component);

exports.default = BubbleChart;


BubbleChart.propTypes = {
  graph: _propTypes2.default.shape({
    zoom: _propTypes2.default.number,
    offsetX: _propTypes2.default.number,
    offsetY: _propTypes2.default.number
  }),
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  showLegend: _propTypes2.default.bool,
  legendPercentage: _propTypes2.default.number,
  legendFont: _propTypes2.default.shape({
    family: _propTypes2.default.string,
    size: _propTypes2.default.number,
    color: _propTypes2.default.string,
    weight: _propTypes2.default.string
  }),
  valueFont: _propTypes2.default.shape({
    family: _propTypes2.default.string,
    size: _propTypes2.default.number,
    color: _propTypes2.default.string,
    weight: _propTypes2.default.string
  }),
  labelFont: _propTypes2.default.shape({
    family: _propTypes2.default.string,
    size: _propTypes2.default.number,
    color: _propTypes2.default.string,
    weight: _propTypes2.default.string
  })
};
BubbleChart.defaultProps = {
  graph: {
    zoom: 1.1,
    offsetX: -0.05,
    offsetY: -0.01
  },
  width: 1000,
  height: 800,
  showLegend: true,
  legendPercentage: 20,
  legendFont: {
    family: 'Arial',
    size: 12,
    color: '#000',
    weight: 'bold'
  },
  valueFont: {
    family: 'Arial',
    size: 16,
    color: '#fff',
    weight: 'bold'
  },
  labelFont: {
    family: 'Arial',
    size: 11,
    color: '#fff',
    weight: 'normal'
  },
  bubbleClickFun: function bubbleClickFun(label) {
    console.log('Bubble ' + label + ' is clicked ...', n);
  },
  legendClickFun: function legendClickFun(label) {
    console.log('Legend ' + label + ' is clicked ...', n);
  }
};