app.directive('treeVisual',['$compile', function($compile){

		function link(scope, element, attrs){

			treeJSON = d3.json("data", function(error, treeData) {

				console.log(treeData)
				var poop = [];
				poop[0] = treeData;

				treeData = poop;

				// training.js

				var margin = {top: 20, right: 120, bottom: 20, left:100},
				    width = $(document).width() - margin.right - margin.left,
				    height = $(document).height() - margin.top - margin.bottom;
				    
				var i = 0,
				    duration = 750,
				    root;

				var tree = d3.layout.tree()
				    .size([height, width]);

				var diagonal = d3.svg.diagonal()
				    .projection(function(d) { return [d.y, d.x]; });

				var svg = d3.select(element[0]).append("svg")
						.attr("id","routeSvg")
				    .attr("width", width + margin.right + margin.left)
				    .attr("height", height + margin.top + margin.bottom)
				    .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				root = treeData[0];
				root.x0 = height / 2;
				root.y0 = 0;
				  
				update(root);

				d3.select(self.frameElement).style("height", "800px");

				function update(source) {

				  // Compute the new tree layout.
				  var nodes = tree.nodes(root).reverse(),
				      links = tree.links(nodes);

				  // Normalize for fixed-depth.
				  nodes.forEach(function(d) { d.y = d.depth * 180; });

				  // Update the nodesâ€¦
				  var node = svg.selectAll("g.node")
				      .data(nodes, function(d) { return d.id || (d.id = ++i); });

				  // Enter any new nodes at the parent's previous position.
				  var nodeEnter = node.enter().append("g")
				      .attr("class", "node")
				      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
				      
				      .attr("ng-click",function(d){
				      	
				      	return "scope.populateData(d)";
				      })

				      .on("click", click);

				  nodeEnter.append("circle")
				      .attr("r", 1e-6)
				      .style("fill", function(d) { return d._children ? "#ccff99" : "#fff"; });

				  nodeEnter.append("text")
				      .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
				      .attr("dy", ".35em")
				      .style("font-size", "20")
				      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
				      .text(function(d) { return d.name; })
				      .style("fill-opacity", 1e-6)
				          .on("click", function (d) { 

				              nodeEnter.select('text').style('font-size','20')
				                .style('font-weight', 'normal');

				              //this.__data__ is the object of the node. It contains
				              //the method and name (aka path) stored as strings. 
				              var currentNode = this.__data__;
				              if (!currentNode.children && !currentNode._children) {

				                scope.populateData(d)
				                d3.select(this).attr('style', 'font-weight:bold')
				                .style('font-size','30');

				                var tempNode = currentNode;
				                var pathURL = '';
				                while(tempNode.parent){
				                  pathURL = tempNode.name.concat(pathURL);
				                  tempNode = tempNode.parent;
				                }
				                console.log(pathURL);
				              }
				          });

				  // Transition nodes to their new position.
				  var nodeUpdate = node.transition()
				      .duration(duration)
				      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

				  nodeUpdate.select("circle")
				      .attr("r", 10)
				      .style("fill", function(d) { return d._children ? "#ccff99" : "#fff"; });

				  nodeUpdate.select("text")
				      .style("fill-opacity", 1);

				  // Transition exiting nodes to the parent's new position.
				  var nodeExit = node.exit().transition()
				      .duration(duration)
				      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
				      .remove();

				  nodeExit.select("circle")
				      .attr("r", 1e-6);

				  nodeExit.select("text")
				      .style("fill-opacity", 1e-6);

				  // Update the linksâ€¦
				  var link = svg.selectAll("path.link")
				      .data(links, function(d) { return d.target.id; });

				  // Enter any new links at the parent's previous position.
				  link.enter().insert("path", "g")
				      .attr("class", "link")
				      .attr("d", function(d) {
				        var o = {x: source.x0, y: source.y0};
				        return diagonal({source: o, target: o});
				      });

				  // Transition links to their new position.
				  link.transition()
				      .duration(duration)
				      .attr("d", diagonal);

				  // Transition exiting nodes to the parent's new position.
				  link.exit().transition()
				      .duration(duration)
				      .attr("d", function(d) {
				        var o = {x: source.x, y: source.y};
				        return diagonal({source: o, target: o});
				      })
				      .remove();

				  // Stash the old positions for transition.
				  nodes.forEach(function(d) {
				    d.x0 = d.x;
				    d.y0 = d.y;
				  });
				}

				// Toggle children on click.
				function click(d) {
				  if (d.children) {
				    d._children = d.children;
				    d.children = null;
				  } else {
				    d.children = d._children;
				    d._children = null;
				  }
				  update(d);
				}

				element.removeAttr("tree-visual");
				$compile(element)(scope);
			});//d3.json({	
		}
	return {
		restrict: 'A',
		scope: false,
		controller: 'd3NodeController',
		link:link
	}

}]);

