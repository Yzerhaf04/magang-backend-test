const jwt = require("jsonwebtoken");
const db = require("../models");

/**
 * Middleware untuk memverifikasi JWT Token.
 * memeriksa header Authorization untuk Bearer Token.
 */
const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "Akses ditolak! Token tidak ditemukan.",
    });
  }

  token = token.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Format token tidak valid.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Tidak terotorisasi! Token tidak valid.",
      });
    }

    req.userId = decoded.userId;

    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
