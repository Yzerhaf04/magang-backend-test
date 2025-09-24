# 1. Pilih base image (Node.js versi 18 yang ringan)
FROM node:18-alpine

RUN apk update && apk upgrade

# 2. Tentukan direktori kerja di dalam kontainer
WORKDIR /app

# 3. Salin file package.json dan package-lock.json terlebih dahulu
# Ini memanfaatkan cache Docker, jadi `npm install` tidak akan dijalankan ulang jika file ini tidak berubah
COPY package*.json ./

# 4. Install semua dependensi proyek
RUN npm install

# 5. Salin semua file kode proyek ke dalam direktori kerja di kontainer
COPY . .

# 6. Beri tahu Docker bahwa kontainer akan berjalan di port 3000
EXPOSE 3000

# 7. Tentukan perintah untuk menjalankan aplikasi saat kontainer dimulai
CMD ["node", "server.js"]