"use strict";

module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    isLike: {
      type: Sequelize.BOOLEAN
    },
    userId: Sequelize.INTEGER
  }, {});
  return Like;
};
//# sourceMappingURL=like.js.map