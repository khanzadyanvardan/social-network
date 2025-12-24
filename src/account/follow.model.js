export default function (sequelize, DataTypes, models) {
    const Follow = sequelize.define("Follow", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('requested', 'followed', 'unfollowed'),
            // defaultValue: 'unfollowed',
            allowNull: false
        }
    }, {tableName: "follows", timestamps: false,
        indexes: [{unique: true, fields: ["follower_id", "following_id"]}]
    });

    

    // Follow.belongsTo(models.User, { as: "follower", foreignKey: "follower_id" });
    // Follow.belongsTo(models.User, { as: "following", foreignKey: "following_id" });
    return Follow;
}