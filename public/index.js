const OpenSeadragon = require('openseadragon');
const Annotorious = require('@recogito/annotorious-openseadragon');
const MD5 = require('crypto-js/md5');
// import "@recogito/annotorious-openseadragon/dist/annotorious.min.css";

let rectangleTool = new OpenSeadragon.Button({
    tooltip: 'Rectangle',
    srcRest: '/images/rect_rest.png',
    srcGroup: '/images/rect_grouphover.png',
    srcHover: '/images/rect_hover.png',
    srcDown: '/images/rect_pressed.png',
    onClick: () => anno.setDrawingTool('rect')
});

let polygonTool = new OpenSeadragon.Button({
    tooltip: 'Polygon',
    srcRest: '/images/polygon_rest.png',
    srcGroup: '/images/polygon_grouphover.png',
    srcHover: '/images/polygon_hover.png',
    srcDown: '/images/polygon_pressed.png',
    onClick: () => anno.setDrawingTool('polygon')
});

let toggleTool = new OpenSeadragon.Button({
    tooltip: 'Show/hide',
    srcRest: '/images/toggle_rest.png',
    srcGroup: '/images/toggle_grouphover.png',
    srcHover: '/images/toggle_hover.png',
    srcDown: '/images/toggle_pressed.png',
    onClick: () => anno.setVisible(anno.visible = !anno.visible)
});

const viewer = OpenSeadragon({
  id: "seadragon-viewer",
  showZoomControl: false,
  showHomeControl: false,
  showRotationControl: true,
  // gestureSettingsTouch: {
  //   pinchRotate: true
  // },
  visibilityRatio: 1,
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f6/info.json" // Catalan Atlas, 1370b-1380 (f6-f13)
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f7/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f8/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f9/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f10/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f11/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f12/info.json",
  // tileSources: "https://gallica.bnf.fr/iiif/ark:/12148/btv1b55002481n/f13/info.json"

  tileSources: "https://tile.loc.gov/image-services/iiif/service:gmd:gmd3:g3200:g3200:ct002087/info.json" // Genoese map, 1457

  // tileSources: "https://www.davidrumsey.com/luna/servlet/iiif/RUMSEY~8~1~289827~90061349" // Fra Mauro, 1459
  // tileSources: "https://www.davidrumsey.com/luna/servlet/iiif/RUMSEY~8~1~291869~90063414" // Erdapfel, 1492
  // tileSources: "https://storage.googleapis.com/raremaps/img/dzi/img_75653.dzi" // A Newe Mape of Tartary, 1626
});
viewer.addControl(toggleTool.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });

const anno = Annotorious(viewer, {
  allowEmpty: true,
  widgets: [
    'COMMENT',
    { widget: 'TAG', vocabulary: [ 'Unknown', 'Unsure' ] }
  ]
});
anno.readOnly = true;
anno.visible = true;

if (process.env.NODE_ENV == "development") {
  function updateAnnotations() {
    const xhr = new XMLHttpRequest();   // new HttpRequest instance
    xhr.open('POST', '/annotations/' + MD5(JSON.stringify(viewer.tileSources)));
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(anno.getAnnotations()));
  }

  viewer.addControl(rectangleTool.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });
  viewer.addControl(polygonTool.element, { anchor: OpenSeadragon.ControlAnchor.TOP_LEFT });

  anno.readOnly = false;
  anno.on('createAnnotation', () => updateAnnotations());
  anno.on('updateAnnotation', () => updateAnnotations());
  anno.on('deleteAnnotation', () => updateAnnotations());
  anno.on('changeSelectionTarget', () => updateAnnotations());
}

anno.loadAnnotations('/annotations/' + MD5(JSON.stringify(viewer.tileSources)));
