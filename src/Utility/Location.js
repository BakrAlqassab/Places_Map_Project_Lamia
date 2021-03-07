const Google_API_KEY = "AIzaSyDRENO4_Rz8_aVgj7KVXI8UsxabmJ12kiA";

//                              For getting the Address fom the Coords
export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${Google_API_KEY}`, {mode: 'cors'}
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

//                              For getting the cords fom the netered address
export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  console.log(urlAddress);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${Google_API_KEY}`, {mode: 'cors'}
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
      coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],formatted_address:data.results[i].formatted_address,name:data.results[i].name,rating:data.results[i].rating})
     }
  return coordinates;
  console.log(data);
}

//                                        getting places from selected category and chooose between opennow or all the times
export async function getOpenSelectedLocations(type,open,coords) {
  console.log(type,open,coords);
  const response = await fetch(
    // `https://maps.googleapis.com/maps/api/place/textsearch/json?radius=1500&type=restaurant&${open}&key=${Google_API_KEY}.`,
   `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${coords.lat},${coords.lng}&query=${type}&sensor=true&${open}&radius=2000&key=${Google_API_KEY}`, {mode: 'no-cors'}
  );


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
  console.log(data);

  const coordinates = [];

     for (let i = 0; i < data.results.length; i++) {
    coordinates.push({latLng:[{lat:data.results[i].geometry.location.lat,lng:data.results[i].geometry.location.lng}],formatted_address:data.results[i].formatted_address,name:data.results[i].name,rating:data.results[i].rating})
     }


  return coordinates;
}
