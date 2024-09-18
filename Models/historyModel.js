import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js"
import Dongeng from "./DongengModel.js";

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
            references:{
                model: User,
                key: "id"
            }
        }, 
        id_dongeng : {
            type: Sequelize.INTEGER, 
            references : {
                model: Dongeng,
                key:"id"
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
