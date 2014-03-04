/* jshint unused: false */
/* jshint strict: false */
/* global google */

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
