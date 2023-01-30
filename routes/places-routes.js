const express = require("express");
const { check } = require("express-validator");

const placeControllers = require("../controllers/places-controllers");
const imageUpload = require("../middleware/image-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.use(checkAuth);


router.post(
  "/",
  imageUpload,
  [
    check("title","Enter a valid title").not().isEmpty(),
    check("description", "Enter a valid description").isLength({ min: 5 }),
    check("address","Enter a valid description").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
