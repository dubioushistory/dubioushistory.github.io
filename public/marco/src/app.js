var L = require('leaflet');
var Autolinker = require('autolinker');
require('leaflet.fullscreen');

var labels = require('./js/labels.js');
var styles = require('./js/styles.js');

var map = L.map('marco-map', {
    zoomControl:true,
    maxZoom:8,
    minZoom:3,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topleft'
    },
    renderer: L.canvas()
}).fitBounds([
  [47.989921667414194,154.95117187500003],
  [2.8991526985043135,-13.798828125000002]
]);

map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({
  stripPrefix: false,
  truncate: {
    length: 80,
    location: 'middle'
  }
});
var bounds_group = new L.featureGroup([]);

// land
map.createPane('pane_ne_110m_land');
map.getPane('pane_ne_110m_land').style.zIndex = 400;
map.getPane('pane_ne_110m_land').style['mix-blend-mode'] = 'normal';
var layer_ne_110m_land = new L.geoJson(json_ne_110m_land, {
    attribution: '',
    interactive: false,
    dataVar: 'json_ne_110m_land',
    layerName: 'layer_ne_110m_land',
    pane: 'pane_ne_110m_land',
    style: styles.style_ne_110m_land,
});
bounds_group.addLayer(layer_ne_110m_land);
map.addLayer(layer_ne_110m_land);

// route
map.createPane('pane_route');
var layer_route = new L.geoJson(json_route, {
    dataVar: 'json_route',
    layerName: 'layer_route',
    pane: 'pane_route',
    style: styles.style_route,
});
bounds_group.addLayer(layer_route);
map.addLayer(layer_route);

// places
function pop_places(feature, layer) {
    var popupContent = '';
    ['Yule', 'Murray', 'Ramusio', 'Pelliot', 'Haw', 'Modern', 'Notes', 'Identification'].forEach(cell => {
      if (feature.properties[cell]) {
        popupContent += '<tr><th scope="row">' + cell + '</th>'
        popupContent += '<td>' + autolinker.link(feature.properties[cell],{stripPrefix:false}) + '</td></tr>';
      }
    });
    layer.on('click', function() { 
      const element = document.getElementById("marco-table");
      element.innerHTML = popupContent;
    });
}
map.createPane('pane_places');
map.getPane('pane_places').style.zIndex = 402;
map.getPane('pane_places').style['mix-blend-mode'] = 'normal';
var layer_places = new L.geoJson(json_places, {
    attribution: '',
    interactive: true,
    dataVar: 'json_places',
    layerName: 'layer_places',
    pane: 'pane_places',
    onEachFeature: pop_places,
    pointToLayer: function (feature, latlng) {
      var marker = L.circleMarker(latlng, styles.style_places(feature));
      return marker;
    },
});
bounds_group.addLayer(layer_places);
map.addLayer(layer_places);

// display labels
layer_places.eachLayer(function(layer) {
    layer.bindTooltip(styles.style_places_label(layer.feature), {permanent: true, offset: [-0, -8], className: 'css_places', interactive: true});
    layer.getTooltip().on('click', pop_places(layer.feature, layer));
    // layer.added = true;
    var weight = 1;
    if (layer.feature.properties['Type'] == "major") {
      weight += 2;
    } else if (layer.feature.properties['Type'] == "region") {
      weight += 1;
    }
    labels.addLabel(map, layer, layer.getTooltip()._leaflet_id, weight);
});

labels.update();
map.on("zoomend", function(){
    labels.resetLabels(map, [layer_places]);
});
