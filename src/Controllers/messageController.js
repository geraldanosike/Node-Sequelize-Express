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

 exports.getAmessage = asyncHandler(async(req, res, next)=>{
  const id = getIdParam(req);

try {
  const messsage = await Message.findByPk(id, {
    include: [{ model: User, as: "author" }],
  });
     if (!messsage) return res.status(404).send("No messages exist");
      return res
        .status(200)
        .send({ message: "Successfuly retrieved messages", messsage });

} catch (error) {
   return res
     .status(500)
     .send(error.message || "Some error occurred while retrieving messages.");

}
 });

 exports.UpdateMsg = asyncHandler(async (req, res, next) => {
   const id = getIdParam(req);

   try {
     const Msg = await Message.update(req.body, { where: { id: id } });

     if (!Msg) return res.status(404).send("Error updating Message");

     return res.status(200).send({ message: "Successfuly updated Message" });
   } catch (error) {
     return res
       .status(500)
       .send(error.message || "Some error occurred while updating Message.");
   }
 });

 exports.DeleteMsg = asyncHandler(async (req, res, next) => {
   const id = getIdParam(req);

   try {
     const Msg = await Message.destroy({ where: { id: id } });

     if (!Msg) return res.status(404).send("Error! Message does not exist");

     return res.status(200).send({ message: "Successfuly deleted Message" });
   } catch (error) {
     return res
       .status(500)
       .send(error.message || "Some error occurred while deleting Message.");
   }
 });