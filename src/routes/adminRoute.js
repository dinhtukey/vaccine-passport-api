const express = require('express');
const { adminController } = require('../controllers');
const { verifyAdminToken } = require('../handlers/tokenHandler');
const router = express.Router();

router.post('/login', adminController.login);

router.get(
    '/summary',
    verifyAdminToken,
    adminController.summary
)
  
router.post(
    '/check-token',
    verifyAdminToken,
    (req, res) => {
        res.status(200).json("Authorized");
    }
)
module.exports = router;
  