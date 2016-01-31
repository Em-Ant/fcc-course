/***
User Story: I can see where all Meteorites landed on a world map.
User Story: I can tell the relative size of the meteorite, just by looking at the way it's represented on the map.
User Story: I can mouse over the meteorite's data point for additional data.
***/

var worldDataUrl = 'https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json';

var meteoriteData = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json';

var width = 1100,
    height = 800;

var fill = '#F5D76E',
    stroke = '#666',
    background = '#89C4F4';

var initTranslate = [width/2, height/2 + 70];
var initScale = 174;

var projection = d3.geo.mercator()
  .scale(initScale)
  .translate(initTranslate);

var path = d3.geo.path().projection(projection);



var svg = d3.select('#container')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var map = svg.append('g');

var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([initScale, 1800])
    .on("zoom", zoomed);

function zoomed() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  map.selectAll("path").attr("d", path);
  map.selectAll('circle')
    .attr("cx", function(d,i) {return projection(d.geometry.coordinates)[0]})
    .attr("cy", function(d) {return projection(d.geometry.coordinates)[1]})
}

function reset() {
  projection.translate(initTranslate).scale(initScale);
  map.selectAll("path").attr("d", path);
  map.selectAll('circle')
    .attr("cx", function(d,i) {return projection(d.geometry.coordinates)[0]})
    .attr("cy", function(d) {return projection(d.geometry.coordinates)[1]})

  zoom
    .translate(projection.translate())
    .scale(projection.scale())
}

d3.select('#reset')
  .on('click', reset);
var color = d3.scale.category20();

// MAP OF EARTH
d3.json(worldDataUrl, function(json) {
  var subunits = topojson.feature(json, json.objects.countries).features;
  map.selectAll('path')
    .data(subunits)
    .enter()
    .append('path')
    .attr('fill', fill)
    .attr('stroke', stroke)
    .attr('d', path);

  d3.json(meteoriteData, function(err, hit) {
    if(err) {
      console.log(err);
      return;
    }

    var hitData = hit.features.filter(function(el){
      return el.geometry;
    })

    var hits = map.selectAll('circle')
      .data(hitData)
      .enter()
      .append('circle')
      .attr("cx", function(d,i) {return projection(d.geometry.coordinates)[0]})
      .attr("cy", function(d) {return projection(d.geometry.coordinates)[1]})
      .attr("r", function(d) {return Math.pow(d.properties.mass/1000, 0.2)*3})
      .attr('class', 'hits')
      .attr('fill', function(d,i){return color(i)})
      .on('mouseover',function(d) {
        var date = new Date(d.properties.year);
        d3.select("#m_id")
          .text(d.properties.id);
        d3.select("#name")
          .text(d.properties.name);
        d3.select("#year")
          .text(date.getFullYear());
        d3.select("#mass")
          .text(Math.round(d.properties.mass*1000)/1000000);
        d3.select("#cat")
          .text(d.properties.recclass);
        d3.select("#lat")
          .text(d.properties.reclat);
        d3.select("#lon")
          .text(d.properties.reclong);
        d3.select('#tooltip')
          .style("left", Math.max(0, d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY) + "px")
          .style("opacity", 0.8);
      })
      .on('mouseout', function() {
        d3.select('#tooltip')
          .style('opacity', 0);
      })
    });

    map.call(zoom);


});

//BACKGROUND
map.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', background)

//
