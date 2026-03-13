//every controller will have CRUD fxnality
//Auth - school, student, school

require("dotenv").config()
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//ORIGINAL SCHOOLSCHEMA
const School = require("../models/school.model");


module.exports = {
    registerSchool: async (req, res) => {

        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) return res.status(500).json({ message: "Form parse error" });

                // Safety check for image
                if (!files.image || !files.image[0]) {
                    return res.status(400).json({ message: "School image is required" });
                }

                const photo = files.image[0];
                let filepath = photo.filepath;
                let originalFilename = photo.originalFilename.replace(" ", "_")   //photo one
                let newPath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFilename);

                let photoData = fs.readFileSync(filepath);
                fs.writeFileSync(newPath, photoData);

                const salt = bcrypt.genSaltSync(10);
                const hashPassWord = bcrypt.hashSync(fields.password[0], salt)
                const newSchool = new School({
                    school_name: fields.school_name[0],
                    email: fields.email[0],
                    owner_name: fields.owner_name[0],
                    password: hashPassWord
                })

                const savedSchool = await newSchool.save();
                res.status(200).json({
                    success: true,
                    data: savedSchool,
                    message: "School is registered successfully!"
                })
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "School registration failed"
            })
        }
    },
    loginSchool: async (req, res) => {
        try {
            const school = await School.findOne({ email: req.body.email });
            if (school) {
                const isAuth = bcrypt.compareSync(req.body.password, school.password)

                if (isAuth) {

                    const jwtSecret = process.env.JWT_SECRET;
                    const token = jwt.sign({
                        id: school._id,
                        schoolId: school._id,
                        owner_name: school.owner_name,
                        school_name: school.school_name,
                        image_url: school.SCHOOL_IMAGE_PATH,
                        role: "SCHOOL"
                    }, jwtSecret)
                    res.header("Authorization", token)
                    res.status(200).json({
                        success: true,
                        message: "Successful login",
                        user: {
                            id: school._id,
                            schoolId: school._id,
                            owner_name: school.owner_name,
                            school_name: school.school_name,
                            image_url: school.SCHOOL_IMAGE_PATH,
                            role: "SCHOOL"
                        }
                    })
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Password is incorrect!"
                    })
                }

            } else {
                res.status(401).json({
                    success: false,
                    message: "Email not registered!"
                })
            }
        } catch (error) {
            res.status(501).json({
                success: false,
                message: "Internal Server Error [SCHOOL LOGIN]!"
            })
        }
    },
    getAllSchools: async (req, res) => {
        try {
            const schools = await School.find().select(['-password', '-_id', '-email', '-owner_name', '-createdAt'])
            res.status(200).json({ success: true, message: "Success in fetching all schools", schools })
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error [ALL SCHOOL DATA" })
        }
    },
    getSchoolOwnData: async (req, res) => {
        try {
            const id = req.user.id;
            const school = await School.findOne({ _id: id });
            if (school) {
                res.status(200).json({ success: true, school })
            } else {
                res.status(404).json({ success: false, message: "School not found" })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error [OWN SCHOOL DATA" })
        }
    },

    //ORIGINAL UPDATESCHOOL
    // updateSchool: async (req, res) => {
    //     try {
    //         const id = ''
    //         const form = new formidable.IncomingForm();
    //         form.parse(req, async (err, fields, files) => {
    //             const school = await School.findOne({ _id: id })
    //             if (files.image) {
    //                 const photo = files.image[0];
    //                 let filepath = photo.filepath;
    //                 let originalFilename = photo.originalFilename.replace(" ", "_")   //photo one 

    //                 if(school.school_image){
    //                     let oldImagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, school.school_image);
    //                     if(fs.existsSync(oldImagePath)){
    //                         fs.unlink(oldImagePath, (err) => {
    //                             if(err) console.log("Error deleting old image", err)
    //                         })
    //                     }  
    //                 }

                    
    //                 let newPath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH, originalFilename);
    //                 let photoData = fs.readFileSync(filepath);
    //                 fs.writeFileSync(newPath, photoData);

    //                 Object.keys(fields).forEach( field => {
    //                     school[field] = fields[field][0]
    //                 })
    //                 await school.save()

    //                 res.status(200).json({
    //                     success: true,
    //                     message: "Updated successdully", school
    //                 })

    //             }


    //             const savedSchool = await school.save();
    //             res.status(200).json({
    //                 success: true,
    //                 data: savedSchool,
    //                 message: "School is registered successfully!"
    //             })
    //         })

    //     } catch (error) {

    //     }
    // }

    updateSchool: async (req, res) => {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                try {
                    // FIXED: Get ID from the form fields
                    //const id = fields.id ? fields.id[0] : null; 
                    const id = req.user.id
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
}