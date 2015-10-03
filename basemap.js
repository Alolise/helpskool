function show_validation() {
	document.getElementById("contenu").innerHTML=" Contenu Validé ";
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
		glat=data.results[0].geometry.location.lat;
		glong=data.results[0].geometry.location.lng;
		document.getElementById("latdivgmap").innerHTML=glat;
		document.getElementById("longdivgmap").innerHTML=glong;
	});
		
	
	url = make_url(source, "osm");
	$.getJSON(url, function(data) {
		olat=data[0].lat;
		olon=data[0].lon;
		deltav=0.05;
		deltah=0.05;
		bolon1=olon-deltah;
		bolat1=olat-deltav;
		bolon2=olon+deltah;
		bolat2=olat+deltav;
		
		document.getElementById("latdivosm").innerHTML=olat;
		document.getElementById("longdivosm").innerHTML=olon;
		maposm="http://www.openstreetmap.org/export/embed.html?"
			+"bbox="
			+bolon1+","+bolat1+","+bolon2+","+bolat2
			+"&amp;"
			+"layer=mapquest"
			+"&amp;"
			+"marker="+olat+","+olon ;
		//maposm="http://api.openstreetmap.org/api/0.6/map?bbox="+bolon1+","+bolat2+","+bolon2+","+bolat3;
		document.getElementById("carte").src=maposm;
		document.getElementById("contenu").innerHTML=maposm;

});

	document.getElementById('carte').contentWindow.location.reload(true);
}
