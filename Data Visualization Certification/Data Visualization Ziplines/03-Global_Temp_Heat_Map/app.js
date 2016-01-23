
var dataUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

// Graph display vars
var margin = {top: 20, right: 20, bottom: 20, left: 20};
var padding = {top: 80, right: 30, bottom: 100, left: 80};
var outerWidth = 1200, outerHeight = 650;
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;
var width = innerWidth - padding.left - padding.right;
var height = innerHeight - padding.top - padding.bottom;
var axisLabelsOffs = {top: 45, left: 15};
var legendPos = {rectX: 30, rectY: 16, right: 360, bottom: 30};
var info = {left: 20, bottom: 10};
var titleTop = 30;


var drawGraph = function(data) {

  var baseTemp = data.baseTemperature;
  var variance = data.monthlyVariance;

  // Setup yScale range
  var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

  // Setup Colorscale (manually taken from the example)

  var colormap = [
    "#5E4FA2",
    "#3288BD",
    "#66C2A5",
    "#ABDDA4",
    "#E6F598",
    "#FFFFBF",
    "#FEE08B",
    "#FDAE61",
    "#F46D43",
    "#D53E4F",
    "#9E0142"
  ];

  var vMin = d3.min(variance, function(d) { return d.variance});
  var vMax = d3.max(variance, function(d) { return d.variance});

  var color = d3.scale.quantize()
    .range(colormap)
    .domain([vMin, vMax]);

  // setup svg (with margin as MBostock convention)
  var svg = d3.select("#graph").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Scale and Axis
  var xScale = d3.scale.ordinal()
    .domain(d3.range(
      d3.min(variance, function(d) {return d.year}),
      d3.max(variance, function(d) {return d.year}) + 1
    ))
    .rangeBands([0, width]);

  var yScale = d3.scale.ordinal()
    .domain(months)
    .rangeRoundBands([0, height]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(d3.range(1760,2020,10))

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  // Plot heatmap
  svg.selectAll('rect')
    .data(variance)
    .enter()
    .append('rect')
    .attr({
      x: function(d) {return padding.left + xScale(d.year)},
      y: function(d) {return padding.top + yScale(months[d.month - 1])},
      height: yScale.rangeBand(),
      width: xScale.rangeBand(),
      fill: function(d) { return color(d.variance)}
    })
    // tooltip
   .on('mouseover', function(d) {

      d3.select("#date")
        .text(months[d.month - 1] + ' - ' + d.year);
      d3.select("#temperature")
        .text('T: '
         + Math.round((baseTemp + d.variance)*10)/10
         + ' °C');
      d3.select("#variation")
        .text('\u0394: ' // Delta
          + Math.round((d.variance)*10)/10 + ' °C');
      d3.select('#tooltip')
        .style("left", Math.max(0, d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY) + "px")
        .style("opacity", 0.8);
    })
    .on('mouseout', function (d) {

    d3.select('#tooltip')
      .style('opacity', 0);
    })

  // Display Axes
  svg.append("g")
    .attr("transform", "translate("
          + padding.left
          + ","
          + (height + padding.top)
          + ")")
    .attr("class", "axis")
    .call(xAxis);

  svg.append("g")
    .attr("transform", "translate("
          + padding.left
          + ","
          + padding.top
          + ")")
    .attr("class", "axis")
    .call(yAxis);

  // Axes Labels
  svg.append("text")
    .attr("x", (width / 2) + padding.left)
    .attr("y", padding.top + height + axisLabelsOffs.top)
    .attr("text-anchor", "middle")
    .attr("class", "axislabels")
    .text("Years");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", axisLabelsOffs.left )
    .attr("x", -(height/2 + padding.top))
    .attr("class", "axislabels")
    .style("text-anchor", "middle")
    .text("Months");


  // Colormap Legend
  svg.selectAll('rect.legend')
    .data(colormap)
    .enter()
    .append('rect')
    .attr({
      class: 'legend',
      x:  function(d,i) {return innerWidth - legendPos.right + i*legendPos.rectX},
      y: innerHeight - legendPos.bottom,
      width: legendPos.rectX,
      height: legendPos.rectY,
      fill: function (d,i) {return colormap[i]}
    })

  // Temperature rangeband associated with colormap
  var vQuant = (vMax -vMin)/(colormap.length);

  // Calculate and display temperature bands values in legend
  svg.selectAll('text.legend')
    .data(d3.range([colormap.length+1]))
    .enter()
    .append('text')
    .style("text-anchor", "middle")
    .attr({
      class: 'legend',
      x:  function(d,i) {return innerWidth - legendPos.right + i*legendPos.rectX},
      y: innerHeight - legendPos.bottom + 12 + legendPos.rectY,
    })
    .text(function(d,i) {return Math.round((vMin + vQuant*i + baseTemp)*10)/10});

    // Additional legend info
    svg.append('text')
      .style("text-anchor", "middle")
      .text('Average Land-Surface Temperature [°C]')
      .attr({
        class: 'legend',
        x: innerWidth - legendPos.right + 5.5*legendPos.rectX,
        y: innerHeight - legendPos.bottom - 8
      });

  // Title
   svg.append('text')
      .style("text-anchor", "middle")
      .text('Monthly Global Land-Surface Temperature')
      .attr({
        class: 'title',
        x: innerWidth/2,
        y: titleTop
      });

   svg.append('text')
      .style("text-anchor", "middle")
      .text('1753 - 2015')
      .attr({
        class: 'title small',
        x: innerWidth/2,
        y: titleTop + 30
      });

   // INFOS
   svg.append('text')
      .text('Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.')
      .attr({
        class: 'info',
        x: info.left,
        y: innerHeight - 14 - info.bottom
      });

   svg.append('text')
      .text('Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07')
      .attr({
        class: 'info',
        x: info.left,
        y: innerHeight - info.bottom
      });
} // end drawGraph()


// Get the data and visualize !
d3.json(dataUrl,function(json) {
  drawGraph(json);
});
