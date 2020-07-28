import React, { useState, Fragment } from "react";

import Fab from "@material-ui/core/Fab";
import ExploreIcon from "@material-ui/icons/Explore";

import MapDialog from './MapDialog'

export default function MapContainer() {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  
  function handleOpen() {
    setOpen(true);
  }

  return (
    <Fragment>
      <Fab onClick={handleOpen} color={open ? "primary" : "default"}>
        <ExploreIcon />
      </Fab>
      <MapDialog
        open={true}
        onClose={handleClose}
      />
    </Fragment>
  );
}
