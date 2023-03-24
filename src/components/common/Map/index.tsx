import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import GoogleMapReact from "google-map-react";

import { Grid } from "@mui/material";
interface Props {
  lat: any;
  lng: any;
  className?: string;
}

// eslint-disable-next-line react/display-name
const Map = memo(({ lat, lng, className }: Props) => {
  return (
    <Grid className={className}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCe3Vka8IIYYbTKEzyV3x0Ay6HNAV8g6z8&libraries",
        }}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
        center={{ lat, lng }}
      >
        {" "}
        {/* <AnyReactComponent
                lat={coords.lat}
                lng={coords.lng}
                text={<FontAwesomeIcon icon={faLocationDot} />}
              /> */}
      </GoogleMapReact>
    </Grid>
  );
});

export default Map;
