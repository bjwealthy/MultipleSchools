const express = require("express")
const authMiddleWare = require("../auth/auth");
const { registerSchool, getAllSchools, loginSchool, updateSchool, getSchoolOwnData } = require("../controllers/school.controller")
const router = express.Router()


router.post('/register', registerSchool)
router.get('/all', getAllSchools)
router.get('/login',  loginSchool)
router.patch('/update', authMiddleWare(['SCHOOL']), updateSchool)   //AUTH      
router.get('/fetch-single', authMiddleWare(['SCHOOL']), getSchoolOwnData)



module.exports = router;