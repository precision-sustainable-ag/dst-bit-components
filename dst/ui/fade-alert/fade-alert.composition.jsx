import React, { useState } from "react";
import { FadeAlert } from "./fade-alert";
import { Typography, Button } from "@mui/material";

export const BasicAlert = () => (
  <>
    <FadeAlert severity={"error"} message={"This is an error alert!"} />
    <br />
    <FadeAlert severity={"warning"} message={"This is a warning alert!"} />
    <br />
    <FadeAlert severity={"info"} message={"This is an info alert!"} />
    <br />
    <FadeAlert severity={"success"} message={"This is a success alert!"} />
  </>
);

export const AlertWithDifferentVariant = () => (
  <>
    <FadeAlert variant={"standard"} message={"This is a standard alert!"} />
    <br />
    <FadeAlert variant={"outlined"} message={"This is an outlined alert!"} />
    <br />
    <FadeAlert variant={"filled"} message={"This is a filled alert!"} />
  </>
);

export const CustomAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <FadeAlert
        showAlert={showAlert}
        variant={"filled"}
        severity={"error"}
        action={
          <Button
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setShowAlert(false)}
          >
            CLOSE
          </Button>
        }
        message={
          <Typography fontWeight={600}>
            Network Error - Try again later or refresh the page!
          </Typography>
        }
      />
      <br />
      <Button onClick={() => setShowAlert(true)}>Show Alert</Button>
    </>
  );
};
