const express = require("express");
const router = express.Router();
const locationStorage = {
  locations: [],
};

try {
  router.post("/add-location", (req, res, next) => {
    locationStorage.locations.push({
      id: Math.random(),
      address: req.body.address,
      coords: { lat: req.body.lat, lng: req.body.lng },
    });
    res.json({ message: "Stored Location" });
  });
} catch (err) {
  console.log(err);
  alert(err.message);
}

router.get("/location", (req, res, next) => {


    
});

module.exports = router;
