var metaparam_buttons_with_menu = ['wind','thermals','clouds'];
var params = ['sfcwind', '500mwind', 'hbl', 'dbl', 'blwindshear', 'blcloudpct', 'zsfclclmask', 'zblclmask'];
var param_descriptions = {'sfcwind':'Vent à 10m',
                          '500mwind':'Vent à 500m',
                          'hbl':'Altitude plafond',
                          'dbl':'Epaisseur couche convective',
                          'blcloudpct':'Couverture nuageuse au plafond',
                          'zsfclclmask':'Potentiel de formation de cumulus',
                          'zblclmask':'Potentiel de surdéveloppement'};

function two_digits(number) {
    return (number < 10 ? '0' : '') + number;                    
}

function toggle_metaparam_menu(e) {
    $( "#menu_".concat( e.data.metaparam )).animate({width: 'toggle'}, 200);
    console.log("#menu_".concat( e.data.metaparam));
}

function get_prevision_image(param, date_and_time) {
    return "https://storage.googleapis.com/raspit-output-data/".concat(date_and_time.getFullYear(),
        two_digits(date_and_time.getMonth() + 1),
        two_digits(date_and_time.getDate() + 2),
        '/OUT/',
        param,
        '.curr.',
        date_and_time.getHours(),
        '00lst.d2.body.png');
}

function switch_previ_layer(e) {
    map.removeLayer(previ_layer);
    if (wind_layer != null) {
        map.removeLayer(wind_layer);
    }
    if (e.data.param == '500mwind') {
        wind_layer = new L.velocityLayer({
            displayValues: true,
            displayOptions: {
              velocityType: 'GBR Wind',
              position: 'bottomleft',
              emptyString: 'No velocity data',
              angleConvention: 'bearingCW',
              displayPosition: 'bottomleft',
              displayEmptyString: 'No velocity data',
              speedUnit: 'kt'
            },
            data: data,
          
            // OPTIONAL
            //minVelocity: 0,          // used to align color scale
            maxVelocity: 5
          });
          map.addLayer(wind_layer);
    } else {
        console.log("getting ".concat(get_prevision_image(e.data.param, new Date())));
        previ_layer = new L.ImageOverlay(get_prevision_image(e.data.param, new Date()), imageBounds, {opacity: 0.5});
    }
    map.addLayer(previ_layer);
    $('#site_title').text(param_descriptions[e.data.param]);
}

var map = L.map('map');
map.setView([44.0941086, 0.8699951], 7);

/*L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);*/

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

var initial_param = 'hbl';
var imageBounds = [[41.9054527, -3.0687866], [46.2827644, 4.8087769]];
var wind_layer;
var previ_layer = new L.ImageOverlay(get_prevision_image(initial_param, new Date()), imageBounds, {opacity: 0.5});
map.addLayer(previ_layer);
$('#site_title').text(param_descriptions[initial_param]);

var sidebar = L.control.sidebar('sidebar').addTo(map);

// Make menu bindings : on click, toggles the corresponding menu
for (var i = 0; i < metaparam_buttons_with_menu.length; i++) {
    $( "#btn_".concat(metaparam_buttons_with_menu[i]) ).click({metaparam:metaparam_buttons_with_menu[i]},toggle_metaparam_menu);
    $( "#menu_".concat(metaparam_buttons_with_menu[i]) ).click({metaparam:metaparam_buttons_with_menu[i]},toggle_metaparam_menu);
}

for (var i = 0; i < params.length; i++) {
    $( "#".concat(params[i]) ).click({param:params[i]},switch_previ_layer);
}