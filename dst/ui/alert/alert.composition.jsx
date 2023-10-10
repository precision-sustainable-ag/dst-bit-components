import React, { useState } from "react";
import { Alert } from "./alert";
import { Typography, Button } from "@mui/material";

export const BasicAlert = () => (
  <>
    <Alert severity={"error"} message={"This is an error alert!"} />
    <br />
    <Alert severity={"warning"} message={"This is a warning alert!"} />
    <br />
    <Alert severity={"info"} message={"This is an info alert!"} />
    <br />
    <Alert severity={"success"} message={"This is a success alert!"} />
  </>
);

export const AlertWithDifferentVariant = () => (
  <>
    <Alert variant={"standard"} message={"This is a standard alert!"} />
    <br />
    <Alert variant={"outlined"} message={"This is an outlined alert!"} />
    <br />
    <Alert variant={"filled"} message={"This is a filled alert!"} />
  </>
);

export const CustomAlert = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <Alert
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
