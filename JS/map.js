var map = new maplibregl.Map({
  container: "map",
  style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  center: [77.4126, 23.2599],
  zoom: 3,
  pitch: 40,
  bearing: 20,
});

map.on("load", function () {
  map.loadImage(
    "https://maplibre.org/maplibre-gl-js-docs/assets/custom_marker.png",
    function (error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);
    }
  );

  map.addControl(new maplibregl.NavigationControl());

  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description: "<p style='color: black; font-size:15px; font-family:josefin sans; text-align:center;'> Bhopal, <br> Madhya Pradesh, <br> India </p>",
          },
          geometry: {
            type: "Point",
            coordinates: [77.4126, 23.2599],
          },
        }
      ],
    },
  });

  //layers
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": "custom-marker",
      "icon-overlap": "always",
    },
  });
  
  var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mouseenter", "places", function (e) {
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
