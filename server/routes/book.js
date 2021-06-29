const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer.js");
const {
  compose,
  deleteBook,
  getSpecificThought,
} = require("../controllers/controllerBook");

router.put("/compose", upload.single("image"), compose);
router.put("/delete", deleteBook);
router.get("/thought/:thoughtID", getSpecificThought);

module.exports = router;
