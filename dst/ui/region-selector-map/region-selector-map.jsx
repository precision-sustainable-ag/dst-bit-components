import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "./map.module.scss";
import "./mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWlsYWRueXUiLCJhIjoiY2xhNmhkZDVwMWxqODN4bWhkYXFnNjRrMCJ9.VWy3AxJ3ULhYNw8nmVdMew";
mapboxgl.accessToken = MAPBOX_TOKEN;

let hoveredStateId = null;
let selectedStateId = null;

const RegionSelectorMap = ({
  selectorFunc = () => {},
  selectedRegion = {},
  initWidth = "400px",
  initHeight = "400px",
  initLon = -95,
  initLat = 40,
  initStartZoom = 2,
}) => {
  const [hoveredStateName, setHoveredStateName] = useState("");
  const [selectedRegionInit, setSelectedRegionInit] = useState(false);
  const map = useRef();
  const mapContainer = useRef();

  useEffect(() => {
    //// MAP CREATE
    if (selectedRegion.id && !selectedRegionInit) {
      selectedStateId = selectedRegion.id;
      setSelectedRegionInit(true)
    }

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
      // Add a data source containing GeoJSON data.
      map.current.addSource("states", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson",
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
            "#2ec4b6",
            "#3a0ca3",
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
          "line-width": 3,
        },
      });

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
        selectorFunc({
          id: e.features[0].id,
          name: e.features[0].properties.STATE_NAME,
        });
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
    });
  }, [hoveredStateId, selectedStateId, hoveredStateName, selectedRegion]);


  return (
    <div className={styles.wrapper}>
      <div
        id="map"
        ref={mapContainer}
        className={styles.map}
        style={{ width: initWidth, height: initHeight }}
      />
      {hoveredStateId && (
        <div className={styles.infobar}>
          <ul>
            <li>{`${hoveredStateName}`}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { RegionSelectorMap };
