const Officer = require("../models/officer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

exports.addOfficer = async (req, res) => {
  try {
    const { officerId, name, designation, description } = req.body;
    const photo = req.file.filename;

    const newOfficer = new Officer({ officerId, name, designation, description, photo });

    await newOfficer.save();
    res.status(201).send("Officer added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateOfficer = async (req, res) => {
  try {
    const { officerId, name, designation, description } = req.body;
    const updateData = { officerId, name, designation, description };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const officer = await Officer.findOne({ officerId: req.params.officerId });

    if (!officer) {
      return res.status(404).send("Officer not found");
    }

    const oldPhoto = officer.photo;
    const updatedOfficer = await Officer.findOneAndUpdate({ officerId: req.params.officerId }, updateData, { new: true });

    if (req.file && oldPhoto) {
      fs.unlinkSync(path.join(__dirname, "../uploads", oldPhoto));
    }

    res.status(200).send("Officer updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteOfficer = async (req, res) => {
  try {
    const officer = await Officer.findOne({ officerId: req.params.officerId });

    if (!officer) {
      return res.status(404).send("Officer not found");
    }

    const photo = officer.photo;
    await Officer.deleteOne({ officerId: req.params.officerId });

    if (photo) {
      fs.unlinkSync(path.join(__dirname, "../uploads", photo));
    }

    res.status(200).send("Officer deleted successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
