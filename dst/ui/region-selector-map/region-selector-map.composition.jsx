import React from "react";
import { RegionSelectorMap } from "./region-selector-map";
import { useState } from "react";
import { useEffect } from "react";

export const BasicRegionSelectorMap = () => (
  <RegionSelectorMap
    selectorFunction={() => {}}
    selectedState=""
    availableStates={[
    "Alabama",
    "Arkansas",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Ontario",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Vermont",
    "Virginia",
    "West Virginia",
    "Wisconsin"
    ]}
    initWidth="700px"
    initHeight="300px"
    initLon={-95}
    initLat={40}
    initStartZoom={2}
  />
);


export const WithInitRegionMap = () => {
  const [s, setS] = useState('Alabama');
  const [i, setI] = useState([
    "Alabama",
    "Arkansas",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Ontario",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Vermont",
    "Virginia",
    "West Virginia",
    "Wisconsin"
    ])

  return (
  <>
  <RegionSelectorMap
    selectorFunction={(selected) => {console.log('selected', selected)}}
    selectedState={s}
    availableStates={i}
    initWidth="700px"
    initHeight="300px"
    initLon={-95}
    initLat={40}
    initStartZoom={2}
  />
  <input value={s} onChange={(e) => setS(e.target.value)} />
  <input value={i.join(',')} onChange={(e) => {
    setI(e.target.value.split(','))
  }}/>
  </>
  );
  
};
