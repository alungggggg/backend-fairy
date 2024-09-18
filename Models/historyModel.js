import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const history = db.define(
    "history",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user: {
            type: Sequelize.INTEGER, 
            allowNull: false,
            references : {
                model: "User",
                key: "id",
            }
        }, 
        id_dongeng : {
            type: Sequelize.INTEGER, 
            allowNull: false,
            references : {
                model: "Dongeng",
                key: "id",
            }
        }
    },
    { 
        freezeTableName: true, 
        timestamps: false,
     }
);


export default history;

(async () => {
    await db.sync();
})();
