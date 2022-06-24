var express = require('express');
const { vaccineController } = require('../controllers');
var router = express.Router();
const tokenHandler = require("../handlers/tokenHandler");

router.post(
    '/',
    tokenHandler.verifyAdminToken,
    vaccineController.create
)

router.get(
    '/',
    tokenHandler.verifyAdminToken,
    vaccineController.getAll
)

router.get(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineController.getOne
)

router.put(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineController.update
)

router.delete(
    '/:id',
    tokenHandler.verifyAdminToken,
    vaccineController.delete
)

module.exports = router