const db = require("../models");
const Admin = db.Admin;

/**
 * Mengambil semua data admin (cocok dengan rute controller.findAll)
 */
exports.findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mengambil data admin."
    });
  }
};

/**
 * Mengambil satu admin berdasarkan ID (cocok dengan rute controller.findOne)
 */
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findOne({
      where: { id: id },
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin tidak ditemukan." });
    }

    res.status(200).json(admin);

  } catch (error) {
    res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mengambil data admin."
    });
  }
};

/**
 * Update data admin berdasarkan ID (cocok dengan rute controller.update)
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek data yang masuk (pastikan tidak ada field sensitif jika perlu)
    // Catatan: Hook beforeUpdate di model Anda akan otomatis meng-hash password jika diubah.
    const [numAffectedRows] = await Admin.update(req.body, {
      where: { id: id }
    });

    if (numAffectedRows === 0) {
      return res.status(404).json({ message: "Admin tidak ditemukan, tidak ada data yang diupdate." });
    }

    res.status(200).json({ message: "Admin berhasil diupdate." });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mengupdate admin."
    });
  }
};

/**
 * Hapus admin berdasarkan ID (cocok dengan rute controller.delete)
 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const numDeletedRows = await Admin.destroy({
      where: { id: id }
    });

    if (numDeletedRows === 0) {
      return res.status(404).json({ message: "Admin tidak ditemukan, tidak ada data yang dihapus." });
    }

    res.status(200).json({ message: "Admin berhasil dihapus." });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Terjadi kesalahan saat menghapus admin."
    });
  }
};

/**
 * Cari admin berdasarkan username (cocok dengan rute controller.findByUsername)
 */
exports.findByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const admins = await Admin.findAll({
      where: { username: username },
      attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
    });

    if (!admins || admins.length === 0) {
      return res.status(404).json({ message: "Admin dengan username tersebut tidak ditemukan." });
    }
    
    res.status(200).json(admins);

  } catch (error) {
    res.status(500).json({
      message: error.message || "Terjadi kesalahan saat mencari admin."
    });
  }
};

