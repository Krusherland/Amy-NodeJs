var express = require("express");
var router = express.Router();
var userModel = require("./../../models/userModel");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layout",
  });
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.render("admin/login", {
    layout: "admin/layout",
    message: "You have been logged out.",
  });
});
router.post("/", async (req, res, next) => {
  try {
    var user = req.body.name;
    var password = req.body.password;
    var data = await userModel.getUserAndPassword(user, password);

    if (data != undefined) {
      req.session.userId = data.id;
      req.session.userName = data.name;
      res.redirect("/admin/newsletter");
    } else {
      res.render("admin/login", {
        layout: "admin/layout",
        error: "The information is incorrect.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
