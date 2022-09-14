const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String, required: true },
    currentClass: { type: Number, required: true },
    division: { type: String, required: true }
})

const studentData = new mongoose.model("studentData", studentSchema)

module.exports = studentData