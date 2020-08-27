const DB_SCHEMA = process.env.DB_SCHEMA;

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'user',
        schema: DB_SCHEMA,
        timestamps: false
    });
}