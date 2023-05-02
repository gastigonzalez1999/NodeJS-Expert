import { Sequelize } from "sequelize";

//Install mysql program and db name is node
const db = new Sequelize('node', 'demos', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    //logging: true,
});

export default db;