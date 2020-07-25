'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

module.exports = {
  up: function () {
    var _ref = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.createTable("Likes", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        isLike: {
          type: Sequelize.BOOLEAN
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNul: false
        }
      });
    });

    return function up(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  down: function () {
    var _ref2 = _asyncToGenerator(function* (queryInterface, Sequelize) {
      yield queryInterface.dropTable('Likes');
    });

    return function down(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};
//# sourceMappingURL=20200723183231-createdLikeTable.js.map