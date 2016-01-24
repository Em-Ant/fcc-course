/************************************************

User Stories :

* I can see a Force-directed Graph that shows which campers are posting links on Camper News to which domains.
* I can see each camper's icon on their node.
* I can see the relationship between the campers and the domains they're posting.
* I can tell approximately many times campers have linked to a specific domain from it's node size.
* I can tell approximately how many times a specific camper has posted a link from their node's size.

************************************************/



var dataUrl = 'http://www.freecodecamp.com/news/hot';

var buildGraph = function (data) {
  var graph = {
    'nodes': [],
    'links': []
  };

  var urlTest =/^https?:\/\/([\da-z\.-]+)/;

  data.forEach(function(el){
    var domain = el.link.match(urlTest)[1];
    var user = el.author.username;

    var domainInd = graph.nodes.findIndex(function(node) {
      return node.name === domain;
    });
    var userInd = graph.nodes.findIndex(function(node) {
      return node.name === user;
    });

    if (userInd === -1) {
      userInd = graph.nodes.length;
      var newNode = {
        'name': user,
        'count': 1,
        'picture': el.author.picture,
        'isUser': true
      };
      graph.nodes.push(newNode);
    } else {
      graph.nodes[userInd].count++;
    };

    if (domainInd === -1) {
      domainInd = graph.nodes.length;
      var newNode = {
        'name': domain,
        'count': 1
      };
      graph.nodes.push(newNode);
    } else {
      graph.nodes[domainInd].count++;
    };


    graph.links.push({
      'source': userInd,
      'target': domainInd
    });

  });
  return graph;
};

// SETUP
var width = 800,
    height = 800;


var draw = function(graph) {

  var maxUserCount = d3.max(graph.nodes, function(d) {return d.isUser ? d.count : 0 })
  var maxDomainCount = d3.max(graph.nodes, function(d) {return d.isUser ? 0 : d.count})

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(80)
      .size([width, height]);

  var svg = d3.select("#graph").append("svg")
      .attr("width", width)
      .attr("height", height);

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .call(force.drag);

      node.append('circle')
        .attr({
          "class": "node",
          "r" : function (d) {return Math.sqrt(50*d.count)},
          "fill" : function(d) {return d.isUser ? "#E74C3C" : '#6BB9F0' }
        })

    node.append("image")
        .attr("xlink:href", function(d) {return d.picture})
        .attr("x", -14)
        .attr("y", -14)
        .attr("width", 28)
        .attr("height", 28);

  node
    .on("mouseover", function(d) {

        d3.select("#name")
          .text(d.name);
        d3.select('#count')
          .text('posts: ' + d.count);
        d3.select('#tooltip')
          .style("left", Math.max(0, d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY) + "px")
          .style("opacity", 0.8);

        })
        .on('mouseout', function () {
          d3.select('#tooltip')
            .style('opacity', 0);
      });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
};

d3.json(dataUrl, function(err,json) {
  if (err) {
    console.log(err);
    return;
  }
  var graph = buildGraph (json)
  draw(graph);
});
