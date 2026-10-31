
import sequelize from "../config/database.js";

import User from "./user.model.js";
import Profile from "./profile.model.js";
import Programme from "./programme.model.js";
import Resource from "./resource.model.js";
import Event from "./event.model.js";
import EventRegistration from "./eventRegistration.model.js";


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

// A user can have many event registrations.
User.hasMany(EventRegistration, {
  foreignKey: "userId",
  as: "eventRegistrations",
  onDelete: "CASCADE",
});

EventRegistration.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// An event can have many registrations.
Event.hasMany(EventRegistration, {
  foreignKey: "eventId",
  as: "registrations",
  onDelete: "CASCADE",
});

EventRegistration.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});


// Export the connection and models for use throughout the application.
export {
  sequelize,
  User,
  Profile,
  Programme,
  Resource,
  Event,
  EventRegistration,
};
