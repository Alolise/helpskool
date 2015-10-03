function myelement(name) {
	return document.getElementById(name);
}
function show_validation() {
	myelement("contenu").innerHTML=" Contenu Validé ";
}
function make_url(address,type,key="",format="json") {
	switch (type) {
		case "osm":
			url="http://nominatim.openstreetmap.org/search?";
			key="email=jerome.avond@alolise.org";
			format="format=json";
			base= url + key + "&" + format + "&q=" + address;
			break;
		case "gmap":
			url="https://maps.googleapis.com/maps/api/geocode/";
			key="key=AIzaSyBV0jQvMpkmQ2QINkntL7liDvooxYt-WfQ";
			format="json?";
			base= url + format + key + "&address=" + address; 
			break;
	}
	return base;
}
function make_url_map(type,latitude,longitude,delta_vertical,delta_horizontal="") {
	switch (type) {
		case "osm":
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

	var url = make_url(source, "gmap");
	$.getJSON(url, function(data) {
		latitude=data.results[0].geometry.location.lat;
		longitude=data.results[0].geometry.location.lng;
		myelement("latdivgmap").innerHTML=latitude;
		myelement("longdivgmap").innerHTML=longitude;
	});
		
	
	url = make_url(source, "osm");
	$.getJSON(url, function(data) {
		latitude=data[0].lat;
		longitude=data[0].lon;
		
		myelement("latdivosm").innerHTML=latitude;
		myelement("longdivosm").innerHTML=longitude;
		delta_vertical=0.05;
		delta_horizontal=0.05;
		url = make_url_map("osm",latitude,longitude,delta_vertical,delta_horizontal);
		myelement("carte").src=url;
		myelement("contenu").innerHTML=url;

	});

//	myelement('carte').contentWindow.location.reload(true); can't no authorization
}
