"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company , {
        foreignKey : "companyId"
      })
      Job.hasMany(models.Skill , {
        foreignKey : "jobId"
      })
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "title required",
          },
          notNull: {
            msg: "title required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
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
      companyId: DataTypes.INTEGER,
      authorId: DataTypes.STRING,
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "jobType required",
          },
          notNull: {
            msg: "jobType required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Job",
    }
  );
  return Job;
};
