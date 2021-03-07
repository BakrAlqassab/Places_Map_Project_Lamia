export class Map {
  constructor(coords) {
    this.render(coords);
    this.centerPosition;
  }
  render(coordinates) {
    //check if we have access to global google variable
    if (!google) {
      alert("could not load maps library - please try again later! ");
      return;
    }

    if (Array.isArray(coordinates)) {
      this.centerPosition = coordinates[0].latLng[0];
    } else {
      this.centerPosition = coordinates;
    }

    const map = new google.maps.Map(document.getElementById("map"), {
      center: this.centerPosition,
      zoom: 14,
    });

    // check if the coordinates contain only one place or as Array
    let marker = "";
    let infowindow = new google.maps.InfoWindow();
    let InfoObj = [];
    function closeOtherInfoWindows() {
      console.log(InfoObj.length);
      if (InfoObj.length > 0) {
        InfoObj[0].set("marker", null);
        InfoObj[0].close();
        InfoObj.length = 0;
      }
    }
    if (Array.isArray(coordinates)) {
      for (let i = 0; i < coordinates.length; i++) {
        var contentString = `<div style='color:black'><h3> ${coordinates[i].name}</h3><br><h3> ${coordinates[i].rating}</h3><br> <h5>${coordinates[i].formatted_address}</h5></div>`;
        marker = new google.maps.Marker({
          position: coordinates[i].latLng[0],
          map: map,
        });

        let infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              // add the data to the infoWindow in the map
              closeOtherInfoWindows();
              infowindow.open(marker.get("map"), marker);
              InfoObj[0] = infowindow;
            };
          })(marker, i)
        );
      }
    } else {
      marker = new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    }
  }
}
