const express = require("express");
const bodyParser = require("body-parser");
const locationRoutes = require("./routes/location");
const app = express();
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// to allow the CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE",'OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(locationRoutes);

app.listen(process.env.PORT || 3000);
