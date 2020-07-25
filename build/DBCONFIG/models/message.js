"use strict";

module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    userId: Sequelize.INTEGER
  }, {});
  return Message;
};
//# sourceMappingURL=message.js.map