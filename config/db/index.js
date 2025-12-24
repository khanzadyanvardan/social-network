import { sequelize } from "./db-config.js";
import { DataTypes } from "sequelize";
import FollowModel from '../../src/account/follow.model.js'
import UserModel from '../../src/auth/auth.model.js'
import PostModel from '../../src/post/post.model.js'
// import LikeModel from '../../src/post/like.model.js'

const models = {}

models.sequelize = sequelize
models.User = UserModel(sequelize, DataTypes, models)
models.Follow = FollowModel(sequelize, DataTypes, models)
models.Post = PostModel(sequelize, DataTypes, models)
// models.Like = LikeModel(sequelize, DataTypes, models)


models.User.hasMany(models.Follow, { as: "followers", foreignKey: "following_id" });
models.User.hasMany(models.Follow, { as: "followings", foreignKey: "follower_id" });
models.User.hasMany(models.Post, {as: "posts", foreignKey: "user_id"})
// models.User.hasMany(models.Like, {as: "likes", foreignKey: "user_id"})

models.Follow.belongsTo(models.User, { as: "follower", foreignKey: "follower_id" });
models.Follow.belongsTo(models.User, { as: "following", foreignKey: "following_id" });
models.Post.belongsTo(models.User, {as: "author", foreignKey: "user_id"})

// models.Post.hasMany(models.Like, {as: "likes", foreignKey: "post_id"})
// models.Like.belongsTo(models.Post, {as: "post", foreignKey: "post_id"})
// models.Like.belongsTo(models.User, {as: "user", foreignKey: "user_id"})

export default models