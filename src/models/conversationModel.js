const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('Conversation', {
    id: {
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  });
};

