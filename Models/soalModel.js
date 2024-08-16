import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const SoalPilgan = db.define(
  "soalPilgan",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    soal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idDongeng: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Dongeng",
        key: "id",
      },
    },
    opsi_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opsi_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opsi_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opsi_4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jawaban: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

export const SoalUraianSingkat = db.define(
  "soalUraianSingkat",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    soal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idDongeng: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Dongeng",
        key: "id",
      },
    },
    jawaban: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

export const SoalUraianPanjang = db.define(
  "soalUraianPanjang",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    soal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idDongeng: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Dongeng",
        key: "id",
      },
    },
    jawaban: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  { freezeTableName: true, timestamps: false }
);

export default SoalPilgan;

(async () => {
  await db.sync();
})();
