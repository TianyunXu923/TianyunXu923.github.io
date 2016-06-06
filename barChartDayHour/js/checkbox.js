
function check(svg, value){
	var date = "#"+value;
	svg.selectAll(date)
	  	 .style("fill", "#FFD801");
}
function uncheck(svg, value){
	var date = "#"+value;
	svg.selectAll(date)
	  	 .style("fill", "silver");
		// svg.selectAll("#Mon")
	 //  	 .style("fill", "#FFD801")
}
