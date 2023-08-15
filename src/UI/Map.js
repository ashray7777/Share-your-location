export class Map {
    constructor(coords){
        // this.coordinates = coords;
        this.render(coords);
    }

    render(coordinates) {
        if (!ol){
            alert('Could not load maps library - please try again later');
            return;
        } else{
            document.getElementById('map').innerHTML= '';
            const key = 'SMQO44blB5u3ULvvaQZG';
            const source = new ol.source.TileJSON({
              url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`,
              tileSize: 512,
              crossOrigin: 'anonymous'
            });
            const attribution = new ol.control.Attribution({
                collapsible: false,
                });
                const map = new ol.Map({
                  layers: [
                    new ol.layer.Tile({
                      source: source
                    })
                  ],
                  controls: ol.control.defaults.defaults({attribution: false}).extend([attribution]),
                  target: 'map',
                  view: new ol.View({
                    constrainResolution: true,
                    center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
                    zoom: 14
                  })
                });
              
            const layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                  features: [
                  new ol.Feature({
                      geometry: new ol.geom.Point(ol.proj.fromLonLat([coordinates.lng, coordinates.lat])),
                  })
                  ]
              }),
              style: new ol.style.Style({
                  image: new ol.style.Icon({
                  anchor: [0.5, 1],
                  crossOrigin: 'anonymous',
                  src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
                  })
                })
              });
              map.addLayer(layer);           
            // const map = new ol.Map({
            //     view: new ol.View({
            //       center: ol.proj.fromLonLat[coordinates.lng, coordinates.lat],
            //       zoom: 4
            //     }),
            //     layers: [
            //       new ol.Tile({
            //         source: new ol.source.OSM(),
            //       }),
            //     ],
            //     target: 'map',
            //   });
        }
    }
}
