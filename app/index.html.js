<!DOCTYPE html>
<html>
<head>
  <title>Google Maps and Route Boxer</title>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <link rel="stylesheet" href="styles/foundation.css" />
  <style>
    html, body, #map_canvas {
      margin: 0;
      padding: 0;
      height: 100%;
    }
  </style>
  <script src="lodash.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>
  <script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/routeboxer/src/RouteBoxer.js" type="text/javascript"></script>
  <script type="text/javascript">

// - Use the RouteBoxer to get an array of google.maps.LatLngBounds
//   objects that cover the route.
// - For each of those bounds use the Places library to search for the places.
//      Note: there are query limits and quotas on places requests; for long
//      routes this may not be practical.

var map = null;
var boxpolys = null;
var directions = null;
var routeBoxer = null;
var distance = null; // km
var service = null;
var gmarkers = [];
var infowindow = new google.maps.InfoWindow();
function initialize() {
  // Default the map view to the continental U.S.
    var mapOptions = {
        center: new google.maps.LatLng(38.2806828,-98.9851309),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 4
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    service = new google.maps.places.PlacesService(map);
    routeBoxer = new RouteBoxer();
    directionService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
}

function route() {
  // Clear any previous route boxes from the map
        clearBoxes();

  // Convert the distance to box around the route from miles to km
        distance = parseFloat(document.getElementById("distance").value) * 1.609344;

        var request = {
            origin: document.getElementById("from").value,
            destination: document.getElementById("to").value,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

  // Make the directions request
        directionService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
  // Box around the overview path of the first route
                var path = result.routes[0].overview_path;
                var boxes = routeBoxer.box(path, distance);
  // alert(boxes.length);
                drawBoxes(boxes);
                findPlaces(boxes,0);
            } else {
                alert("Directions query failed: " + status);
            }
        });
    }
        // Draw the array of boxes as polylines on the map
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

// Find gas stations
function findPlaces(boxes,searchIndex) {
    var request = {
        bounds: boxes[searchIndex],
// List of supported types
// https://developers.google.com/places/documentation/supported_types
        types: ["bowling_alley"]
    };
// alert(request.bounds);
    service.radarSearch(request, function (results, status) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert("Request["+searchIndex+"] failed: "+status);
            return;
        }
// alert(results.length);
        document.getElementById('side_bar').innerHTML += "bounds["+searchIndex+"] returns "+results.length+" results<br>"
        for (var i = 0, result; result = results[i]; i++) {
            var marker = createMarker(result);
        }
        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes,searchIndex);
    });
}

// Clear boxes currently on the map
function clearBoxes() {
    if (boxpolys != null) {
        for (var i = 0; i < boxpolys.length; i++) {
          boxpolys[i].setMap(null);
        }
    }
    boxpolys = null;
}

function createMarker(place){
  var placeLoc=place.geometry.location;
    if (place.icon) {
        var image = new google.maps.MarkerImage(
          place.icon, new google.maps.Size(71, 71),
          new google.maps.Point(0, 0), new google.maps.Point(17, 34),
          new google.maps.Size(25, 25));
    } else var image = null;

    var marker=new google.maps.Marker({
        map:map,
        icon: image,
        position:place.geometry.location
    });
    var request =  {
        reference: place.reference
    };
    google.maps.event.addListener(marker,'click',function(){
        service.getDetails(request, function(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                var contentStr = '<h5>'+place.name+'</h5><p>'+place.formatted_address;
                if (!!place.formatted_phone_number) contentStr += '<br>'+place.formatted_phone_number;
                if (!!place.website) contentStr += '<br><a target="_blank" href="'+place.website+'">'+place.website+'</a>';
                contentStr += '<br>'+place.types+'</p>';
                infowindow.setContent(contentStr);
                infowindow.open(map,marker);
                } else {
                var contentStr = "<h5>No Result, status="+status+"</h5>";
                infowindow.setContent(contentStr);
                infowindow.open(map,marker);
            }
        });

    });
    gmarkers.push(marker);
    var side_bar_html = "<a href='javascript:google.maps.event.trigger(gmarkers["+parseInt(gmarkers.length-1)+"],\"click\");'>"+place.name+"</a><br>";
    document.getElementById('side_bar').innerHTML += side_bar_html;
  }
      </script>

</head>
<body onload="initialize();">
  <div class="row">
  <div class="large-12 columns">
  <div class="row">
  <div class="large-12 columns">
    <!-- Navigation -->
    <nav class="top-bar">
      <ul class="title-area">
        <!-- Title Area -->
        <li class="name">
          <h1>
            <a href="#">
              Top Bar Title
            </a>
          </h1>
        </li>
        <li class="toggle-topbar menu-icon">
          <a href="#">
            <span>menu</span>
          </a>
        </li>
      </ul>
      <section class="top-bar-section">
        <ul class="left">
          <li>
            <a href="#">Link 1</a>
          </li>
        </ul>
        <ul class="right">
          <li class="search">
            <form>
              <input type="textbox" id="from" value="From"/>
            </form>
          </li>
          <li class="search">
            <form>
              <input type="textbox" id="to" value="To"/>
            </form>
          <li class="search">
            <form>
              <input type="textbox" id="distance" value="30" size="2">
              <input type="button" value="Go" onclick="route()">
            </form>
          </li>
        </ul>
      </section>
    </nav>
      <!-- End Navigation -->

<table>
  <tr>
    <td valign="top">
      <div id="map" style="width: 600px; height: 500px;"></div>
    </td>
    <td>
      <div id="side_bar" style="display:none"></div>
      <!-- <div id="side_bar"></div> -->
    </td>
  </tr>
</table>
    </div>
  </div>
</body>
</html>
