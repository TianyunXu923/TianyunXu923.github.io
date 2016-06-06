var margin = {
	top: 20, right: 40, bottom: 30, left: 40, top2: 40
},
	width = 1000 - margin.left -  margin.right,
	height = 280 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
		  .rangeRoundBands([0, width], 0.1);

var y = d3.scale.linear()
		.range([height, 0]);

// tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip');

var tip2 = d3.tip()
	.attr('class', 'd3-tip');

var hourlyString; 
function readData(file){
	var hourlyData = new XMLHttpRequest();
	hourlyData.open("GET", file, false);
	hourlyData.onreadystatechange = function(){
		if(hourlyData.readyState === 4){
			if(hourlyData.status === 200 || hourlyData.status == 0){
				var hourlyDataString = hourlyData.responseText;
				//console.log(hourlyDataString);
				//return hourlyDataString;
				hourlyString = hourlyDataString;
			}
		}
	}
	hourlyData.send(null);
}

readData("hourlydata1.txt");

//console.log(hourlyString);
var hourlyArray = hourlyString.split(",\n ");

for(i=0; i<hourlyArray.length; i++){
	hourlyArray[i] = hourlyArray[i].substring(1, hourlyArray[i].length-1);
	hourlyArray[i] = hourlyArray[i].split(", "); 
}
hourlyArray.sort();
for(i=0; i<hourlyArray.length; i++){
	//console.log(hourlyArray[i][0]);
	//14 since 1.31, 10:00
	hourlyArray[i][0] = +hourlyArray[i][0]*1000;
	hourlyArray[i][1] = +hourlyArray[i][1];
	//console.log(hourlyArray[i][0]);
	//console.log(d3.time.format('%m-%d %H:%M')(new Date(hourlyArray[i][0])));
}

console.log(hourlyArray.length); //696, -14, -10

var dailyAverage = [];
var day = (hourlyArray.length-14-10)/24;
var s = 14;
var allData = [];


for(i=0; i<day; i++){
	var daySum =0;
	var hourlyDataArray = [];
	var date;
	for(p=0; p<24; p++){
		if(isNaN(hourlyArray[p+s][1])){
			//console.log(p+": "+hourlyArray[p+s][0]+", "+hourlyArray[p+s][1]);
		hourlyArray[p+s][1] =0;
		//console.log(p+": "+hourlyArray[p+s][0]+", "+hourlyArray[p+s][1]);
		}
		daySum = daySum + hourlyArray[p+s][1];
		hourlyDataArray.push(hourlyArray[p+s][1]);
		date = hourlyArray[p+s][0]; 
	}
	// Math.round(num*100)/100
	dailyAverage.push(Math.round(daySum/24*100)/100);
	allData.push([date,Math.round(daySum/24*100)/100, hourlyDataArray]);
	
	//console.log(daySum);
	s = s+24;
}
console.log(allData);

// all the data is stored in allData in the format [timestamp, dailyaverage, hourArray]

//var minDate = d3.time.format('%m-%d')(new Date(allData[0][0]));
var minDate = allData[0][0];
//console.log(minDate);
//var maxDate = d3.time.format('%m-%d')(new Date(allData[allData.length-1][0]));
var maxDate = allData[allData.length-1][0];
//console.log(maxDate);



var xScale = d3.time.scale()
		.domain([minDate, maxDate])
		.range([0, width]);


var xAxis = d3.svg.axis()
	.orient("bottom")
	.scale(xScale);
	//.tickFormat(customTimeFormat);

var svg = d3.select("#chart-area1").append("svg")
		.attr("width", width + margin.left + margin.right)
    	.attr("height", height + margin.top + margin.bottom)
  		.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(allData.map(function(d){return d[0];}));
y.domain([0, d3.max(allData, function(d){return d[1];})]);

