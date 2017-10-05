var metaparam_buttons_with_menu = ['wind','thermals','clouds'];
var params = ['sfcwind', 'hbl', 'dbl', 'blwindshear', 'blcloudpct', 'zsfclclmask', 'zblclmask'];

function toggle_metaparam_menu(e) {
    $( "#menu_".concat( e.data.metaparam )).animate({width: 'toggle'}, 200);
    console.log("#menu_".concat( e.data.metaparam));
}

function switch_previ_layer(e) {
    map.removeLayer(previ_layer)
    previ_layer = new L.ImageOverlay('20170920/'.concat(e.data.param,'.curr.1700lst.d2.body.png'), imageBounds, {opacity: 0.5});
    map.addLayer(previ_layer);
}

var map = L.map('map');
map.setView([44.0941086, 0.8699951], 7);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var imageUrl = '20170920/blcloudpct.curr.1700lst.d2.body.png',
  imageBounds = [[41.9054527, -3.0687866], [46.2827644, 4.8087769]];
//  L.imageOverlay(imageUrl, imageBounds, {opacity: 0.5}).addTo(map);
var previ_layer = new L.ImageOverlay('20170920/blcloudpct.curr.1700lst.d2.body.png', imageBounds, {opacity: 0.5});
map.addLayer(previ_layer);

var marker = L.marker([51.2, 7]).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

// Make menu bindings : on click, toggles the corresponding menu
for (var i = 0; i < metaparam_buttons_with_menu.length; i++) {
    $( "#btn_".concat(metaparam_buttons_with_menu[i]) ).click({metaparam:metaparam_buttons_with_menu[i]},toggle_metaparam_menu);
    $( "#menu_".concat(metaparam_buttons_with_menu[i]) ).click({metaparam:metaparam_buttons_with_menu[i]},toggle_metaparam_menu);
}

for (var i = 0; i < params.length; i++) {
    $( "#".concat(params[i]) ).click({param:params[i]},switch_previ_layer);
}

/*$( "#sfcwind" ).click(function() {
    switch_previ_layer('sfcwind');
});*/