const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");
const Shortid = require("../helpers/shortid");

const Application_apply = (req, res) => {
  try {
    if (req.body) {
      let { type, header, body, fromDate, toDate, outpass, token, mentorId } =
        req.body;
      let payload = decodeToken(token);
      if (payload) {
        let user_id = payload.userId;
        let application_id = Shortid();
        let applyQuery =
          "insert into u_applications(u_application_id,u_applied_by,u_application_type,u_application_header,u_application_body,u_from_date,u_to_date,u_outpass_required) values(?,?,?,?,?,?,?,?)";
        connection.query(
          applyQuery,
          [
            application_id,
            user_id,
            type,
            header,
            body,
            fromDate,
            toDate,
            outpass,
          ],
          (err, data) => {
            if (err) {
              console.log(err.message);
            } else {
            //   console.log(data);
              let updateNotification =
                "insert into u_application_notification(u_application_id,u_user_id) values(?,?)";
              connection.query(
                updateNotification,
                [application_id, mentorId],
                (err, data) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    // console.log(data);
                    res.status(200).send("success");
                  }
                }
              );
            }
          }
        );
      } else {
        console.log("No payload");
        res.status(400).send("No data present in token");
      }
    } else {
      console.log(req.body);
      res.status(400).send("No body data");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  Application_apply,
};
