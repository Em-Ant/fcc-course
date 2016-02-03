var dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';


var margin = {top: 20, right: 20, bottom: 20, left: 20};
var padding = {top: 30, right: 110, bottom: 70, left: 50};
var outerWidth = 850, outerHeight = 600;
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;
var width = innerWidth - padding.left - padding.right;
var height = innerHeight - padding.top - padding.bottom;

var placePad = 1, timePad = 10;
var dataLabelsOffs = {x:15, y:4};
var axisLabelsOffs = {x: 30, y: 10};
var legendPos = {top: padding.top + 10, left: 140};

// visualization function to be called on ajax success
var drawGraph = function(data) {

  // setup svg (with margin as MBostock convention)
  var svg = d3.select("#graph").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var fastestTime = d3.min(data, function(d) {
    return d.Seconds;
  });
  var xScale = d3.scale.linear()
    .domain(
      [
        d3.max(data, function (d) {
          return d.Seconds - fastestTime + timePad;
        }),
        d3.min(data, function (d) {
          return d.Seconds - fastestTime;
        })
      ]
    )
    .range([0, width])

  var yScale = d3.scale.linear()
    .domain(
      [ d3.max(data, function(d) {return d.Place}) + placePad,
        d3.min(data, function(d) {return d.Place})
      ]
    )
    .range([height, 0]);


  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr({
      class: function (d) {
        if (d.Doping) return "datapoints doping";
        else return "datapoints";
      },
      cx: function(d) {
        return padding.left + xScale(d.Seconds - fastestTime);
      },
      cy: function(d) {return padding.top + yScale(d.Place)},
      r: 4
    })
    .on('mouseover',function(d){
      d3.select(this)
        .transition()
        .duration(250)
        .attr('r', 7);

      d3.select('#name')
        .text(d.Name);

      d3.select('#nationality')
        .text(d.Nationality);

      d3.select('#year')
        .text(d.Year);

      d3.select('#time')
        .text(d.Time);

      d3.select('#doping')
        .text(d.Doping);

      d3.select('#tooltip')
        .style('opacity', 0.9);
    })
    .on('mouseout', function (){
      d3.select(this)
        .transition()
        .duration(150)
        .attr('r', 4)

      d3.select('#tooltip')
        .style('opacity', 0);
    })

  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text (function(d) {
        return d.Name;
      })
    .attr ({
      class: 'labels',
      x: function (d) {
        return padding.left + xScale(d.Seconds - fastestTime)
          + dataLabelsOffs.x;
      },
      y: function (d) {
        return padding.top + yScale(d.Place)
          + dataLabelsOffs.y;
      }
    });

  svg.append('circle')
    .attr({
      cx: legendPos.left,
      cy: legendPos.top,
      r: 4,
      class: "datapoints"
    }).append('text')

  svg.append('text')
    .text('Rider w/out doping allegations')
    .attr({
      x: legendPos.left + 10,
      y: legendPos.top  + 4,
      class: 'labels'
    });


  svg.append('circle')
    .attr({
      cx: legendPos.left,
      cy: legendPos.top  + 20,
      r: 4,
      class: "datapoints doping"
    });

  svg.append('text')
    .text('Rider with doping allegations')
    .attr({
      x: legendPos.left + 10,
      y: legendPos.top + 20 + 4,
      class: 'labels'
    });

  var timeFormat = d3.time.format("%M:%S");
  var custFormat = function(d) {
    var s = new Date(1970, 0, 0, 0, 0, d)
    return timeFormat(s);
  };

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(custFormat);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  svg.append("text")
    .attr("x", (width / 2) + padding.left)
    .attr("y", margin.top + padding.top + height
       + axisLabelsOffs.x)
    .attr("text-anchor", "middle")
    .attr("class", "axislabels")
    .text("Minutes Behind Fastest Time");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 + margin.left + padding.left)
        .attr("x", 0 - margin.top - padding.top
           - axisLabelsOffs.y)
        .attr("class", "axislabels")
        .style("text-anchor", "middle")
        .text("Ranking");

  svg.append('text')
    .attr('class','info labels')
    .text('Times normalized to 13.8km distance.')
    .attr('y', outerHeight - 35)

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

};

// GET data and visualize it !
d3.json(dataUrl, function(error, json) {
  if (error) return console.warn(error);
  drawGraph(json);
});
