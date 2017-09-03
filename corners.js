/****************************************
 *    corners.js                        *
 *                                      *
 *    Corner info for Google Maps       *
 ****************************************/

var corners = new Array();
var tmp;

corners["Bounds"]
corners["Centre"]

corners.Bounds = new Array();
corners.Centre = new Array();

corners.Bounds[6] = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.9054527, -3.0687866), // SW
        new google.maps.LatLng(46.2827644, 4.8087769)  // NE
    );
corners.Centre[6] = new google.maps.LatLng(44.0941086, 0.8699951);

corners.Bounds[3] = new google.maps.LatLngBounds(
        new google.maps.LatLng(41.5455666, -3.2279358), // SW
        new google.maps.LatLng(45.7934761, 4.5046692)  // NE
    );
    corners.Centre[3] = new google.maps.LatLng(43.6695213, 0.6383667);

/*// UK 2km (Today)
corners.Bounds[2] = new google.maps.LatLngBounds(
    new google.maps.LatLng(49.4383430, -10.7258911), // SW
    new google.maps.LatLng(59.3545303, 2.7919922)  // NE
);
corners.Centre[2] = new google.maps.LatLng(54.3964386, -3.9669495);

// UK 4km (Tomorrow)
corners.Bounds[4] = new google.maps.LatLngBounds(
    new google.maps.LatLng(49.3974648, -10.9672241), // SW
    new google.maps.LatLng(59.6034050, 2.7442017)  // NE
);
corners.Centre[4] = new google.maps.LatLng(54.5004349, -4.1115112);


// UK 5km (Not currently used)
corners.Bounds[5] = new google.maps.LatLngBounds(
            new google.maps.LatLng( 49.4039417 ,  -10.9529528 ), // SW
            new google.maps.LatLng( 59.5960889 ,  2.7322389 )  // NE
          );
corners.Centre[5] = new google.maps.LatLng( 54.5000153 ,  -4.1103569 );


// UK 12km (Rest of week)
corners.Bounds[12] = new google.maps.LatLngBounds(
    new google.maps.LatLng(48.8365898, -11.6136475), // SW
    new google.maps.LatLng(59.7539062, 3.2641602)  // NE
);
corners.Centre[12] = new google.maps.LatLng(54.2952499, -4.1747437);*/
