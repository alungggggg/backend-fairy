import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const SoalPilgan = db.define("soalPilgan",
  {
    "id": {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    "soal": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "idDongeng": {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    "opsi_1": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "opsi_2": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "opsi_3": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "opsi_4": {
      type: DataTypes.STRING,
      allowNull: false,
    },
    "jawaban": {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true , timestamps: false}
)


export default SoalPilgan;

(async () => {
    await db.sync()
})()