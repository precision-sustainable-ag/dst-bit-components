import React from "react";
import { Spinner } from "./spinner";

export const BasicSpinner = () => <Spinner />;

export const SpinnerWithCustomSize = () => <Spinner size={"200px"} />;

export const SpinnerWithCustomColor = () => (
  <Spinner color={"red"} backgroundColor={"black"} />
);
