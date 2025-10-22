require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./models");
const authRoutes = require("./routes/auth.routes");
const mahasiswaRoutes = require("./routes/mahasiswa.routes");

const app = express();

const adminRoutes = require("./routes/admin.routes.js");
app.use("/api/admins", adminRoutes);

// --- PENGATURAN CORS YANG LEBIH SPESIFIK ---
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"], 
};


app.use(cors(corsOptions));

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