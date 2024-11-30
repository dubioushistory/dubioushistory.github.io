// type LIKE 'major'
export function places_type_major(context) {
    var feature = context.feature;
    if (feature.properties && feature.properties['Type']) {
        return (feature.properties['Type'].indexOf('major') > -1);
    } else {
        return false;
    }
}


// type LIKE 'region'
export function places_type_region(context) {
    var feature = context.feature;
    if (feature.properties && feature.properties['Type']) {
        return (feature.properties['Type'].indexOf('region') > -1);
    } else {
        return false;
    }
}


// type LIKE 'water'
export function places_type_water(context) {
    var feature = context.feature;
    if (feature.properties && feature.properties['Type']) {
        return (feature.properties['Type'].indexOf('water') > -1);
    } else {
        return false;
    }
}


// Identification LIKE 'unknown'
export function places_identification_unknown(context) {
    var feature = context.feature;
    if (feature.properties && feature.properties['Identification']) {
        return (feature.properties['Identification'].indexOf('unknown') > -1);
    } else {
      return false;
    }
}


// Identification LIKE 'unsure'
export function places_identification_unsure(context) {
    var feature = context.feature;
    if (feature.properties && feature.properties['Identification']) {
        return (feature.properties['Identification'].indexOf('unsure') > -1);
    } else {
        return false;
    }
}
