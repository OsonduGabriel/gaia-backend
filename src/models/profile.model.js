
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    // Connects this profile to its user account.
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: "user_id",
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    profileImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "profile_image_url",
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
    underscored: true,
  }
);

export default Profile;
