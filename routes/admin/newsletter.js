var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var bangerModel = require("../../models/bangerModel");

router.get("/", async function (req, res, next) {
  var bangers = await bangerModel.getBangers();
  res.render("admin/newsletter", {
    layout: "admin/layout",
    user: req.session.userName,
    bangers,
  });
});

router.post("/", async (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var obj = {
    to: "zaccardicristian@gmail.com",
    subject: "Newsletter message",
    html:
      name +
      " " +
      " sent a message from the email " +
      email +
      "<br>With the message: " +
      message,
  };
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  var contactMessage = await transporter.sendMail(obj);
  res.render("admin/newsletter", {
    layout: "admin/layout",
    message: "The message was sent!",
  });
});

router.get("/delete/:id", async (req, res, next) => {
  var id = req.params.id;
  await bangerModel.deleteBanger(id);
  res.redirect("/admin/newsletter");
}),
  router.get("/add", (req, res, next) => {
    res.render("admin/add", {
      layout: "admin/layout",
    });
  });

router.post("/add", async (req, res, next) => {
  try {
    if (req.body.title != "" && req.body.reason != "") {
      await bangerModel.addBanger(req.body);
      res.redirect("/admin/newsletter");
    } else {
      res.render("admin/add", {
        layout: "admin/layout",
        error: true,
        message: "Please fill in all the fields",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/add", {
      layout: "admin/layout",
      error: true,
      message: "An error occurred while trying to add the banger",
    });
  }
});

router.get("/update/:id", async (req, res, next) => {
  var id = req.params.id;
  var banger = await bangerModel.getBangerById(id);
  res.render("admin/update", {
    layout: "admin/layout",
    banger,
  });
});

router.post("/update", async (req, res, next) => {
  try {
    var obj = {
      title: req.body.title,
      reason: req.body.reason,
    }
    await bangerModel.updateBanger(req.body.id, obj);
    res.redirect("/admin/newsletter");
  } catch (error) {
    console.log(error);
    res.render("admin/update", {
      layout: "admin/layout",
      error: true,
      message: "An error occurred while trying to update the banger",
    });
  }
})
module.exports = router;