svg.selectAll(".bar")
	.data(allData)
	.enter()
	.append("rect")
	.attr("class", function(d,index){
		return index+" bar";
	})
	.attr("x", function(d){
		//console.log(d3.time.format('%m-%d')(new Date(d[0])));
		//return xScale(d3.time.format('%m-%d')(new Date(d[0])));

		return xScale(d[0]);
	}) 
	.attr("y", function(d){
		return y(d[1]);
	})   	
	.attr("width", x.rangeBand())
	.attr("height", function(d){
		return height - y(d[1]);
	})
	.style("fill",function(d, index){
		if(index === 0){
			return "#FFA62F";
		}
		else return "#FFD801";
	})
	.on("click", function(d){
		console.log(this);
		svg.selectAll(".bar").style("fill", "#FFD801");
		this.style.fill = "#FFA62F";
		updateHourlyData(d[2]);
	});

// draw x axis with labels and move to the bottom of the chart area
svg.append("g")
    .attr("class", "x axis")   // give it a class so it can be used to select only xaxis labels  below
    .attr("transform", "translate(33," + (height+5 ) + ")")
    .call(xAxis);

svg.call(tip);
tip.html(function(element){
	return "Daily average: "+element[1];
});

svg.selectAll(".bar")
        .data(allData)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

// var str = "12345";
// str = str.substring(1,str.length-1);
// console.log(str);

// d3.txt("hourlydata.txt", function(error, txt){
// 	console.log(txt);
// });

var svg2 = d3.select("#chart-area1").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom+100)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top2 + ")");

var minDate2 = d3.min(allData[0][2]);
//console.log(minDate);
//var maxDate = d3.time.format('%m-%d')(new Date(allData[allData.length-1][0]));
var maxDate2 = d3.max(allData[0][2]);
//console.log(maxDate);



var xScale2 = d3.time.scale()
		.domain([new Date, new Date])
		.nice(d3.time.day)
		.range([0, width]);


var xAxis2 = d3.svg.axis()
	.orient("bottom")
	.scale(xScale2)
	.ticks(24)
	.tickFormat(d3.time.format("%H:%M"));


var x2 = d3.scale.ordinal()
		  //.domain(allData[0][2])
		   .domain([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
		  .rangeRoundBands([0, width], 0.1);

var y2 = d3.scale.linear()
		.domain([0, d3.max(allData[0][2])])
		.range([height, 0]);


svg2.selectAll(".bar2")
	.data(allData[0][2])
	.enter()
	.append("rect")
	.attr("class","bar2")
	.attr("x", function(d, index){
		return x2(index)+12;
	}) 
	.attr("y", function(d){
		return y2(d);
	})   	
	.attr("width", x2.rangeBand())
	.attr("height", function(d){
		// if(d === 0){
		// 	return 1;
		// }
		return height - y2(d);
	});

svg2.append("g")
   .attr("class", "x axis")
   .attr("transform", "translate(33," + (height+5 ) + ")")
   .call(xAxis2);

svg2.call(tip2);
tip2.html(function(element){
	return "Value: "+Math.round(element*100)/100;
});

svg2.selectAll(".bar2")
        .data(allData[0][2])
        .on("mouseover", tip2.show)
        .on("mouseout", tip2.hide);


//svg2.selectAll(".bar2").exit();

function updateHourlyData(data){
	svg2.selectAll(".bar2").remove();
	var minDate2 = d3.min(data);
	//console.log(minDate);
	//var maxDate = d3.time.format('%m-%d')(new Date(allData[allData.length-1][0]));
	var maxDate2 = d3.max(data);



	y2 = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([height, 0]);


	svg2.selectAll(".bar2")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","bar2")
		.attr("x", function(d, index){
			return x2(index)+12;
		}) 
		.attr("y", function(d){
			return y2(d);
		})   	
		.attr("width", x2.rangeBand())
		.attr("height", function(d){
		// if(d === 0){
		// 	return 1;
		// }
			return height - y2(d);
		});

	svg2.call(tip2);
	tip2.html(function(element){
		return "Value: "+Math.round(element*100)/100;
	});

	svg2.selectAll(".bar2")
        .data(data)
        .on("mouseover", tip2.show)
        .on("mouseout", tip2.hide);

}

svg.append("text").attr("x", 20)
			.attr("y", 20)
			.text("Daily Average")
			.attr("font-size", "20px");
svg2.append("text").attr("x", 20)
			.attr("y", -5)
			.text("Hourly Average")
			.attr("font-size", "20px");