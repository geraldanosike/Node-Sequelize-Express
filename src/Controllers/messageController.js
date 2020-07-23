const asyncHandler = require("../Middlewares/async");
const { getIdParam } = require("../utils/validateId");
const db = require("../DBCONFIG/models/index");
const User = db.User;
const Message = db.Message;
const Op = db.Sequelize.Op;

exports.CreateMessage = asyncHandler(async (req, res, next) => {
  try {

    const Messages = await Message.create(req.body);

    return res
      .status(201)
      .send({ message: "Message created successfully", Messages });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

 exports.GetAllMessages = asyncHandler(async (req, res, next) => {
   try {
     const msg = await Message.findAll({ include : [{model : User , as: "author"}]});
     if (!msg) return res.status(404).send("No messages exist");

     return res
       .status(200)
       .send({ message: "Successfuly retrieved messages", msg });
   } catch (error) {
     return res
       .status(500)
       .send(error.message || "Some error occurred while retrieving messages.");
   }
 });