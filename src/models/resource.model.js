
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Resource = sequelize.define(
  "Resource",
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
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fileUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "file_url",
    },
    coverImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "cover_image_url",
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      allowNull: false,
      defaultValue: "draft",
    },
  },
  {
    tableName: "resources",
    timestamps: true,
    underscored: true,
  }
);

export default Resource;
