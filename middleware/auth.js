import jwt from "jsonwebtoken";
function verifyJwt(req, res, next) {
  const header = req.headers["authorization"];
  if (header != null) {
    const token = header.replace("Bearer ", "");
    jwt.verify(token, "test456",(err, decode)=>{
      if(decode != null){
        req.user = decode;
      }
    })
  }
  next();
}

export default verifyJwt;