var express = require('express');
const { token } = require('morgan');
const { userController } = require('../controllers');
var router = express.Router();
const tokenHandler = require('../handlers/tokenHandler');

router.post(
  '/',
  tokenHandler.verifyAdminToken,
  userController.create
)

router.get(
  '/',
  tokenHandler.verifyAdminToken,
  userController.getAll
)

router.get(
  '/:id',
  tokenHandler.verifyAdminToken,
  userController.getOne
)

router.put(
  '/:id',
  tokenHandler.verifyAdminToken,
  userController.update
)

router.delete(
  '/:id',
  tokenHandler.verifyAdminToken,
  userController.delete
)


//add vaccinated to user
router.post(
  '/vaccinated',
  tokenHandler.verifyAdminToken,
  userController.vaccinated
)

// find all places of user 
router.get(
  '/:userId/place',
  tokenHandler.verifyToken,
  userController.getAllPlace
)

// checkin place
router.post(
  '/checkin-place',
  tokenHandler.verifyToken,
  userController.checkinPlace
)

// get place that user checkin
router.get(
  '/:userId/place-visited',
  tokenHandler.verifyToken,
  userController.placeVisited
)
module.exports = router;
