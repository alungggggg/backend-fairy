import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import validator from "validator";

const { DataTypes } = Sequelize;

const Dongeng = db.define("dongeng",
    {
        "title": DataTypes.STRING,
        "fileName": DataTypes.STRING,
        "PdfPath": DataTypes.STRING,
        "view": DataTypes.INTEGER,
    },
    { freezeTableName: true }
)

export default Dongeng;

(async () => {
    await db.sync()
})()