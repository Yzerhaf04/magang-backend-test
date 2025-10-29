const express = require("express");
const router = express.Router();
const controller = require("../controllers/mahasiswa.controller.js");
const authJwt = require("../middleware/auth.jwt.js");

router.get("/", [authJwt.verifyToken], controller.findAll);

router.get("/:id", [authJwt.verifyToken], controller.findOne);

router.post("/", [authJwt.verifyToken], controller.create);

router.put("/:id", [authJwt.verifyToken], controller.update);

router.delete("/:id", [authJwt.verifyToken], controller.delete);

router.get("/kota/:asal_kota", [authJwt.verifyToken], controller.findByKota);

router.get("/agama/:agama", [authJwt.verifyToken], controller.findByAgama);

module.exports = router;
