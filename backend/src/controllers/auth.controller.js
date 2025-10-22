const db = require("../models");
const Admin = db.Admin;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize"); 

exports.register = async (req, res) => {
 
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, dan password tidak boleh kosong." });
    }
    
    const lowerCaseEmail = email.toLowerCase();

    const admin = await Admin.create({
      username: username,
      email: lowerCaseEmail, 
      password: password, 
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


    console.log("---------------------------------");
    console.log("Upaya Login untuk email:", email);
    console.log("Password dari request:", password);
    console.log("---------------------------------");

    const lowerCaseEmail = email.toLowerCase();
    
    const admin = await Admin.findOne({ 
      where: { email: lowerCaseEmail }
    });


    if (!admin) {
      console.error("DEBUG: Admin tidak ditemukan.");
      return res.status(404).json({ message: "Admin tidak ditemukan." });
    }
    

    console.log("Admin ditemukan:", admin.username);
    console.log("Hash dari DB:", admin.password); 

    const isPasswordValid = await admin.comparePassword(password);

    console.log("Hasil bcrypt.compare:", isPasswordValid); 

    if (!isPasswordValid) {
      console.error("DEBUG: Password salah.");
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

    console.log("DEBUG: Login Berhasil!");
    res.status(200).json({
      message: "Login berhasil",
      token: token,
      user: {
        id: admin.id,
        email: admin.email,
        username: admin.username
      }
    });
  } catch (error) {
    console.error("DEBUG: Terjadi error di catch", error.message);
    res
      .status(500)
      .json({ message: error.message || "Terjadi kesalahan pada server." });
  }
};

