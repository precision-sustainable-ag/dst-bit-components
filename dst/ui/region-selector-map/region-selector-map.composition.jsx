import React from "react";
import { RegionSelectorMap } from "./region-selector-map";

export const BasicRegionSelectorMap = () => (
  <RegionSelectorMap
    selectorFunc={() => {}}
    selectedRegion={{}}
    initWidth="700px"
    initHeight="300px"
    initLon={-95}
    initLat={40}
    initStartZoom={2}
  />
);


export const WithInitRegionMap = () => (
  <RegionSelectorMap
    selectorFunc={() => {}}
    selectedRegion={{
      type: "Feature",
      id: 32,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-111.0524, 44.4784],
            [-111.0546, 45.001],
            [-110.7045, 44.9922],
            [-109.1032, 45.0058],
            [-108.3754, 44.9999],
            [-106.5974, 44.9948],
            [-105.9132, 45.0002],
            [-104.5919, 44.9986],
            [-104.0579, 44.9976],
            [-104.0545, 44.1804],
            [-104.053, 43.0006],
            [-104.0529, 42.147],
            [-104.0533, 41.0014],
            [-104.8553, 40.998],
            [-105.7044, 40.9969],
            [-106.4539, 41.0021],
            [-107.5006, 41.0023],
            [-108.5619, 41],
            [-109.05, 41.0007],
            [-110.5051, 40.9948],
            [-111.0468, 40.9979],
            [-111.0467, 42.0017],
            [-111.044, 43.2334],
            [-111.0524, 44.4784],
          ],
        ],
      },
      properties: {
        STATE_ID: 32,
        STATE_NAME: "Wyoming",
        STATE_ABBR: "WY",
      },
    }}
    initWidth="700px"
    initHeight="300px"
    initLon={-95}
    initLat={40}
    initStartZoom={2}
  />
);
