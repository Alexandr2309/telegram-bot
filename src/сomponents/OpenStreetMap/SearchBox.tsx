import { useState } from "react";
import { IAdressLatLon, IPlaces } from "./types";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";

export interface IPropsSearchBox {
  setAddressLatLon: React.Dispatch<React.SetStateAction<IAdressLatLon>>;
}

export default function SearchBox(props: IPropsSearchBox) {
  const { setAddressLatLon } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState<IPlaces[]>([]);
  const [isChoseAddress, setIsChoseAddress] = useState<boolean>(false);

  const onSearchHandler = () => {
    setIsChoseAddress(false);
    fetch(
      `${NOMINATIM_BASE_URL}?q=${searchText}&format=json&addressdetails=1&polygon_geojson=0`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((response) => response.text())
      .then((result) => {
        let foundPlaces: IPlaces[] = JSON.parse(result);
        foundPlaces.length = 6;
        setListPlace(foundPlaces);
      })
      .catch((err) => console.log("err: ", err));
  };

  const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="search-address">
        <input
          className="search-address-input"
          value={searchText}
          onChange={onChangeSearchInput}
          placeholder="Search place..."
        />
        <button className="search-address-button" onClick={onSearchHandler}>
          Search
        </button>
        <div
          className="search-address-result"
          aria-label="main mailbox folders"
        >
          {!isChoseAddress &&
            listPlace.map((place) => {
              return (
                <div key={place.place_id}>
                  <div
                    onClick={() => {
                      setAddressLatLon({ lat: +place.lat, lng: +place.lon });
                      setIsChoseAddress(true);
                    }}
                  >
                    <span>{place.display_name}</span>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
