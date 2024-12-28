var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bangerModel = require('../../models/bangerModel');

router.get('/', async function(req, res, next) {
  var bangers = await bangerModel.getBangers();
  res.render('admin/newsletter', {
    layout: 'admin/layout',
    user: req.session.userName,
    bangers
  }); 
});

router.post('/', async (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var obj = {
    to: 'zaccardicristian@gmail.com',
    subject: 'Newsletter message',
    html: name + " " + " sent a message from the email " + email + "<br>With the message: " + message
  }
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  var contactMessage = await transporter.sendMail(obj);
  res.render('admin/newsletter', {
    layout: 'admin/layout',
    message: "The message was sent!"
  });
});
module.exports = router;