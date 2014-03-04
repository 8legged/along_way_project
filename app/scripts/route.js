/* jshint unused: false */
/* jshint strict: false */
/* global google, clearBoxes */
function route() {
  // Clear any previous route boxes from the map
        clearBoxes();

  // Convert the distance of box around the route (miles to km)
        distance = parseFloat(document.getElementById("distance").value) * 1.609344;

        var request = {
            origin: document.getElementById("from").value,
            destination: document.getElementById("to").value,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

  // Make the directions request
        directionService.route(request, function(result, status) {
                directionsRenderer.setDirections(result);
  // Box around the array
                var path = result.routes[0].overview_path;
                var boxes = routeBoxer.box(path, distance);
  // Draw boxes
                drawBoxes(boxes);
                findPlaces(boxes,0);
        });
}
