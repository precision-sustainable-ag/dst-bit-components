import React from "react";
import { Alert, Fade } from "@mui/material";

export function Alert({
  showAlert = true,
  variant = "standard",
  severity = "error",
  action = null,
  message = "",
}) {
  return (
    <Fade in={showAlert}>
      <Alert variant={variant} severity={severity} action={action}>
        {message}
      </Alert>
    </Fade>
  );
}
