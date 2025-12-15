import { sequelize } from "./db-config.js";
import { DataTypes } from "sequelize";
import UserModel from '../../src/auth/auth.model.js'

const models = {}

models.sequelize = sequelize
models.User = UserModel(sequelize, DataTypes, models)


export default models