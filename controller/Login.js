const connection = require("../config/Db");
const {createToken} = require("../auth/jwt");
//Login user Controller
const LoginUser = (req, res) => {
  try {
    if (req.body) {
      const { userName, userPassword } = req.body;
      if (userName) {
        if (userPassword) {
          //Db logics goes here
          let queryLogin =
            "select * from users where userName = ? and userPassword = ?";
          connection.query(
            queryLogin,
            [userName, userPassword],
            (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  let tokenData = {
                    userId: data[0].userId,
                    userEmail: data[0].userEmail,
                    userRole: data[0].userRole,
                  };
                  let token = createToken(tokenData);
                  let responseData = {
                    userId: data[0].userId,
                    userEmail: data[0].userEmail,
                    userRole: data[0].userRole,
                    token : token
                  };
                  token ? res.status(200).send(responseData) : console.log("token error occurs");
                } else {
                  res.status(400).send(`userName or password mismatch`);
                }
              }
            }
          );
        } else {
          console.log(`userName : ${userName} and password : ${userPassword}`);
          res.status(400).send("No userPassword present in body");
        }
      } else {
        console.log(`userName : ${userName} and password : ${userPassword}`);
        res.status(400).send("No userName present in body");
      }
    } else {
      console.log(req.body);
      res.status(400).send("No body data present in request");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = LoginUser;
