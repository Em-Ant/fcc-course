
var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

var margin = {top: 20, right: 20, bottom: 20, left: 20};
var padding = {top: 30, right: 20, bottom: 70, left: 70};
var outerWidth = 850, outerHeight = 600;
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;
var width = innerWidth - padding.left - padding.right;
var height = innerHeight - padding.top - padding.bottom;

var drawPlot = function(data) {

  var svg = d3.select("#plot").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xScale = d3.time.scale()
    .domain(
      [
        new Date(data[0][0]),
        new Date(data[data.length-1][0])
      ]
    )
    .range([0, width]);

  var yScale = d3.scale.linear()
    .domain(
      [ 0,
        d3.max(data, function(d) {return d[1]})
      ]
    )
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  var rectW = width/data.length + 1 ;

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr({
      class: 'databars',
      x: function(d) {
        return padding.left + xScale(new Date(d[0]));
      },
      y: function(d) {return padding.top + yScale(d[1])},
      width: rectW,
      height: function(d) {
        return  height - yScale(d[1]);
      }
    })
    .on("mouseover", function(d) {
      var date = new Date(d[0]);
      var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
      d3.select("#GDP")
        .text("$" + d[1] + " Billion");
      d3.select("#date")
        .text(date.getFullYear() + ' - ' + monthNames[date.getMonth()]);
      d3.select('#tip')
        .style("left", Math.max(0, d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY) + "px")
        .style("opacity", 0.8);

      })
      .on('mouseout', function () {
        d3.select('#tip')
          .style('opacity', 0);
    });


  svg.append("text")
        .attr("x", (width / 2) + padding.left)
        .attr("y", margin.top + padding.top)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text("Gross Domestic Product");

    svg.append("text")
        .attr("x", (width + padding.left + padding.right)/2)
        .attr("y", margin.top + padding.top + height + 30)
        .attr("text-anchor", "middle")
        .attr("class", "note")
        .text("Units: Billions of Dollars Seasonal Adjustment: Seasonally Adjusted Annual Rate ");

      svg.append("text")
        .attr("x", (width + padding.left + padding.right)/2)
        .attr("y", margin.top + padding.top + height + 50)
        .attr("text-anchor", "middle")
        .attr("class", "note")
        .text("Notes: A Guide to the National Income and Product Accounts of the United States (NIPA) - (http://www.bea.gov/national/pdf/nipaguid.pdf)");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 + margin.left + padding.left)
        .attr("x", 0 - margin.top - padding.top - 100)
        .attr("class", "labels")
        .style("text-anchor", "middle")
        .text("Gross Domestic Product, USA");

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
          + (padding.left)
          + ","
          + padding.top
          + ")")
    .attr("class", "axis")
    .call(yAxis);

}

d3.json(dataUrl, function(error, json) {
  if (error) return console.warn(error);
  drawPlot(json.data);
});
