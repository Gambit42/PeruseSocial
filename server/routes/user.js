const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");

const {
  getUser,
  updateUser,
  getCurrentUser,
} = require("../controllers/controllerUser");

router.get("/", getCurrentUser);
router.get("/:userName", getUser);
router.put("/update", upload.single("image"), updateUser);

module.exports = router;
