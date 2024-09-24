import { Sequelize } from "sequelize";


const db = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD,{
    // database : process.env.DATABASENAME,
    // username : process.env.USERNAME,
    // password : process.env.PASSWORD,
    host: process.env.MYSQL_ADDON_HOST,
    dialect: "mysql"
})

export default db;