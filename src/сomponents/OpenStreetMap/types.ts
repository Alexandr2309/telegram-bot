export interface IPlaces {
  address: IAdress;
  boundingbox: string[];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  licence: string;
  lat: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
}

export interface IAdress {
  city: string;
  city_district: string;
  country: string;
  country_code: string;
  house_number: string;
  neighbourhood: string;
  postcode: string;
  road: string;
  shop: string;
  suburb: string;
}

export interface IAdressLatLon {
  lat: number | null;
  lng: number | null;
}
