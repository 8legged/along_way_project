window.google_initialize = function () {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

};

$(document).ready(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2CVRCqI-iLtJ5_MdAlXxeqe8qU193WuI&sensor=false&callback=google_initialize';
    document.body.appendChild(script);
});