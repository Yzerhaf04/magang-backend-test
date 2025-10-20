const express = require("express");
const router = express.Router();
const controller = require("../controllers/mahasiswa.controller.js");
const authJwt = require("../middleware/auth.jwt.js");

// ✅ Ambil semua data mahasiswa
router.get("/", [authJwt.verifyToken], controller.findAll);

// ✅ Ambil 1 mahasiswa berdasarkan ID
router.get("/:id", [authJwt.verifyToken], controller.findOne);

// ✅ Tambah data mahasiswa
router.post("/", [authJwt.verifyToken], controller.create);

// ✅ Ubah data mahasiswa berdasarkan ID
router.put("/:id", [authJwt.verifyToken], controller.update);

// ✅ Hapus data mahasiswa berdasarkan ID
router.delete("/:id", [authJwt.verifyToken], controller.delete);

// ✅ Ambil mahasiswa berdasarkan asal_kota
router.get("/kota/:asal_kota", [authJwt.verifyToken], controller.findByKota);

// ✅ Ambil mahasiswa berdasarkan agama
router.get("/agama/:agama", [authJwt.verifyToken], controller.findByAgama)

module.exports = router;