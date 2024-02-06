const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define("Student", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Student;
};
