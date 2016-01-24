/************************************************

User Stories :

* I can see a Force-directed Graph that shows which campers are posting links on Camper News to which domains.
* I can see each camper's icon on their node.
* I can see the relationship between the campers and the domains they're posting.
* I can tell approximately many times campers have linked to a specific domain from it's node size.
* I can tell approximately how many times a specific camper has posted a link from their node's size.

************************************************/


/** GLOBALS *********************************/
var dataUrl = 'http://www.freecodecamp.com/news/hot';

// SETUP
var width = 780,
    height = 780;

var repulsion = -120;
var linkLength = 90;

var dimFactor = 8.5;

var legendPos = {'right' : 120, 'bottom' : 35}

/**********************************************/

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




var draw = function(graph) {

  var maxUserCount = d3.max(graph.nodes, function(d) {return d.isUser ? d.count : 0 })
  var maxDomainCount = d3.max(graph.nodes, function(d) {return d.isUser ? 0 : d.count})

  var force = d3.layout.force()
      .charge(repulsion)
      .linkDistance(linkLength)
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
      .attr("class", function(d) { return d.isUser ? 'node user' : 'node domain'})
      .call(force.drag);

  var domainNode = d3.selectAll('.node.domain')
        .append('circle')
        .attr({
          "r": function (d) {return Math.sqrt(50*d.count)},
          "fill" :  '#6BB9F0'
        })

var userNode = d3.selectAll('.node.user')
      .append('rect')
      .attr({
        "x": function (d) {return -0.88*dimFactor*Math.sqrt(d.count)},
        'y': function(d) {return -0.88*dimFactor*Math.sqrt(d.count) },
        'height':  function(d) {return 0.88*dimFactor*2*Math.sqrt(d.count) },
        'width':  function(d) {return 0.88*dimFactor*2*Math.sqrt(d.count) },
        'fill': '#E74C3C'
      })

    node.append("image")
        .attr("xlink:href", function(d) {return d.picture})
        .attr("x", -10)
        .attr("y", -10)
        .attr("width", 20)
        .attr("height", 20);

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

  svg.append('circle')
    .attr({
      'class': 'legend node',
      'cx': width - legendPos.right + 8,
      'cy': height - (legendPos.bottom + 25) + 8,
      'r': 8,
      'fill' : '#6BB9F0'
    });

    svg.append('text')
      .text('Domain')
      .attr({
        'class': 'legend info',
        'x': width - legendPos.right + 25,
        'y': height - (legendPos.bottom + 25)+ 12,
      });

    svg.append('rect')
      .attr({
        'class': 'legend node',
        'x': width - legendPos.right,
        'y': height - legendPos.bottom,
        'width': 16,
        'height': 16,
        'fill' : '#E74C3C'
      })

    svg.append('text')
      .text('User')
      .attr({
        'class': 'legend info',
        'x': width - legendPos.right + 25,
        'y': height - legendPos.bottom + 12,
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
