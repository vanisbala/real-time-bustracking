// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
  ];
  
  // accessToken obtained from mapbox
  mapboxgl.accessToken = 'pk.eyJ1IjoidmFuaWJhbGEiLCJhIjoiY2t0ZXlhNTRlMDJ2ejJvcWo3amh2OHpmZSJ9.2JucmPHzE8_fzECDmLRJdQ';
  
  // This is the map instance
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
  });
  
  //function to choose map style
  function check(buttonid) {
    console.log(buttonid);
    map.setStyle('mapbox://styles/mapbox/' + buttonid);
  }
  
  // Adding a marker to the map at the first coordinates in the array busStops. 
  let marker = new mapboxgl.Marker({ "color": "#0000FF" }).setLngLat([-71.093729, 42.359244]).addTo(map);
  // Adding markerend to the destination
  let markerend = new mapboxgl.Marker({ "color": "#FF00FF" }).setLngLat([-71.118625, 42.374863]).addTo(map);
  // counter here represents the index of the current bus stop
  let counter = 0;
  
  
  function move() {
    // move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
    // Using counter to access bus stops in the array busStops
    
    console.log(map.style);
    console.log("inside move");
    setTimeout(() => {
      if (counter >= busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
  
    },1000);
  }
  
  
  // Draw a direction line on the map between MIT and Harvard
  map.on('render', () => {
    map.addSource('route', {
      'type': 'geojson',
      'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
      'type': 'LineString',
      'coordinates': busStops
      }
      }
    });
    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'route',
      'layout': {
      'line-join': 'round',
      'line-cap': 'round'
      },
      'paint': {
      'line-color': '#2ee',
      'line-width': 4
      }
    });
  });
  
  // Do not edit code past this point
  if (typeof module !== 'undefined') {
    module.exports = { move };
  }
  