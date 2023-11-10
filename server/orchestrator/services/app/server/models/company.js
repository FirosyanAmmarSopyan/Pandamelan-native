"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, { foreignKey: "companyId" });
    }
  }
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name required",
          },
          notNull: {
            msg: "name required",
          },
        },
      },
      companyLogo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "companyLogo required",
          },
          notNull: {
            msg: "companyLogo required",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "location required",
          },
          notNull: {
            msg: "location required",
          },
        },
      },
      email: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description required",
          },
          notNull: {
            msg: "description required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
