const express = require("express")
const LoginModel = require("./Schema")
const { authenticate } = require("../auth/authTools")
const { authorize } = require("../middlewares/authorize")
const router = express.Router()
const bcrypt = require("bcrypt");
const passport = require("passport");

router.post("/register", async (req, res) => {
  try {
    const checkEmail = await LoginModel.find({ email: req.body.email });
    console.log(checkEmail);
    if (checkEmail.length !== 0) {
      res.status(409).send("user with same email exists");
    } else {
      const plainPassword = req.body.password;
      req.body.password = await bcrypt.hash(plainPassword, 8);
      console.log(req.body);
      const newUser = new LoginModel(req.body);
      await newUser.save();
      res.send("registered Successfully");
    }
  } catch (error) {
    //next(error);
    res.send(error.errors);
  }
});
router.get("/", authorize, async (req, res, next) => {
  try {
    const users = await LoginModel.find(req.query).populate("cities")
    res.send({
      data: users,
      total: users.length
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await LoginModel.findByCredentials(email, password)
    console.log(user)
    const token = await authenticate(user)
    res.cookie("accessToken", token, {
      path: "/",
      httpOnly: true,
      sameSite: true,
    })
    res.send(token)
  } catch (error) {

  }

})
// router.post("/logout", authorize, async (req, res, next) => {
//     try {
//       req.user.refreshTokens = req.user.refreshTokens.filter(
//         (t) => t.token !== req.body.refreshToken
//       )
//       await req.user.save()
//       res.send()
//     } catch (err) {
//       next(err)
//     }
//   })

module.exports = router;