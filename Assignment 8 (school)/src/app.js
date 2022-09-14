// const express = require("express")
const app = require("./index");
const studentArray = require("./InitialData");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/studentModel")
const studentData = require("../model/model")


app.get("/api/student", async (req, res) => {
    const stuData = await studentData.find()
    if (stuData.length === 0) {
        try {
            await studentArray.map((ele) => {
                studentData.create(ele)
            })
            const data = await studentData.find()
            res.status(200).send(data)
        } catch (error) {
            res.status(404).send("error")
        }
    }
    else {
        res.status(200).send(stuData)
    }

})

app.get("/api/student/:id", async (req, res) => {

    try {
        const id = req.params.id
        const data = await studentData.find({ _id: id });
        if (data.length === 0) {
            res.status(400)
            throw "invalid id"
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({ message: error })
    }
})

app.post("/api/student", async (req, res) => {
    try {
        const newStudent = await studentData.create(req.body)
        const id = newStudent._id
        console.log(id)

        res.set('content-type', 'application/x-www-form-urlencoded')
        res.status(200).send(id)


    } catch (error) {
        res.status(400).send({ message: error })
    }
})

app.put("/api/student/:id", async (req, res) => {
    try {
        res.set('content-type', 'application/x-www-form-urlencoded')
        const id = req.params.id
        await studentData.updateOne({ _id: id }, req.body);
        res.status(200).send("success")
    } catch (error) {
        res.status(400).send({ message: error })
    }
})

app.delete("/api/student/:id", async (req, res) => {
    try {
        const id = req.params.id
        await studentData.deleteOne({ _id: id })
        res.status(200).send("success")
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
})