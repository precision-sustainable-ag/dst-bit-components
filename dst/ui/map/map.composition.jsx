import React from 'react';
import { Map } from './map';

export const BasicMap = () => (
  <Map
    initWidth="400px"
    initHeight="300px"
    initLon={-75}
    initLat={40}
    initStartZoom={12}
  />
);
