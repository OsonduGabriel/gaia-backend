
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    startsAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "starts_at",
    },
    endsAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "ends_at",
      validate: {
        isAfterStart(value) {
          if (
            value &&
            this.startsAt &&
            new Date(value) < new Date(this.startsAt)
          ) {
            throw new Error("Event end time cannot be before its start time.");
          }
        },
      },
    },
    coverImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "cover_image_url",
    },
    status: {
      type: DataTypes.ENUM(
        "draft",
        "published",
        "cancelled",
        "completed"
      ),
      allowNull: false,
      defaultValue: "draft",
    },
  },
  {
    tableName: "events",
    timestamps: true,
    underscored: true,
  }
);

export default Event;
