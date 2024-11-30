var exp = require('./expressions.js');

export function style_ne_110m_land() {
    return {
        pane: 'pane_ne_110m_land',
        stroke: false,
        fill: true,
        fillOpacity: 1,
        fillColor: '#eee2d8',
    }
}

export function style_route() {
    return {
        pane: 'pane_route',
        opacity: 1,
        color: '#ff7f00',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 2.0,
        fillOpacity: 0,
        interactive: false,
    }
}

export function style_places(feature) {
  var context = {
    feature: feature,
    variables: {}
  };
  // Start of if blocks and style check logic
  if (exp.places_type_major(context)) {
    return {
      pane: 'pane_places',
      radius: 4.0,
      color: '#000',
      weight: 1.0,
      fillOpacity: 1,
      fillColor: '#fff',
      interactive: true,
    };
  }
  else if (exp.places_type_region(context)) {
    return {
      pane: 'pane_places',
      radius: 0.0,
      weight: 0,
      fill: false,
    };
  }
  else if (exp.places_type_water(context)) {
    return {
      pane: 'pane_places',
      radius: 0.0,
      weight: 0,
      fill: false,
    };
  }
  else if (exp.places_identification_unknown(context)) {
    return {
      pane: 'pane_places',
      radius: 3.0,
      color: '#000',
      weight: 1.0,
      fillOpacity: 1,
      fillColor: '#f55',
      interactive: true,
    };
  }
  else if (exp.places_identification_unsure(context)) {
    return {
      pane: 'pane_places',
      radius: 3.0,
      color: '#000',
      weight: 1.0,
      fillOpacity: 1,
      fillColor: '#ff5',
      interactive: true,
    };
  }
  else {
    return {
      pane: 'pane_places',
      radius: 2.0,
      color: '#000',
      weight: 1.0,
      fillOpacity: 1,
      fillColor: '#000',
      interactive: true,
    };
  }
}

export function style_places_label(feature) {
    var context = {
        feature: feature,
        variables: {}
    };
    // Start of if blocks and style check logic
    if (exp.places_type_region(context)) {
      return String('<div style="color: #3d5433; font-style: italic; font-size: 10pt; font-family: \'Sans Serif\', sans-serif;">' + feature.properties['Name']) + '</div>';
    } else {
      return String('<div style="color: #000000; font-size: 10pt; font-family: \'Sans Serif\', sans-serif;">' + feature.properties['Name']) + '</div>';
    }
}
