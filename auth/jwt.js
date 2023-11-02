const jwt = require("jsonwebtoken");
const jwtSecrete = process.env.JWT_SECRETE;

const createToken = (data) => {
  const token = jwt.sign(data, jwtSecrete);
  return token;
};

const decodeToken = (token) => {
    const verifyToken = jwt.verify(token , jwtSecrete);
    if(verifyToken){
        let payload = jwt.decode(token);
        return payload
    }else{
        return "Invalid Token"
    }
}

module.exports = {
  createToken,
  decodeToken
};
