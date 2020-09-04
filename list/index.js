const express = require("express")
const LoginModel = require("./Schema")
const CityModel = require("./Schema")
const { authenticate } = require("../auth/authTools")
const { authorize } = require("../middlewares/authorize")
const cityRouter = express.Router()
const bcrypt = require("bcrypt");
const passport = require("passport");


cityRouter.post("/", authorize, async (req, res, next) => {
    try {
        const newCity = new CityModel(req.body)

        const { _id } = await newCity.save()

        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})


module.exports = cityRouter;