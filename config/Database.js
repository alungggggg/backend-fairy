import { Sequelize } from "sequelize";


const db = new Sequelize({
    database : process.env.DATABASENAME,
    username : process.env.USERNAME,
    password : process.env.PASSWORD,
    host: process.env.HOSTNAME,
    dialect: "mysql"
})

export default db;