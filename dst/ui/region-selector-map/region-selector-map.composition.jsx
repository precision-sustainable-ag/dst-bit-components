import React from 'react';
import { RegionSelectorMap } from './region-selector-map';

export const BasicRegionSelectorMap = () => (
  <RegionSelectorMap
    selectorFunc={() => {}}
    selectedRegion=""
    initWidth="700px"
    initHeight="300px"
    initLon={-95}
    initLat={40}
    initStartZoom={2}
  />
);
