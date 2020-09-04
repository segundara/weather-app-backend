const express = require("express");
const mongoose = require("mongoose")
const listEndpoints = require("express-list-endpoints")
const userRoute = require("./user/index")
const listRoute = require("./list/index")
const passport = require("passport")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const server = express()
server.use(express.json())
server.use(cookieParser())
server.use("/user", userRoute)
server.use("/list", listRoute)
console.log(listEndpoints(server))

server.use(morgan())
server.use(passport.initialize())

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(process.env.PORT || 3002, () => {
      console.log(`Server is running on ${process.env.PORT}`)
    })
  )
  .catch((err) => console.log(err))
