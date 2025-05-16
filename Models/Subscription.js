const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/db');

class Subscription extends Model {}

Subscription.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    last_sent_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    frequency: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: [['hourly', 'daily']]
        }
    },
    email_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    }, 
    {
        sequelize,
        modelName: 'Subscription',
        tableName: 'Subscriptions',
        timestamps: false 
    });

module.exports = Subscription;
