require("dotenv").config();
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const School = require("../models/school.model");

module.exports = {
    registerSchool: async (req, res) => {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) return res.status(500).json({ message: "Form parse error" });
                if (!files.image || !files.image[0]) return res.status(400).json({ message: "Image required" });

                const photo = files.image[0];
                const originalFilename = photo.originalFilename.replace(/\s+/g, "_");
                // FIXED: Added ".." to exit the controllers folder
                const newPath = path.join(__dirname, "..", process.env.SCHOOL_IMAGE_PATH, originalFilename);

                fs.copyFileSync(photo.filepath, newPath);

                const salt = bcrypt.genSaltSync(10);
                const hashPassWord = bcrypt.hashSync(fields.password[0], salt);

                const newSchool = new School({
                    school_name: fields.school_name[0],
                    email: fields.email[0],
                    owner_name: fields.owner_name[0],
                    password: hashPassWord,
                    school_image: originalFilename // Ensure this is in your model
                });

                const savedSchool = await newSchool.save();
                res.status(200).json({ success: true, data: savedSchool });
            });
        } catch (error) {
            res.status(500).json({ success: false, message: "Registration failed" });
        }
    },

    loginSchool: async (req, res) => {
        try {
            const school = await School.findOne({ email: req.body.email });
            if (!school) return res.status(401).json({ message: "Email not found" });

            const isAuth = bcrypt.compareSync(req.body.password, school.password);
            if (isAuth) {
                const token = jwt.sign({ id: school._id, role: "SCHOOL" }, process.env.JWT_SECRET);
                res.header("Authorization", token).status(200).json({ success: true, token, user: school });
            } else {
                res.status(401).json({ message: "Wrong password" });
            }
        } catch (error) {
            res.status(500).json({ message: "Login error" });
        }
    },

    getAllSchools: async (req, res) => {
        try {
            const schools = await School.find().select('-password');
            res.status(200).json({ success: true, schools });
        } catch (error) {
            res.status(500).json({ message: "Fetch error" });
        }
    },

    getSchoolOwnData: async (req, res) => {
        try {
            const school = await School.findById(req.query.id); // Get ID from query params
            if (!school) return res.status(404).json({ message: "Not found" });
            res.status(200).json({ success: true, school });
        } catch (error) {
            res.status(500).json({ message: "Fetch error" });
        }
    },

    updateSchool: async (req, res) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                // FIXED: Get ID from the form fields
                const id = fields.id ? fields.id[0] : null; 
                const school = await School.findById(id);
                if (!school) return res.status(404).json({ message: "School not found" });

                if (files.image && files.image[0]) {
                    const photo = files.image[0];
                    const originalFilename = photo.originalFilename.replace(/\s+/g, "_");

                    if (school.school_image) {
                        const oldPath = path.join(__dirname, "..", process.env.SCHOOL_IMAGE_PATH, school.school_image);
                        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                    }

                    const newPath = path.join(__dirname, "..", process.env.SCHOOL_IMAGE_PATH, originalFilename);
                    fs.copyFileSync(photo.filepath, newPath);
                    school.school_image = originalFilename;
                }

                // Update text fields
                Object.keys(fields).forEach(field => {
                    if (field !== 'id') school[field] = fields[field][0];
                });

                const saved = await school.save();
                res.status(200).json({ success: true, message: "Updated!", data: saved });
            } catch (error) {
                res.status(500).json({ message: "Update error" });
            }
        });
    }
};