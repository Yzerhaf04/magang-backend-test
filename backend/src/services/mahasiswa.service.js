const db = require("../models");
const Mahasiswa = db.Mahasiswa;

/**
 * Service untuk membuat data mahasiswa baru di database.
 * @param {object} dataMahasiswa - Data mahasiswa yang akan dibuat.
 * @returns {Promise<object>} Objek mahasiswa yang baru dibuat.
 */
const create = async (dataMahasiswa) => {
  const mahasiswaBaru = await Mahasiswa.create(dataMahasiswa);
  return mahasiswaBaru;
};

/**
 * Service untuk mengambil semua data mahasiswa dari database.
 * @returns {Promise<Array>} Array berisi semua data mahasiswa.
 */
const findAll = async () => {
  const semuaMahasiswa = await Mahasiswa.findAll();
  return semuaMahasiswa;
};

/**
 * Service untuk mencari satu mahasiswa berdasarkan Primary Key (Id).
 * @param {number} id - Id mahasiswa yang akan dicari.
 * @returns {Promise<object|null>} Objek mahasiswa jika ditemukan, atau null jika tidak.
 */
const findById = async (id) => {
  const mahasiswa = await Mahasiswa.findByPk(id);
  return mahasiswa;
};

/**
 * Service untuk memperbarui data mahasiswa berdasarkan ID.
 * @param {number} id - Id mahasiswa yang akan diperbarui.
 * @param {object} dataMahasiswa - Data baru untuk mahasiswa.
 * @returns {Promise<number>} Angka 1 jika update berhasil, 0 jika tidak ada data yang diupdate.
 */
const update = async (id, dataMahasiswa) => {
  const [hasil] = await Mahasiswa.update(dataMahasiswa, {
    where: { id: id },
  });
  return hasil;
};

/**
 * Service untuk menghapus data mahasiswa berdasarkan ID.
 * @param {number} id - Id mahasiswa yang akan dihapus.
 * @returns {Promise<number>} Angka 1 jika delete berhasil, 0 jika tidak ada data yang dihapus.
 */
const destroy = async (id) => {
  const hasil = await Mahasiswa.destroy({
    where: { id: id },
  });
  return hasil;
};

// Eksport semua fungsi service agar bisa digunakan
module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};
