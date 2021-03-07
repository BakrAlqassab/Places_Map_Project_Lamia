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
    const fetchPlaces = document.querySelector(".looking-for-form");
    //
    const SearchPlaces = document.querySelector(".search-bar");
    this.mapArea = document.getElementById("selected-place");
    this.searchSeaction = document.querySelector(".search-box");
    this.statusText = document.getElementById("status");
    this.selectedCategory;
    this.openTime;
    this.coordinatesForSearchArround=[];
    let autoComplete;

    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
    fetchPlaces.addEventListener("submit", this.openSelectedPlaces.bind(this));
    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
  }
  alertFunc() {
    this.statusText.textContent = " ";
  }
  clearStatus(message, clear, seconds) {
    this.statusText.textContent = message;
    if (clear) {
      setTimeout(function () {
        this.alertFunc;
      }, seconds);
    }
  }
  styleSearchboxWhenMapRender() {
    this.searchSeaction.style.margin = "0%";
    this.mapArea.style.display = "block";
  }
 unsupportBrowsersHandler() {
    // unsupport broswser fall back
    if (!navigator.geolocation) {
      alert(
        "Location feature is not available in your browser - please use a more moder browser or manually enter the address! "
      );
      return;
    }
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

  async openSelectedPlaces(e) {
    e.preventDefault();
    const types = document.getElementsByName("type");
    const open = document.getElementsByName("open");
    for (let i = 0; i < types.length; i++) {
      if (types[i].checked) {
        this.selectedCategory = types[i].value;
      } else {
        this.clearStatus("Should select one of the places first", true, 5000);
      }
    }

    for (let i = 0; i < open.length; i++) {
      if (open[i].checked) {
        this.openTime = open[i].value;
      }
    }

    // get  current user's coordinates to search arround it
        this.unsupportBrowsersHandler();
        navigator.geolocation.getCurrentPosition(
      async (successResult) => {
    const  myCurrentCoordinates = {
        lat: successResult.coords.latitude,
        lng: successResult.coords.longitude,
      };
        console.log('myCurrentCoordinates1');
    console.log(myCurrentCoordinates);
     const address = await getAddressFromCoords(myCurrentCoordinates);
    if (this.selectedCategory && this.openTime) {
      const openPlaces = await getOpenSelectedLocations(
        this.selectedCategory,
        this.openTime,
        myCurrentCoordinates
      );
      this.selectPlace(openPlaces, "");
      this.styleSearchboxWhenMapRender();
    }
    });
    console.log('myCurrentCoordinates2');
    console.log(this.coordinatesForSearchArround);

  }
  locateUserHandler() {
    // unsupport broswser fall back
      this.unsupportBrowsersHandler();

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
        this.styleSearchboxWhenMapRender();

        this.clearStatus(address, false, "");
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
      this.clearStatus(
        "Invalid entered address - Please try again! ",
        true,
        5000
      );

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
      this.clearStatus(err, true, 5000);
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
