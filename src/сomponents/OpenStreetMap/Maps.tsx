import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "./location_marker.svg";
import L from "leaflet";
import { IAdressLatLon } from "./types";

const icon = L.icon({
  iconUrl: iconUrl,
  iconSize: [38, 38],
});

export interface IPropsResetCenterView {
  addressLatLon: IAdressLatLon;
}

function ResetCenterView(props: IPropsResetCenterView) {
  const { addressLatLon } = props;
  const map = useMap();

  useEffect(() => {
    if (addressLatLon.lat && addressLatLon.lng) {
      map.setView(
        L.latLng(addressLatLon.lat, addressLatLon.lng),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [addressLatLon, map]);

  return null;
}

export interface IPropsMaps {
  addressLatLon: IAdressLatLon;
  setAddressLatLon: React.Dispatch<React.SetStateAction<IAdressLatLon>>;
}

export default function Maps({ addressLatLon, setAddressLatLon }: IPropsMaps) {
  const center = {
    lat: 53.893009,
    lng: 27.567444,
  };

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setAddressLatLon(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <MapContainer
      center={center}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        <Marker
          position={
            addressLatLon.lat && addressLatLon.lng
              ? { lat: addressLatLon.lat, lng: addressLatLon.lng }
              : center
          }
          icon={icon}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Delivery location.</Popup>
        </Marker>
      }

      <ResetCenterView addressLatLon={addressLatLon} />
    </MapContainer>
  );
}
