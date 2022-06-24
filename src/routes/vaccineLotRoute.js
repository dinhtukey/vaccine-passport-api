var express = require('express');
const { vaccineLotController } = require('../controllers');
var router = express.Router();
const tokenHandler = require("../handlers/tokenHandler");

router.post(
    '/',
    tokenHandler.verifyAdminToken,
    vaccineLotController.create
)

router.get(
    '/',
    tokenHandler.verifyAdminToken,
    vaccineLotController.getAll
)

router.get(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineLotController.getOne
)

router.put(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineLotController.update
)

router.delete(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineLotController.delete
)


module.exports = router;