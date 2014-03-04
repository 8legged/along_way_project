/* jshint unused: false */
/* jshint strict: false */
/* global google */

// Draw the array of boxes as polylines on the map
// function drawBoxes(boxes) {
//   boxpolys = new Array(boxes.length);
//     for (var i = 0; i < boxes.length; i++) {
//         boxpolys[i] = new google.maps.Rectangle({
//             bounds: boxes[i],
//             fillOpacity: 0,
//             strokeOpacity: 1.0,
//             strokeColor: '#000000',
//             strokeWeight: 1,
//             map: map
//         });
//     }
// }


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



// Clear boxes currently on the map
function clearBoxes() {
    if (boxpolys != null) {
        for (var i = 0; i < boxpolys.length; i++) {
            boxpolys[i].setMap(null);
        }
    }
    boxpolys = null;
}
