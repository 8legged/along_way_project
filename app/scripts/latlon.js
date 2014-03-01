var geocoder;
var map;
var directionsService = new google.maps.DirectionsService();
var markerArray = []
var route_boxer;;
var boxpolys;

function initialize() {
  geocoder = new google.maps.Geocoder();
  directionsDisplay = new google.maps.DirectionsRenderer();

  var latlng = new google.maps.LatLng(47.623, -122.336);

  var mapOptions = {
    zoom: 15,
    center: latlng
  }

  var rendererOptions = {
    map: map
  }

  routeBoxer = new RouteBoxer();

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  directionsDisplay.setMap(map);
}

function calcRoute() {

  clearBoxes();

  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {

      directionsDisplay.setDirections(response);
      var path = response.routes[0].overview_path;
      var boxes = routeBoxer.box(path, 1);

      drawBoxes(boxes);
    }
  });

  function drawBoxes(boxes) {
    boxpolys = new Array(boxes.length);
    for (var i = 0; i < boxes.length; i++) {
      boxpolys[i] = new google.maps.Rectangle({
        bounds: boxes[i],
        fillOpacity: 0,
        strokeOpacity: 1.0,
        strokeColor: '#000000',
        strokeWeight: 1,
        map: map
      });
    }
  }

  function clearBoxes() {
    if (boxpolys != null) {
      for (var i = 0; i < boxpolys.length; i++) {
        boxpolys[i].setMap(null);
      }
    }
    boxpolys = null;
  }
}

function attachInstructionText(marker, text) {
  google.maps.event.addListener(marker, 'click', function() {
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);