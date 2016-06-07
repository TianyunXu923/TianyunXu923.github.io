
console.log("beigining");
function check(svg, value){
	var date = "#"+value;
	//value = value+"";
	var checkBar = document.getElementById(value);
	//console.log(checkBar);
	checkBar.setAttribute("alt", "check");
	svg.selectAll(date)
	  	 .style("fill", "#FFD801");

}
function uncheck(svg, value){
	var date = "#"+value;
	var checkBar = document.getElementById(value);
	checkBar.setAttribute("alt", "uncheck");
	//console.log(checkBar);
	svg.selectAll(date)
	  	 .style("fill", "silver");

}
console.log("end");