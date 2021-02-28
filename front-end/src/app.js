// import { CollapseHandler } from "./Utility/collapseHandler.js";
// import "./Utility/autoComplete";
import { Modal } from "./UI/Modal.js";
import { Map } from "./UI/Map.js";
import { getCoordsFromAddress } from "./Utility/Location";

class placeFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    const SearchPlaces = document.querySelector(".search-bar");
    this.mapArea = document.getElementById("selected-place");
    this.searchSeaction = document.querySelector(".search-box");
    let autoComplete;

    // const status = document.getElementById("status");
    // const mapLink = document.getElementById("status");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordiantes) {
    // / to reuse the existing one and just render the data
    if (this.map) {
      this.map.render(coordiantes);
    } else {
      this.map = new Map(coordiantes);
    }
  }
  locateUserHandler() {
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
        const myCurrentCoordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        // this.selectPlace(myCurrentCoordinates);
        console.log(myCurrentCoordinates);
        this.searchSeaction.style.margin = "2% 0% 1% 0%";
        this.mapArea.style.display = "block";
      },
      (error) => {
        modal.hide();
        alert(
          " Could not locate you unfortunately, Please enter an address manually"
        );
        return;
      }
    );
  }

  async findAddressHandler(e) {
    e.preventDefault();
    const address = e.target.querySelector("input").value;
    if (!address || address.trim().length === 0) {
      alert("Invalid entered address - Please try again! ");
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Loading location Please wait"
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address);
      // this.selectPlace(coordinates);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    modal.hide();
    this.searchSeaction.style.margin = "2% 0% 1% 0%";
    this.mapArea.style.display = "block";
  }
}
new placeFinder();
