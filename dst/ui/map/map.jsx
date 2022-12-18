import React, { useRef, useEffect, useState } from 'react';
// import { useCursorLoc } from './hooks';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import area from '@turf/area';
import centroid from '@turf/centroid';
import { geocodeReverse, coordinatesGeocoder } from './helpers';

import styles from './map.module.scss';
import './mapbox-gl.css';
import './mapbox-gl-draw.css';
import './mapbox-gl-geocoder.css';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWlsYWRueXUiLCJhIjoiY2xhNmhkZDVwMWxqODN4bWhkYXFnNjRrMCJ9.VWy3AxJ3ULhYNw8nmVdMew';
mapboxgl.accessToken = MAPBOX_TOKEN;

const acreDiv = 4046.856422;
const fastFly = {
  bearing: 0,
  speed: 4, // Make the flying slow/fast.
  curve: 5, // Change the speed at which it zooms out.
  easing: (t) => t ** 2,
};

const Map = ({
  setAddress = () => {},
  setGeometry = () => {},
  initWidth = '400px',
  initHeight = '400px',
  initLon = -75,
  initLat = 40,
  initStartZoom = 12,
  initMinZoom = 5,
  initMaxZoom = 16,
  hasSearchBar = false,
  hasMarker = false,
  hasNavigation = false,
  hasCoordBar = false,
  hasDrawing = false,
  hasGeolocate = false,
  hasFullScreen = false,
  hasMarkerPopup = false,
  hasMarkerMovable = false,
  scrollZoom = true,
  dragRotate = true,
  dragPan = true,
  keyboard = true,
  doubleClickZoom = false,
  touchZoomRotate = true,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [viewport, setViewport] = useState({
    initWidth,
    initHeight,
    initLon,
    initLat,
    initStartZoom,
    initMinZoom,
    initMaxZoom,
  });
  const [marker, setMarker] = useState({
    longitude: initLon,
    latitude: initLat,
  });
  const [cursorLoc, setCursorLoc] = useState({
    longitude: undefined,
    latitude: undefined,
  });
  const [polygonArea, setPolygonArea] = useState(0);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const [geocodeResult, setGeocodeResult] = useState(undefined);
  const [popupOpen, setPopupOpen] = useState(true);
  const [flyToOptions, setFlyToOptions] = useState({});

  const map = useRef();
  const mapContainer = useRef();
  const drawerRef = useRef();
  const markerRef = useRef();
  const popupRef = useRef();

  // delete all shapes after geocode search
  useEffect(() => {
    if (hasDrawing && drawerRef.current) drawerRef.current.deleteAll();
  }, [geocodeResult]);

  // upon marker move, find the address of this new location and set the state
  useEffect(() => {
    geocodeReverse({
      apiKey: MAPBOX_TOKEN,
      setterFunc: setAddress,
      longitude: marker.longitude,
      latitude: marker.latitude,
    });
    setAddress((addr) => ({
      ...addr,
      longitude: marker.longitude,
      latitude: marker.latitude,
    }));
    if (markerRef.current) {
      const lngLat = [marker.longitude, marker.latitude];
      popupRef.current.setHTML(
        `<span> click and drag </span>
      <br />
      <span>${marker.longitude.toFixed(4)}  ${marker.latitude.toFixed(
          4
        )}</span>`
      );
      markerRef.current.setLngLat(lngLat).setPopup(popupRef.current);
      map.current.flyTo({
        center: lngLat,
        ...flyToOptions,
      });
    }
  }, [marker.longitude, marker.latitude]);

  useEffect(() => {
    //// MAP CREATE
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [initLon, initLat],
      zoom: initStartZoom,
    });

    //// MARKER POPUP
    // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    //   'drag marker or double click anywhere'
    // );
    const Popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<span> click and drag </span>
      <br />
      <span>${marker.longitude.toFixed(4)}  ${marker.latitude.toFixed(
        4
      )}</span>`
    );
    popupRef.current = Popup;

    //// MARKER CONTROL
    const Marker = new mapboxgl.Marker({
      draggable: hasMarkerMovable,
      color: '#e63946',
      scale: 1,
    })
      .setLngLat([marker.longitude, marker.latitude])
      .setPopup(Popup);
    markerRef.current = Marker;
    Marker.className = styles.marker;

    //// DRAWER CONTROL
    const Draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
    });
    drawerRef.current = Draw;

    //// GEOCODER CONTROL
    const Geocoder = new MapboxGeocoder({
      placeholder: 'Search Your Address ...',
      localGeocoder: coordinatesGeocoder,
      marker: false,
      accessToken: MAPBOX_TOKEN,
      container: map.current,
      countries: 'us',
    });

    //// GEOLOCATE CONTROL
    const Geolocate = new mapboxgl.GeolocateControl({ container: map.current });
    Geolocate._updateCamera = () => {};

    //// NAVIGATION CONTROL
    const Navigation = new mapboxgl.NavigationControl({
      container: map.current,
    });

    //// FULLSCREEN CONTROL
    const Fullscreen = new mapboxgl.FullscreenControl({
      container: map.current,
    });

    //// ADD CONTROLS
    if (hasFullScreen) map.current.addControl(Fullscreen, 'top-right');
    if (hasNavigation) map.current.addControl(Navigation, 'top-right');
    if (hasGeolocate) map.current.addControl(Geolocate, 'top-right');
    if (hasDrawing) map.current.addControl(Draw, 'top-left');
    if (hasSearchBar) map.current.addControl(Geocoder, 'top-left');
    if (hasMarker && !isDrawActive) Marker.addTo(map.current);

    //// FUNCTIONS
    function onDragEnd(e) {
      const lngLat = e.target.getLngLat();
      // map.current.flyTo({
      //   center: lngLat,
      // });
      setMarker((prev) => ({
        ...prev,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      }));
    }
    const handleGeolocate = (e) => {
      const lngLat = e.target._userLocationDotMarker._lngLat;
      setFlyToOptions(fastFly);
      setMarker((prev) => ({
        ...prev,
        longitude: lngLat.lng,
        latitude: lngLat.lat,
      }));
      setFlyToOptions({});

      // clear all shapes after geolocating to user's location
      if (hasDrawing && drawerRef.current) {
        console.log('drawerRef ', drawerRef);
        drawerRef.current.deleteAll();
        setPolygonArea(0);
      }
    };

    const handlePolyCentCalc = (geom) => {
      if (geom) {
        if (geom.features.length > 0) {
          const coords = centroid(geom.features[0]).geometry.coordinates;
          setMarker((prev) => ({
            ...prev,
            longitude: coords[0],
            latitude: coords[1],
          }));
          setViewport((prev) => ({
            ...prev,
            longitude: coords[0],
            latitude: coords[1],
          }));
        }
      }
    };

    const handlePolyAreaCalc = (e) => {
      if (e.features.length > 0) {
        const a = area(e.features[0]) / acreDiv;
        setPolygonArea(a);
        setGeometry(e.features);
        handlePolyCentCalc(e);
      } else {
        setPolygonArea(0);
      }
    };

    const handleDrawCreate = () => {};
    const handleDrawDelete = () => {
      setIsDrawActive(false);
    };
    const handleDrawUpdate = (e) => {
      handlePolyAreaCalc(e);
    };
    const handleDrawSelection = (e) => {
      handlePolyAreaCalc(e);
    };

    //// EVENTS
    Geolocate.on('geolocate', handleGeolocate);
    Geocoder.on('result', (e) => {
      var streetNum;
      var zipCode;
      if (e && e.result) {
        setGeocodeResult(e.result);
        var fullAddress = e.result.place_name;
        if (fullAddress.includes('Lat') && fullAddress.includes('Lng')) {
          let longitude = e.result.geometry.coordinates[0];
          let latitude = e.result.geometry.coordinates[1];
          console.log(longitude, latitude)
          geocodeReverse({
            apiKey: MAPBOX_TOKEN,
            setterFunc: setAddress,
            longitude: longitude,
            latitude: latitude,
          });
        } else {
          const splitted = fullAddress.split(', ');
          streetNum = splitted[0];
          const stateZip = splitted[splitted.length - 2].split(' ');
          zipCode = stateZip[stateZip.length - 1];
        }
        if (fullAddress) {
          setViewport((prev) => ({
            ...prev,
            address: streetNum,
            zipCode,
            fullAddress,
          }));
          setFlyToOptions(fastFly);
          setMarker((prev) => ({
            ...prev,
            longitude: e.result.center[0],
            latitude: e.result.center[1],
          }));
          setFlyToOptions({});
        }
      }
    });
    if (hasMarkerMovable) {
      map.current.on('dblclick', (e) => {
        setMarker((prev) => ({
          ...prev,
          longitude: e.lngLat.lng,
          latitude: e.lngLat.lat,
        }));
      });
    }
    map.current.on('mousemove', (e) => {
      const lnglat = e.lngLat.wrap();
      setCursorLoc({
        longitude: lnglat.lng.toFixed(4),
        latitude: lnglat.lat.toFixed(4),
      });
    });
    map.current.on('load', (e) => {
      if (!scrollZoom) map.current.scrollZoom.disable();
      if (!dragRotate) map.current.dragRotate.disable();
      if (!dragPan) map.current.dragPan.disable();
      if (!keyboard) map.current.keyboard.disable();
      if (!doubleClickZoom) map.current.doubleClickZoom.disable();
      if (!touchZoomRotate) map.current.touchZoomRotate.disable();
      if (hasMarkerPopup) {
        markerRef.current.togglePopup();
        setTimeout(() => markerRef.current.togglePopup(), 2000);
      }
    });
    map.current.on('draw.create', handleDrawCreate);
    map.current.on('draw.delete', handleDrawDelete);
    map.current.on('draw.update', handleDrawUpdate);
    map.current.on('draw.selectionchange', handleDrawSelection);
    Marker.on('dragend', onDragEnd);
  }, [map]);

  return (
    <div className={styles.wrapper}>
      <div
        id="map"
        ref={mapContainer}
        className={styles.map}
        style={{ width: initWidth, height: initHeight }}
      />
      {hasCoordBar && cursorLoc.longitude && (
        <div className={styles.infobar}>
          <ul>
            <li>{`Longitude:${cursorLoc.longitude}`}</li>
            <li>{`Latitude:${cursorLoc.latitude}`}</li>
            {polygonArea > 0 && (
              <li>{`Area ${polygonArea.toFixed(2)} acres`}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Map };
