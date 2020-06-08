var width = 1500,
height = 960;

var projection = d3.geo.mercator()
.center([126.9895, 37.5651])
.scale(150000)
.translate([width/2, height/2]);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);

queue()
.defer(d3.json, "assets/db/SeoulDistricts.json")
.defer(d3.json, "assets/db/SeoulGreenAreas.json")
.defer(d3.json, "assets/db/SeoulStreets.json")
.defer(d3.csv, "assets/db/SeoulCO2_201620112006.csv")
.await(ready);

function ready(error, districts, green_areas, streets, data) {

	var start_color = { "r": 0, "g": 158, "b": 212};
	var end_color = { "r": 178, "g": 51, "b": 50};
	var selected_year = 2006;
	var sel_field;

	var co2_data = {};

	for(var k in data[0]) {
		if(k.indexOf(selected_year) > 0) {
			sel_field = k;
			break;
		}
	}

	for(i=0; i<data.length; i++) {

		co2_data[data[i]["District"]] = data[i][sel_field];
	}

	if (error) throw error;

	svg.append("path")
	.datum(streets)
	.attr("class", "street")
	.attr("d", path);

	svg.append("path")
	.datum(green_areas)
	.attr("class", "green-land")
	.attr("d", path);

	svg.selectAll("path")
	.data(districts.features)
	.enter()
	.append("path")
	.attr("class", "land")
	.attr("d", path)
	.style("opacity", function(d) {
		var op = co2_data[d.properties.NAME] ? co2_data[d.properties.NAME] : 0;
		
		return 0.6 * op + 0.2;
	})
	.style("fill", function(d) {
		var op = co2_data[d.properties.NAME] ? co2_data[d.properties.NAME] : 0;
		
		var color_r = parseInt(parseFloat(start_color.r) * op + parseFloat(end_color.r) * (1-op));
		var color_g = parseInt(parseFloat(start_color.g) * op + parseFloat(end_color.g) * (1-op));
		var color_b = parseInt(parseFloat(start_color.b) * op + parseFloat(end_color.b) * (1-op));
		
		return "rgb(" + color_r + "," + color_g + "," + color_b + ")";
	});
}