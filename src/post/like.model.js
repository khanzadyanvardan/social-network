export default function(sequelize, DataTypes, models){
    const Post = sequelize.define("Like", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
        }, {tableName: "likes", timestamps: false,
        indexes: [{ unique: true, fields: ["user_id", "post_id"] }]
    })
    return Post
}
