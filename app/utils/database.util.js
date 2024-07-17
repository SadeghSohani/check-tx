import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config();

const sequelize = new Sequelize(process.env.SQL_DB, process.env.SQL_USER, process.env.SQL_PASS, {
   dialect: 'mysql',
   host: process.env.SQL_HOST
});
export default sequelize;