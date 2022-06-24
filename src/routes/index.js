var express = require('express');
var router = express.Router();

router.use('/admin', require("./adminRoute"));
router.use('/user', require("./userRoute"));
router.use('/place', require("./placeRoute"));
router.use('/vaccine', require("./vaccineRoute"));
router.use('/vaccine-lots', require("./vaccineLotRoute"));

module.exports = router;
