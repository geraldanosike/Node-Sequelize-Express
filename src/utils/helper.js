import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SALT_WORK_FACTOR = bcrypt.genSaltSync(5);
const helper = {
  // Hash password with bcrypt
  hashPassword: async (plaintextPassword, saltFactor = SALT_WORK_FACTOR) => {
    const hash = await bcrypt.hash(plaintextPassword, saltFactor);
    return hash;
  },
  // compare hashed password
  comparePassword: async (plaintextPassword, hashPassword) => {
    const compare = await bcrypt.compare(plaintextPassword, `${hashPassword}`);
    return compare;
  },
  // generate token
  generateToken: (type, payload, expiry = process.env.TOKEN_EXPIRES_IN) => {
    payload.type = type;
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
  },
  // generate uniqueID
  generateUniqueId: () => "twbd7std7862teggd78w",
};

export default helper;
