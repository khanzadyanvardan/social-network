export default function (sequelize, DataTypes, models) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        surname: DataTypes.STRING,
        username: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false}
    }, { tableName: "users", timestamps: false, 
        defaultScope: {
        attributes: { exclude: ['password']}},
        scopes: {
            withPassword: {
                attributes: { include: ['password'] }
            }
        }
    })


    //
   // User.hasMany(models.Product, {})
    return User
}