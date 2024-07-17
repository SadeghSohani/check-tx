import { INTEGER, STRING, DECIMAL } from 'sequelize';
import sequelize from '#root/utils/database.util';

const Transaction = sequelize.define('transaction', {
    txId: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    from: {
        type: STRING,
    },
    to: {
        type: STRING,
    },
    type: {
        type: STRING,
    },
    value: {
        type: DECIMAL,
    },
    userEmail: {
        type: STRING,
    }
}, {
    tableName: 'transactions',
});

export default Transaction;