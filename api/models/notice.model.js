const mongoose = require('mongoose')
const noticeSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.ObjectId,
        ref: "School",
    },
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        enum: [
            'Student',
            'teacher'
        ],
        required: true
    },
    
    createdAt: {type: Date, default: new Date()}
})

module.exports = mongoose.model("Notice", noticeSchema)  