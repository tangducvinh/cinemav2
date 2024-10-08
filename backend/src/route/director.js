const router = require("express").Router();

const {
  getListDirector,
  getDetailDirector,
} = require("../controllers/director");

router.get("/", getListDirector);
router.get("/detail-director", getDetailDirector);

module.exports = router;
