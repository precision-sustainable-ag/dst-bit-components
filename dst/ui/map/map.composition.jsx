import React from 'react';
import { Map } from './map';

export const PlainMapWithoutFeatures = () => (
  <Map
    setAddress={() => {}}
    setGeometry={() => {}}
    initWidth="400px"
    initHeight="300px"
    initLon={-80.16}
    initLat={37.75}
    initStartZoom={10}
    initMinZoom={5}
    initMaxZoom={16}
    hasSearchBar={false}
    hasMarker={false}
    hasNavigation={false}
    hasCoordBar={false}
    hasDrawing={false}
    hasGeolocate={false}
    hasFullScreen={false}
    hasMarkerPopup={false}
    hasMarkerMovable={false}
    scrollZoom={true}
    dragRotate={true}
    dragPan={true}
    keyboard={true}
    doubleClickZoom={false}
    touchZoomRotate={true}
  />
);

export const MapWithMarker = () => (
  <Map
    setAddress={() => {}}
    setGeometry={() => {}}
    initWidth="400px"
    initHeight="300px"
    initLon={-80.16}
    initLat={37.75}
    initStartZoom={10}
    initMinZoom={5}
    initMaxZoom={16}
    hasSearchBar={false}
    hasMarker={true}
    hasNavigation={false}
    hasCoordBar={false}
    hasDrawing={false}
    hasGeolocate={false}
    hasFullScreen={false}
    hasMarkerPopup={true}
    hasMarkerMovable={true}
    scrollZoom={true}
    dragRotate={true}
    dragPan={true}
    keyboard={true}
    doubleClickZoom={false}
    touchZoomRotate={true}
  />
);

export const MapWithGeocoder = () => (
  <Map
    setAddress={() => {}}
    setGeometry={() => {}}
    initWidth="400px"
    initHeight="300px"
    initLon={-80.16}
    initLat={37.75}
    initStartZoom={10}
    initMinZoom={5}
    initMaxZoom={16}
    hasSearchBar={true}
    hasMarker={false}
    hasNavigation={false}
    hasCoordBar={false}
    hasDrawing={false}
    hasGeolocate={false}
    hasFullScreen={false}
    hasMarkerPopup={false}
    hasMarkerMovable={false}
    scrollZoom={true}
    dragRotate={true}
    dragPan={true}
    keyboard={true}
    doubleClickZoom={false}
    touchZoomRotate={true}
  />
);

export const MapWithAllFeatures = () => (
  <Map
    setAddress={() => {}}
    setGeometry={() => {}}
    initWidth="400px"
    initHeight="300px"
    initLon={-80.16}
    initLat={37.75}
    initStartZoom={10}
    initMinZoom={5}
    initMaxZoom={16}
    hasSearchBar={true}
    hasMarker={true}
    hasNavigation={true}
    hasCoordBar={true}
    hasDrawing={true}
    hasGeolocate={true}
    hasFullScreen={true}
    hasMarkerPopup={true}
    hasMarkerMovable={true}
    scrollZoom={true}
    dragRotate={true}
    dragPan={true}
    keyboard={true}
    doubleClickZoom={false}
    touchZoomRotate={true}
  />
);
