"use strict";

module.exports = (sequelize, DataTypes) => {
  const Mahasiswa = sequelize.define(
    "Mahasiswa",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      nama_mahasiswa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      asal_kota: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "mahasiswa",
      timestamps: true,
    }
  );

  Mahasiswa.associate = (models) => {};

  return Mahasiswa;
};
