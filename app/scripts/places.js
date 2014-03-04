/* jshint unused: false */
/* jshint strict: false */
/* global google, createMarker, service */

// Find type, e.g.: gas_stations
function findPlaces(boxes,searchIndex) {
    var request = {
        bounds: boxes[searchIndex],

        types: ["bowling_alley"] // List of supported types: https://developers.google.com/places/documentation/supported_types
    };

// alert(request.bounds);
    // service.radarSearch(request, function (results, status) {
    //     if (status != google.maps.places.PlacesServiceStatus.OK) {
    //         alert('Request[' + searchIndex + '] failed, dog: '+ status);
    //         return;
    //     }
    service.radarSearch(request, function (results) {
// alert(results.length);
        document.getElementById('side_bar').innerHTML += "bounds[" + searchIndex + "] returns " + results.length + " results<br>"
        for (var i = 0, result; result = results[i]; i++) {
            var marker = createMarker(result);
        }
        searchIndex++;
        if (searchIndex < boxes.length)
            findPlaces(boxes,searchIndex);
    });
}
