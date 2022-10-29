import SearchBox from "./SearchBox";
import Maps from "./Maps";
import { IAdressLatLon } from "./types";
import "./style.css";

interface MapsProps {
  addressLatLon: IAdressLatLon;
  setAddressLatLon: React.Dispatch<React.SetStateAction<IAdressLatLon>>;
}

export const OpenStreetMapComponent = ({
  addressLatLon,
  setAddressLatLon,
}: MapsProps) => {
  return (
    <div className="container-map">
      <div className="container-search">
        <SearchBox setAddressLatLon={setAddressLatLon} />
      </div>
      <div className="map">
        <Maps
          addressLatLon={addressLatLon}
          setAddressLatLon={setAddressLatLon}
        />
      </div>
    </div>
  );
};
