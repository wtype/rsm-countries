import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const countries = [];
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
  const [zoom, setZoom] = useState(1.15);

  function handleZoomIn() {
    if (zoom >= 4) return;
    setZoom(zoom * 2);
  }

  function handleZoomOut() {
    if (zoom <= 1) return;
    setZoom(zoom / 2);
  }

  function handleZoomEnd(position) {
    setZoom(position.zoom);
  }

  useEffect(() => {
    (async () => {
      const geos = await fetch(geoUrl);
      const json = await geos.json();
      json.objects.ne_110m_admin_0_countries.geometries.forEach(geo => {
        countries.push(geo.properties.NAME);
      });
    })();
  }, []);

  return (
    <div>
      <ComposableMap>
        <ZoomableGroup zoom={zoom} onZoomEnd={handleZoomEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} fill={"#6de4ff"} stroke={"#ff6666"} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#ffffff"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#ffffff"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapChart;
