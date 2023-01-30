const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");
const imageUpload = require("../middleware/image-upload");
const HttpError = require("../models/http-error");


const router = express.Router();

router.get("/", usersController.getUsers);


router.post(
  "/signup",
  imageUpload,
  [
    check("name", "Enter a valid name").not().isEmpty(),
    check("email", "Enter a valid email address")
      .normalizeEmail() 
      .isEmail(),
    check("password", "Enter a valid password").isLength({ min: 6 }),
  ],
  usersController.signup
);
router.post("/login", usersController.login);

module.exports = router;
