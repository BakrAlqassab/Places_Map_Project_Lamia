export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
    this.centerPosition;
  }
  render(coordinates) {
    console.log("coordinates");
    console.log(coordinates);
    console.log(Array.isArray(coordinates));
    //check if we have access to global google variable
    if (!google) {
      alert("could not load maps library - please try again later! ");
      return;
    }

    if (Array.isArray(coordinates)) {
      this.centerPosition = coordinates[0].latLng[0]
      console.log(  this.centerPosition);
    } else {
      this.centerPosition = coordinates
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: this.centerPosition ,
      zoom: 14,
    });

   // check if the coordinates contain only one place or as Array
    if (Array.isArray(coordinates)) {
      for (let i = 0; i < coordinates.length; i++) {
        const marker = new google.maps.Marker({
          position: coordinates[i].latLng[0],
          map: map,
        });
      }
    } else {
      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    }

  }
}
