const express = require("express");
const router = express.Router();
const controller = require("../controllers/admins.controller.js");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", controller.findAll);

router.get("/:id", controller.findOne);

module.exports = router;