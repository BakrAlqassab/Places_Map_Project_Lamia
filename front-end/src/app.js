// import { CollapseHandler } from "./Utility/collapseHandler.js";
import { Modal } from "./UI/Modal.js";
import { Map } from "./UI/Map.js";

class placeFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

   
    // const status = document.getElementById("status");
    // const mapLink = document.getElementById("status");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler);
  }

  selectPlace (coordiantes) {
    // / to reuse the existing one and just render the data
    if (this.map) {
      this.map.render(coordiantes);
    } else {
      this.map = new Map(coordiantes);
    }
  }
  locateUserHandler() {
        const mapArea = document.getElementById("selected-place");
    const searchSeaction = document.querySelector(".search-box");
    // unsupport broswser fall back
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more moder browser or manually enter the address! "
      );
      return;
    }
    const modal = new Modal(
      "loading-modal-content",
      "Loading location Please wait"
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        modal.hide();
        console.log(successResult);
        const myCoordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
     
        // this.selectPlace(myCoordinates);
        console.log(myCoordinates);
           searchSeaction.style.margin='2% 0% 1% 0%';
           mapArea.style.display = 'block';
      },
      (error) => {
        modal.hide();
        alert(
          " Could not locate you unfortunately, Please enter an address manually"
        );
      }
    );
  }
  findAddressHandler(e) {
    e.preventDefault();
    console.log("hrhr");
  }
}
new placeFinder();
