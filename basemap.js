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
			key="email=" + data["key"] ;
			format="format=" + data["format"];
			base= url + key + "&" + format + "&q=" + data["address"];
			break;
		case "url_gmap":
			url="https://maps.googleapis.com/maps/api/geocode/";
			key="key=" + data["key"];
			format=data["format"] + "?";
			base= url + format + key + "&address=" + data["address"];
			break;
		case "map_osm":
			url = "http://www.openstreetmap.org/export/embed.html?"
			longitude_min=data["longitude"] - data["delta_horizontal"];
			latitude_min=data["latitude"] - data["delta_vertical"];
			longitude_max=data["longitude"] + data["delta_horizontal"];
			latitude_max=data["latitude"] + data["delta_vertical"];
			box = "bbox=" + longitude_min + "," + latitude_min + "," + longitude_max + "," + latitude_max;
			layer = "&" + "layer=mapquest";
			marker = "&" + "marker=" + data["latitude"] + "," + data["longitude"];
			base = url + box + layer + marker;
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

	geodata_gmap= {
			"address": source,
			"key": "AIzaSyBV0jQvMpkmQ2QINkntL7liDvooxYt-WfQ",
			"format": "json"
	}
	var url = make_url("url_gmap",geodata_gmap);
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
		
	
	geodata_osm= {
			"address": source,
			"key": "jerome.avond@alolise.org",
			"format": "json"
	}
	url = make_url("url_osm",geodata_osm);
	$.getJSON(url, function(data) {
		if (data.length == 0) {
			alert("Adresse Inconnue!");
			return 0;
		}
		geodata_map = {
				"latitude": data[0].lat,
				"longitude": data[0].lon,
				"delta_vertical": 0.05,
				"delta_horizontal": 0.05
		}
		
//			alert(geodata_map["latitude"]);
		myelement("latdivosm").innerHTML=geodata["latitude"];
		myelement("longdivosm").innerHTML=geodata["longitude"];
		map = make_url("map_osm",geodata_map);
		myelement("carte").src=map;
		myelement("contenu").innerHTML=map;
	});

//	myelement('carte').contentWindow.location.reload(true); can't no authorization
}

