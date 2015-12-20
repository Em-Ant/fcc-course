var height = 800,
    width = 800;

var fill = '#F5D76E',
    stroke = '#777',
    background = '#89C4F4';

var projection = d3.geo.mercator()
  .scale(120)
  .translate([width/2, height/2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select('#container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var map = svg.append('g');


// MAP OF EARTH
d3.json('https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json', function(json) {
  map.selectAll('path')
    .data(topojson.feature(json, json.objects.countries).features)
    .enter()
    .append('path')
    .attr('fill', fill)
    .attr('stroke', stroke)
    .attr('d', path)
});

// BACKGROUND
map.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', background)

//
