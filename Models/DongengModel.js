import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Dongeng = db.define("dongeng",
    {
        "title": DataTypes.STRING,
        "fileName": DataTypes.STRING,
        "PdfPath": DataTypes.STRING,
        "view": DataTypes.INTEGER,
        "cover": DataTypes.STRING,
    },
    { freezeTableName: true }
)

export default Dongeng;

(async () => {
    await db.sync()
})()