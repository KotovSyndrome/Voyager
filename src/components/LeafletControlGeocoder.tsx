import { useEffect } from "react";
import * as L from 'leaflet';
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {Geocoder, geocoders} from 'leaflet-control-geocoder';
import { Marker } from 'react-leaflet'
import { icon } from "leaflet";

function LeafletControlGeocoder() {
    const map = useMap();

    useEffect(() => {    
        new Geocoder({
            geocoder: new geocoders.Nominatim(),
            position: 'topright',
            query: "",
            placeholder: "Search here...",
            // defaultMarkGeocode: false,
        })
        .on("markgeocode", function (e) {
            console.log(e);
            const latlng = e.geocode.center;
            L.marker(latlng, { icon })
                .addTo(map)
                .bindPopup(e.geocode.name)
                .openPopup();
            map.fitBounds(e.geocode.bbox);
        })
        .addTo(map);
    }, []);
  
    return null;
  }

  export default LeafletControlGeocoder;