const router = require("express").Router();

const getListCountries = require("../controllers/country");

router.get("/", getListCountries);

module.exports = router;
