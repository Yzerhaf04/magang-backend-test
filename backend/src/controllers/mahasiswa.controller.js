const db = require("../models");
const Mahasiswa = db.Mahasiswa;

exports.findAll = async (req, res) => {
  try {
    const dataMahasiswa = await Mahasiswa.findAll();

    res.status(200).json(dataMahasiswa);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data mahasiswa.",
      error: error.message,
    });
  }
};
