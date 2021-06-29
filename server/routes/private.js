const express = require("express");
const router = express.Router();

const { session, endSession } = require("../controllers/controllerPrivate");

router.get("/hasSession", session);
router.get("/endSession", endSession);

module.exports = router;
