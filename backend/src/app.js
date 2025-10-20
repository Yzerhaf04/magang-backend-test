require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./models");

const authRoutes = require("./routes/auth.routes");
const mahasiswaRoutes = require("./routes/mahasiswa.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Selamat datang di API. Server berjalan dengan baik." });
});

app.use("/api/auth", authRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource tidak ditemukan." });
});

const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Koneksi database berhasil.");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal terhubung ke database:", error);
  }
};

startServer();
