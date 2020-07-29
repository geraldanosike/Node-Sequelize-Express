
module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define(
    "message",
    {
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userId: 
      {
        type: Sequelize.INTEGER,
      allowNull : true
      },
    },
    {}
  );


  return Message;
};

