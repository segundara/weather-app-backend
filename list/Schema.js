const { Schema, model } = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
    }
})


const CityModel = model("City", CitySchema)
module.exports = CityModel

