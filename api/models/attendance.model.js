const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    school: {type: mongoose.Schema.ObjectId, ref: 'School'},
    student: {type: mongoose.Schema.ObjectId, ref: 'Student'},
    class: {type: mongoose.Schema.ObjectId, ref: 'class'},
    date: {type: date, default: 'Absent'},

    createdAt: {type: Date, default: new Date()}  
})

module.exports = mongoose.model('attendace', attendanceSchema)