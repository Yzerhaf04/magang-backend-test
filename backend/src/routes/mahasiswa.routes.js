const express = require("express");
const router = express.Router();
const controller = require("../controllers/mahasiswa.controller.js");

const authJwt = require("../middleware/auth.jwt.js");

router.get("/", [authJwt.verifyToken], controller.findAll);

module.exports = router;
