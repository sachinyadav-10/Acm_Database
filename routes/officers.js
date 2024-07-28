const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

const {
  addOfficer,
  updateOfficer,
  deleteOfficer,
} = require("../controllers/updateOfficers");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Middleware to check if ID is valid ObjectId
const checkObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ID");
  }
  next();
};

// Routes
router.post("/add", upload.single("photo"), addOfficer);
router.put("/update/:id", checkObjectId, upload.single("photo"), updateOfficer);
router.delete("/delete/:id", checkObjectId, deleteOfficer);

module.exports = router;
