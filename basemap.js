function myelement(name) {
	return document.getElementById(name);
}
function show_validation() {
	myelement("contenu").innerHTML=" Contenu Validé ";
}
function make_url(type,data) {
	switch (type) {
		case "url_osm":
			url="http://nominatim.openstreetmap.org/search?";
			key="email=jerome.avond@alolise.org";
			format="format=json";
			base= url + key + "&" + format + "&q=" + address;
			break;
		case "url_gmap":
			url="https://maps.googleapis.com/maps/api/geocode/";
			key="key=AIzaSyBV0jQvMpkmQ2QINkntL7liDvooxYt-WfQ";
			format="json?";
			base= url + format + key + "&address=" + address; 
			break;
		case "map_osm":
			url = "http://www.openstreetmap.org/export/embed.html?"
			longitude_min=longitude - delta_horizontal;
			latitude_min=latitude - delta_vertical;
			longitude_max=longitude + delta_horizontal;
			latitude_max=latitude + delta_vertical;
			box = "bbox=" + longitude_min + "," + latitude_min + "," + longitude_max + "," + latitude_max;
			layer = "&" + "layer=mapquest";
			marker = "&" + "marker=" + latitude + "," + longitude;
			break;
			//maposm="http://api.openstreetmap.org/api/0.6/map?bbox="+bolon1+","+bolat2+","+bolon2+","+bolat3;
	}
	return base;
}
function get_LatitudeLongitude(element) {

	switch (element.tag) {
		case "DIV":
			source = element.innerHTML;
			break;
		case "TEXTAREA":
			source = element.value;
			break;
		default:
			source = element.value;
	}

	var xmlhttp = new XMLHttpRequest();

	var url = make_url("url_gmap",source);
	$.getJSON(url, function(data) {
		geodata = {
			"latitude": data.results[0].geometry.location.lat,
			"longitude": data.results[0].geometry.location.lng,
			"delta_vertical": 0.05,
			"delta_horizontal": 0.05
		}
		myelement("latdivgmap").innerHTML=geodata["latitude"];
		myelement("longdivgmap").innerHTML=geodata["longitude"];
	});
		
	
	url = make_url("url_osm",source);
	$.getJSON(url, function(data) {
		geodata = {
				"latitude": data[0].lat,
				"longitude": data[0].lon,
				"delta_vertical": 0.05,
				"delta_horizontal": 0.05
		}
		
		myelement("latdivosm").innerHTML=geodata["latitude"];
		myelement("longdivosm").innerHTML=geodata["longitude"];
		url = make_url("map_osm",geodata);
		myelement("carte").src=url;
		myelement("contenu").innerHTML=url;

	});

//	myelement('carte').contentWindow.location.reload(true); can't no authorization
}
