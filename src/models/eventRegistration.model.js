
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EventRegistration = sequelize.define(
  "EventRegistration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },

    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "event_id",
    },

    status: {
      type: DataTypes.ENUM("registered", "cancelled"),
      allowNull: false,
      defaultValue: "registered",
    },
  },
  {
    tableName: "event_registrations",
    timestamps: true,
    underscored: true,

    // Prevent the same user from registering for the same event twice.
    indexes: [
      {
        unique: true,
        fields: ["user_id", "event_id"],
      },
    ],
  }
);

export default EventRegistration;
