function show_validation() {
	document.getElementById("contenu").innerHTML=" Contenu Validé ";
}
function getLatitudeLongitude(element) {
	if (element.tag == "DIV") {
		source = element.innerHTML;
	} else if (element.tag == "TEXTAREA") {
		source = element.value;
	} else {
		source = element.value;
	}
	var xmlhttp = new XMLHttpRequest();
	var urlosm = "http://nominatim.openstreetmap.org/search?email=jerome.avond@alolise.org&format=json&q=" + source ;
	var urlgmp = "https://maps.googleapis.com/maps/api/geocode/json?address=" + source + "&key=AIzaSyBV0jQvMpkmQ2QINkntL7liDvooxYt-WfQ";

$.getJSON(urlgmp, function(data) {
	//document.getElementById("contenu").innerHTML=data.results[0].formatted_address;
	glat=data.results[0].geometry.location.lat;
	glong=data.results[0].geometry.location.lng;
	document.getElementById("latdivgmap").innerHTML=glat;
	document.getElementById("longdivgmap").innerHTML=glong;
});
	

$.getJSON(urlosm, function(data) {
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
