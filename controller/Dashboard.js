const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");

//Student Dashboard UI Data

const dashboardStudent = (req, res) => {
  try {
    let { token } = req.body;
    if (token) {
      let payload = decodeToken(token);
      if (payload) {
        let selectStudentDetails = "select * from u_s_list where s_id = ?";
        connection.query(
          selectStudentDetails,
          [payload.userId],
          (err, data) => {
            if (err) {
              console.log(err.message);
            } else {
              if (data.length > 0) {
                res.status(200).send(data);
              } else {
                console.log(data);
                res.status(400).send("No Data found in the user ID");
              }
            }
          }
        );
      } else {
        res.send("No payload");
      }
    } else {
      res.status(400).send("No token found in body");
    }
  } catch (e) {
    console.log(e.message);
  }
};

//dashboard staff UI data

const dashboardStaff = (req, res) => {
    try {
      let { token } = req.body;
      if (token) {
        let payload = decodeToken(token);
        if (payload) {
          let selectStudentDetails = "select * from u_staff_list where staff_id = ?";
          connection.query(
            selectStudentDetails,
            [payload.userId],
            (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  res.status(200).send(data);
                } else {
                  console.log(data);
                  res.status(400).send("No Data found in the user ID");
                }
              }
            }
          );
        } else {
          res.send("No payload");
        }
      } else {
        res.status(400).send("No token found in body");
      }
    } catch (e) {
      console.log(e.message);
    }
};

module.exports = {
  dashboardStudent,
  dashboardStaff
};
