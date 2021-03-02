const Google_API_KEY = "Enter Your Key Here";

//                              For getting the Address fom the Coords
export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${Google_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Address - Please try again!");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  const address = data.results[0].formatted_address;
  return address;
}

//                              For getting the cords  fom the netered address
export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  console.log(urlAddress);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${Google_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates - Please try again!");
    return;
  }

  const data = await response.json();
  if (data.error_message) {
    console.log("location error");
    throw new Error(data.error_message);
  }
    const coordinates = [];
  // const coordinates = data.results[0].geometry.location;
      for (let i = 0; i < data.results.length; i++) {
    coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],type:data.results[i].types})
     }
  return coordinates;
  console.log(data);
}

export async function getOpenSelectedLocations() {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=1500&type=restaurant&openNow=true&key=${Google_API_KEY}.`
  );

  // https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=YOUR_API_KEY

  //   const response = await fetch(
  //   `https://maps.googleapis.com/maps/api/place/${textsearch}/json?location=24.619782%2C46.707674&radius=1500&
  //   type=restaurant&keyword=falafel&opennow&key=AIzaSyDkPfPYplkD2DZNpOZoon5pOZPmg1E60So`
  // );
  if (!response.ok) {
    console.log("RESPONSE NOT OK");
    throw new Error("Failed to fetch coordinates - Please try again!");
    return;
  }

  const data = await response.json();
  if (data.error_message) {
    console.log("location error");
    throw new Error(data.error_message);
  }
  console.log("result length");
  console.log(data.results.length);
  // console.log(data);
  const coordinates = [];
  // for (let i = 0; i < data.results.length; i++) {
  //   coordinates.push(
  //     `{LatLng:[{lat:${data.results[i].geometry.location.lat},lng:${data.results[i].geometry.location.lng}}],type:${data.results[i].types}}`)
  //   // coordinates.push(data.results[i].geometry.location);

  // }

     for (let i = 0; i < data.results.length; i++) {
    coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],type:data.results[i].types})
     }
    // coordinates.push({latLng:[{lat:'55555',lng:'44444'}],type:'event'},{latLng:[{lat:'55dd555',lng:'44444'}],type:'event'})
  // console.log("coordinates");
  // console.log(coordinates);
  // data.results[0]

  return coordinates;
}
