// import { CollapseHandler } from "./Utility/collapseHandler.js";
// import "./Utility/autoComplete";
import { Modal } from "./UI/Modal.js";
import { Map } from "./UI/Map.js";
import {
  getCoordsFromAddress,
  getAddressFromCoords,
  getOpenSelectedLocations,
} from "./Utility/Location";

class placeFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    //
    const fetchPlaces = document.getElementById("fetchPlaces");
    //
    const SearchPlaces = document.querySelector(".search-bar");
    this.mapArea = document.getElementById("selected-place");
    this.searchSeaction = document.querySelector(".search-box");
    this.statusText = document.getElementById("status");
    let autoComplete;

    // const status = document.getElementById("status");
    // const mapLink = document.getElementById("status");
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    fetchPlaces.addEventListener("click", this.openSelectedPlaces.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }

  selectPlace(coordinates, address) {

    // To reuse the existing one and just render the data
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    fetch("http://localhost:3000/add-location", {
      method: "POST",
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch coordinates - Please try again!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error_message) {
          throw new Error(data.error_message);
        }
     
      });
  }

  async openSelectedPlaces() {
    const openPlaces = await getOpenSelectedLocations();
    //  console.log('openPlaces');
    // console.log(openPlaces);
    // const address = await getAddressFromCoords(openPlaces);
    // console.log('openPlaces');
    // console.log(openPlaces);
  //  this.statusText.textContent = address;
    this.selectPlace(openPlaces, '');
    this.searchSeaction.style.margin = "0%";
    this.mapArea.style.display = "block";
    // console.log("Open Places");
    // console.log(openPlaces);
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
      async (successResult) => {
        modal.hide();
        const myCurrentCoordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };

        const address = await getAddressFromCoords(myCurrentCoordinates);

        this.selectPlace(myCurrentCoordinates, address);
        console.log(myCurrentCoordinates);
        this.searchSeaction.style.margin = "0%";
        this.mapArea.style.display = "block";
         this.statusText.textContent = address;
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
      this.statusText.textContent =
        "Invalid entered address - Please try again! ";
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

      this.selectPlace(coordinates, address);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    modal.hide();
    this.statusText.textContent = address;
    this.searchSeaction.style.margin = "0%";
    this.mapArea.style.display = "block";
  }
}
new placeFinder();
