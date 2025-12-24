export default function(sequelize, DataTypes, models){
    const Post = sequelize.define("Post", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: DataTypes.INTEGER,
        text: DataTypes.STRING,
        image: DataTypes.STRING
    }, {tableName: "posts", timestamps: false})
    return Post
}
