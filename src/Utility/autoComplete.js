// import { Map } from "../UI/Map";

let autoComplete;

function initAutocomplete() {
  autoComplete = new google.maps.places.Autocomplete(
    document.getElementById("autoComplete"),
    {
      // types: ['geocode']
      types: ["establishment"],
      componentRestrictions: { country: ["FI"] },
      fields: ["place_id", "geometry", "name"],
    }
  );

  let near_location;
  google.maps.event.addListener(autoComplete, "place_changed", function () {
    near_location = autoComplete.getPlace();
    const myCoordinates = {
      lat: near_location.geometry.location.lat(),
      lng: near_location.geometry.location.lng(),
    };
  
    // this.selectPlace(myCoordinates);
  });
}
