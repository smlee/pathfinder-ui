app.directive('treeVisual',['$compile', '$rootScope', function($compile, $rootScope){
	console.log("rootScope", $rootScope);
		function link(scope, element, attrs){


			treeJSON = d3.json("data", function(error, treeData) {
				///ZOOOOoooooOOOOM stuff here///

				var zoom = d3.behavior.zoom()
					.translate([0,0]) //0,0 default
					.scale(1) //1 default
					.scaleExtent([1,8]) //1, infinity default

				///////////////////////////
				// training.js
				var margin = {top: 20, right: 120, bottom: 20, left:100},
				    width = $(document).width() - margin.right - margin.left,
				    height = $(document).height() - margin.top - margin.bottom;
				    
				var i = 0,
				    duration = 750,
				    root;

				var tree = d3.layout.tree()
				//Change the total allowance of X and Y for the graph here. 
				    .size([height, width]);

				var diagonal = d3.svg.diagonal()
				    .projection(function(d) { return [d.y, d.x]; });

				var svg = d3.select(element[0]).append("svg")
						.attr("id","routeSvg")
				    .attr("width", width + margin.right + margin.left)
				    .attr("height", height + margin.top + margin.bottom)
				    .call(zoom.on("zoom", zoomed))
				    .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

				///////ZOOOOOOOOOOOOOOOOOOOOOOOOOOOM
				function zoomed() {
				  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
				}

				//////ZOOOOOOOOOOOOOOOOOOOOOOOOOOOOM

				root = treeData.routes;
				root.x0 = height / 2;
				root.y0 = 0;
				  
				update(root);

				d3.select(self.frameElement).style("height", "800px");

				function update(source) {

				//Changes the height based on the number of children in the nodes. 
				//Level width stores the number of children at each level (from root to endpoint)
        var levelWidth = [1];
        var childCount = function(level, n) {

            if (n.children && n.children.length > 0) {
                if (levelWidth.length <= level + 1) levelWidth.push(0);

                levelWidth[level + 1] += n.children.length;
                n.children.forEach(function(d) {
                    childCount(level + 1, d);
                });
            }
        };
        childCount(0, root);
        //new height of the graph is n * (longest children string of nodes)
        var newHeight = d3.max(levelWidth) * 30; // 25 pixels child  
        tree = tree.size([newHeight, width]);

				  // Compute the new tree layout.
				  var nodes = tree.nodes(root).reverse(),
				      links = tree.links(nodes);

				  // Normalize for fixed-depth. aka width. How far the nodes are from each other.
				  nodes.forEach(function(d) { d.y = d.depth * 220; });

				  // Update the nodes
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
				      .style("font-size", "16")
				      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
				      .text(function(d) { return d.url; })
				      .style("fill-opacity", 1e-6);


				  // Transition nodes to their new position.
				  var nodeUpdate = node.transition()
				      .duration(duration)
				      //CHANGING HOW WIDE THE X AND Y GAPS ARE BETWEEN NODES
				      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

				  nodeUpdate.select("circle")
				      .attr("r", 10)
				      .style("fill", function(d) { return d._children ? "#ccff99" : "#fff"; });

				  nodeUpdate.select("text")
				      .style("fill-opacity", 1);

				  // Transition exiting nodes to the parent's new position.
				  var nodeExit = node.exit().transition()
				      .duration(duration)
				      .attr("transform", function(d) { return "translate(" + source.y + "," + (source.x) + ")"; })
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
				function toggleChildren(d) {
				  if (d.children) {
				    d._children = d.children;
				    d.children = null;
				  } else {
				    d.children = d._children;
				    d._children = null;
				  }
				};

				//Fill form on click.

				function selectNode(d, nodeDomEle){ 
						var nodeEnter = svg.selectAll("g.node");
        		var scope = angular.element(nodeDomEle).scope();

        		//Reset all text to normal font (no bold, no size change).
        		//We can add a check in here later to see the property of the
        		//specific node but we might as well just change it if we
        		//will loop throug and read the style of all nodes.
            nodeEnter.select('text').style('font-size','16')
              .style('font-weight', 'normal');

            //nodeDomEle.__data__ is the object of the node. It contains
            //the method and name (aka path) stored as strings. 
            var currentNode = d;

            //_children 
         
            if (!currentNode.children && !currentNode._children) {
            	scope.populateData(d);

              d3.select(nodeDomEle).attr('style', 'font-weight:bold')
              .style('font-size','16');

              var pathURL = '';
              while(currentNode.parent){
                pathURL = currentNode.url.concat(pathURL);
                currentNode = currentNode.parent;
              }
            }
          }

				//Main click wrapper function

				function click(d){
					// console.log("scope object", scope);
					// scope.switchTab(0);
					//'This' points to the dom element that was selected 					
					toggleChildren(d);
					selectNode(d, this);
					update(d);
					$rootScope.$broadcast('nodeClick');

				}


				//Soultion to stop this from compiling nonstop.
				element.removeAttr("tree-visual");
				$compile(element)(scope);
			});//d3.json({	
		}
	return {
		restrict: 'A',
		scope: true,
		link:link
	}

}]);

