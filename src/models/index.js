
import sequelize from "../config/database.js";

import User from "./user.model.js";
import Profile from "./profile.model.js";
import Programme from "./programme.model.js";
import Resource from "./resource.model.js";
import Event from "./event.model.js";


//Associations
// One user has one profile.
User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
  onDelete: "CASCADE",
});

// Each profile belongs to one user.
Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


// Export the connection and models for use throughout the application.
export {
  sequelize,
  User,
  Profile,
  Programme,
  Resource,
  Event,
};
