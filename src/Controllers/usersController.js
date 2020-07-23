const asyncHandler = require("../Middlewares/async");
const { getIdParam } = require("../utils/validateId");
const db = require("../DBCONFIG/models/index");
const User = db.User;
const Message = db.message;
const Op = db.Sequelize.Op;

exports.CreateUser = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ where: { email: email } });

    if (findUser) return res.status(400).send("User already exists");

    const users = await User.create(req.body);

    return res
      .status(201)
      .send({ message: "User created successfully", users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

exports.GetAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Message, as: "messages" }],
    });
    if (!users) return res.status(404).send("No users exist");

    return res
      .status(200)
      .send({ message: "Successfuly retrieved users", users });
  } catch (error) {
    return res
      .status(500)
      .send(error.message || "Some error occurred while retrieving users.");
  }
});

exports.GetAUser = asyncHandler(async (req, res, next) => {
  const id = getIdParam(req);
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Message, as: "messages" }],
    });
    if (!user) return res.status(404).send("This user does not exist");
    return res
      .status(200)
      .send({ message: "Successfuly retrieved users", user });
  } catch (error) {
    return res
      .status(500)
      .send(error.message || "Some error occurred while retrieving user.");
  }
});

exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const id = getIdParam(req);

  try {
    const user = await User.update(req.body, { where: { id: id } });

    if (!user) return res.status(404).send("Error updating user");

    return res.status(200).send({ message: "Successfuly updated user" });
  } catch (error) {
    return res
      .status(500)
      .send(error.message || "Some error occurred while updating user.");
  }
});

exports.DeleteUser = asyncHandler(async (req, res, next) => {
  const id = getIdParam(req);

  try {
    const u = await User.findByPk(id);
    if (u.isAdmin)
      return res.status(404).send("Error! you cant delete an Admin");

    const user = await User.destroy({ where: { id: id } });

    if (!user) return res.status(404).send("Error! User does not exist");

    return res.status(200).send({ message: "Successfuly deleted user" });
  } catch (error) {
    return res
      .status(500)
      .send(error.message || "Some error occurred while deleting user.");
  }
});

exports.DeleteAllUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.destroy({ where: {}, truncate: false });

    if (!user) return res.status(404).send("Error deleting users.");

    return res.status(200).send({ message: "Successfuly deleted all users." });
  } catch (error) {
    return res
      .status(500)
      .send(error.message || "Some error occurred while deleting users.");
  }
});
