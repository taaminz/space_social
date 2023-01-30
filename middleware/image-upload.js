const multer = require("multer");
const uuid = require("uuid");
const HttpError = require("../models/http-error");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: {
    fileSize: 1048576,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
  onFileSizeLimit: (file, cb) => {
    cb(new Error("File size exceeded the limit of 5000 bytes"), false);
  },
});

const upload = fileUpload.single("image");

const imageUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      const error = new HttpError("Image size should be less than 1 MB", 400);
      return next(error);
    } else if (!req.file) {
      return next(new HttpError("Please upload an image", 400));
    } else {
      return next();
    }
  });
};

module.exports = imageUpload;
