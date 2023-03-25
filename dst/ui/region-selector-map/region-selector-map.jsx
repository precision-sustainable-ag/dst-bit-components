import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "./map.module.scss";
import boundaries from "./us_states-ca_ab-ca_on.geojson";
import "./mapbox-gl.css";

// source of us-canada.geojson:
// https://cartographyvectors.com/map/793-combined-us-canada-with-states-provinces

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWlsYWRueXUiLCJhIjoiY2xhNmhkZDVwMWxqODN4bWhkYXFnNjRrMCJ9.VWy3AxJ3ULhYNw8nmVdMew";
mapboxgl.accessToken = MAPBOX_TOKEN;

let hoveredStateId = null;
let selectedStateId = null;
let boundaryData = null;

const RegionSelectorMap = ({
  selectorFunc = () => {},
  selectedRegion = {
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
  },
  initWidth = "400px",
  initHeight = "400px",
  initLon = -95,
  initLat = 40,
  initStartZoom = 2,
}) => {
  const [hoveredStateName, setHoveredStateName] = useState("");
  const [selectedRegionInit, setSelectedRegionInit] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const map = useRef();
  const mapContainer = useRef();

  useEffect(() => {
    if (!boundaryData) {
      fetch(boundaries)
        .then((r) => r.text())
        .then((text) => {
          let json = JSON.parse(text);
          boundaryData = json;
        });
    }
    //// MAP CREATE
    if (map.current) return; // initialize map only once
    var Map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initLon, initLat],
      zoom: initStartZoom,
      minZoom: 2,
      maxZoom: 5,
      projection: "albers",
    });
    map.current = Map;
    map.current.on("load", () => {
      // remove unnecessary labels: country labels
      Object.values(map.current.style._layers).forEach((l) => {
        if (l.type == "symbol" && l.id !== "state-label")
          map.current.setLayoutProperty(l.id, "visibility", "none");
      });
      Object.values(map.current.style._layers).forEach((l) => {
        if (l.type == "line")
          map.current.setLayoutProperty(l.id, "visibility", "none");
      });

      // Add a data source containing GeoJSON data.
      map.current.addSource("states", {
        type: "geojson",
        data: boundaries,
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      map.current.addLayer({
        id: "state-fills",
        type: "fill",
        source: "states",
        layout: {},
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            "#000",
            "#ccc",
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.9,
            0.5,
          ],
        },
      });
      map.current.addLayer({
        id: "state-borders",
        type: "line",
        source: "states",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 1,
        },
      });

      // apply initial selected region as hoghlighted
      if (selectedRegion.id && !selectedRegionInit) {
        selectedStateId = selectedRegion.id;
        setSelectedRegionInit(true);
        map.current.setFeatureState(
          { source: "states", id: selectedStateId },
          { click: false }
        );

        if (boundaryData && boundaryData.features) {
          let selectedFeature = boundaryData.features.filter(
            (el) => el.id === selectedStateId
          );
          if (selectedFeature.length > 0) selectedFeature = selectedFeature[0];
          selectorFunc(selectedFeature);
        }
        map.current.setFeatureState(
          { source: "states", id: selectedStateId },
          { click: true }
        );
      }

      // When the user moves their mouse over the state-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.current.on("mousemove", "state-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.current.setFeatureState(
              { source: "states", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          setHoveredStateName(e.features[0].properties.STATE_NAME);
          map.current.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: true }
          );
        }
      });

      map.current.on("mouseleave", "state-fills", (e) => {
        if (hoveredStateId !== null) {
          map.current.setFeatureState(
            { source: "states", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
        setHoveredStateName("");
      });

      map.current.on("click", "state-fills", (e) => {
        map.current.setFeatureState(
          { source: "states", id: selectedStateId },
          { click: false }
        );
        selectedStateId = e.features[0].id;

        if (boundaryData && boundaryData.features) {
          let selectedFeature = boundaryData.features.filter(
            (el) => el.id === selectedStateId
          );
          if (selectedFeature.length > 0) selectedFeature = selectedFeature[0];
          selectorFunc(selectedFeature);
        }
        map.current.setFeatureState(
          { source: "states", id: selectedStateId },
          { click: true }
        );
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "state-fills", () => {
        map.current.getCanvas().style.cursor = "pointer";
        map.current.style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "state-fills", () => {
        map.current.getCanvas().style.cursor = "";
      });
      // set the map loaded status
      if (!mapLoaded) setMapLoaded(true);
    });
  }, [hoveredStateId, selectedStateId, hoveredStateName, selectedRegion]);

  return (
    <>
      {!mapLoaded && (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            Loading . . .
          </div>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            id="map"
            ref={mapContainer}
            className={styles.map}
            style={{ width: initWidth, height: initHeight }}
          />
        </div>
        {hoveredStateId && (
          <div className={styles.infobar}>
            <ul>
              <li>{`${hoveredStateName}`}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export { RegionSelectorMap };
