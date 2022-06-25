const { default: axios } = require("axios");
const Turf = require("turf");
const tomtomKey = require("../tomtomKey");

exports.getMidpoint = async (req, res, next) => {
  const positionA = req.body.positionA;
  const positionB = req.body.positionB;
  const filter = req.body.filter;

  const jsonDataA = await axios.get(
    `https://nominatim.openstreetmap.org/search.php?street=${positionA.street}&city=${positionA.city}&state=${positionA.state}&country=${positionA.country}&postalcode=${positionA.postalcode}&polygon_geojson=1&format=jsonv2`
  );
  const jsonDataB = await axios.get(
    `https://nominatim.openstreetmap.org/search.php?street=${positionB.street}&city=${positionB.city}&state=${positionB.state}&country=${positionB.country}&postalcode=${positionB.postalcode}&polygon_geojson=1&format=jsonv2`
  );

  const gpsA = {
    lat: jsonDataA.data[0].lat,
    lon: jsonDataA.data[0].lon,
  };

  const gpsB = {
    lat: jsonDataB.data[0].lat,
    lon: jsonDataB.data[0].lon,
  };

  const pointA = Turf.point([gpsA.lon, gpsA.lat]);
  const pointB = Turf.point([gpsB.lon, gpsB.lat]);

  const midpointGPS = Turf.midpoint(pointA, pointB).geometry.coordinates;

  const jsonDataTomTom = await axios.get(
    `https://api.tomtom.com/search/2/categorySearch/restaurant.json?limit=5&lat=${midpointGPS[1]}&lon=${midpointGPS[0]}&radius=200&categorySet=${filter}&view=Unified&relatedPois=off&key=${tomtomKey}`
  );

  const results = jsonDataTomTom.data.results;

  const gpsList = results.map((e) => {
    return e.position;
  });

  console.log(gpsList);

  res.status(200).json({
    pointA: gpsA,
    pointB: gpsB,
    filter: filter,
    midpoint: midpointGPS,
    gpsList: gpsList,
  });
};
