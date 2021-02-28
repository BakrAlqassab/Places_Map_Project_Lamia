const Google_API_KEY = "ENTER YOUR API KEY";

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  console.log(urlAddress);

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${Google_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates - Please try again!");
  }

  const data = await response.json();
  if (data.error_message) {
      console.log("location error");
    throw new Error(data.error_message);
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
console.log(data);
  
}
