import { INTEGER, STRING, BOOLEAN } from 'sequelize';
import sequelize from '#root/utils/database.util';

const User = sequelize.define('user', {
    userId: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: STRING,
    },
    password: {
        type: STRING,
    },
    firstName: {
        type: STRING,
    },
    lastName: {
        type: STRING,
    },
    verified: {
        type: BOOLEAN,
        default: false,
    }
}, {
    tableName: 'users'
});
await sequelize.sync({ force: false });
export default User;