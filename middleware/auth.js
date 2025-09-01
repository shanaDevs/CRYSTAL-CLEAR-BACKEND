import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (header != null) {
    const token = header.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (decode != null) {
        req.user = decode;
      }
    });
  }
  next();
}

export default verifyJwt;