window.google_initialize = function () {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);


    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: 'Click to zoom'
    });

    var codeAddress = function() {
      var address = document.getElementById("search").value;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    };  

};

$(document).ready(function () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC2CVRCqI-iLtJ5_MdAlXxeqe8qU193WuI&sensor=false&callback=google_initialize';
    document.body.appendChild(script);
});