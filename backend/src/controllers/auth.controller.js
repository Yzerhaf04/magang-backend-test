const db = require("../models");
const Admin = db.Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, dan password tidak boleh kosong." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({
        message: "Admin berhasil diregistrasi.",
        data: { id: admin.id, username: admin.username },
      });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Username atau email sudah digunakan." });
    }
    res
      .status(500)
      .json({ message: error.message || "Terjadi kesalahan pada server." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email: email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin tidak ditemukan." });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = jwt.sign(
      {
        userId: admin.id,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: "app-key",
      }
    );

    res.status(200).json({
      message: "Login berhasil",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Terjadi kesalahan pada server." });
  }
};
