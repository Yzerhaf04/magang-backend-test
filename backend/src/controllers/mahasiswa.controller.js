const db = require("../models");
const Mahasiswa = db.Mahasiswa;

// GET semua mahasiswa
exports.findAll = async (req, res) => {
  try {
    const data = await Mahasiswa.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// GET mahasiswa by ID
exports.findOne = async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByPk(req.params.id);
    if (!mahasiswa) return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// POST tambah mahasiswa
exports.create = async (req, res) => {
  try {
    const { nama_mahasiswa, asal_kota, agama } = req.body;
    const data = await Mahasiswa.create({ nama_mahasiswa, asal_kota, agama });
    res.status(201).json({ message: "Mahasiswa berhasil ditambahkan", data });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah data", error: error.message });
  }
};

// PUT ubah mahasiswa
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_mahasiswa, asal_kota, agama } = req.body;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });

    await mahasiswa.update({ nama_mahasiswa, asal_kota, agama });
    res.status(200).json({ message: "Data mahasiswa berhasil diubah", mahasiswa });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah data", error: error.message });
  }
};

// DELETE hapus mahasiswa
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = await Mahasiswa.findByPk(id);
    if (!mahasiswa) return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });

    await mahasiswa.destroy();
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data", error: error.message });
  }
};

// Cari mahasiswa berdasarkan kota
exports.findByKota = async (req, res) => {
  try {
    const { asal_kota } = req.params;
    const mahasiswa = await Mahasiswa.findAll({ where: { asal_kota } });

    if (mahasiswa.length === 0) {
      return res.status(404).json({ message: `Tidak ada mahasiswa dari kota ${asal_kota}` });
    }

    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari mahasiswa berdasarkan kota.",
      error: error.message,
    });
  }
};

// Cari mahasiswa berdasarkan agama
exports.findByAgama = async (req, res) => {
  try {
    const { agama } = req.params;
    const mahasiswa = await Mahasiswa.findAll({ where: { agama } });

    if (mahasiswa.length === 0) {
      return res.status(404).json({ message: `Tidak ada mahasiswa beragama ${agama}` });
    }

    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mencari mahasiswa berdasarkan agama.",
      error: error.message,
    });
  }
};

