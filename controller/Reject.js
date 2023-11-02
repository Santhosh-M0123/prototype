const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");
const { sendRejectMail } = require("../helpers/mailer");

//Reject by mentor
const RejectMentor = (req, res) => {
  try {
    let { token, application_id, feedback } = req.body;
    let UpdateRejectQuery =
      "update u_applications set is_mentor_approved = ?,u_application_feedback=? where u_application_id = ?";
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      connection.query(
        UpdateRejectQuery,
        [false, feedback, application_id],
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Updated rejected");
            let findUserEmail =
              "select u_applications.u_applied_by,u_applications.u_application_header,u_applications.u_application_type,users.userEmail from u_applications inner join users on u_applications.u_applied_by = users.userId where u_application_id = ?";
            connection.query(findUserEmail, [application_id], (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  let email = data[0].userEmail;
                  let type = data[0].u_application_type;
                  let header = data[0].u_application_header;
                  let updateNotification =
                    "update u_application_notification set is_updated = ? where u_application_id = ? and u_user_id = ?";
                  connection.query(
                    updateNotification,
                    [true, application_id, user_id],
                    async (err) => {
                      if (err) {
                        console.log(err.message);
                      } else {
                        console.log("Updated notification center"); 
                        let mail = await sendRejectMail(email, type, header , feedback);
                        if (mail) {
                          res.status(200).send("Successfully rejected");
                        } else {
                          res.status(200).send("Successfully rejected");
                        }
                      }
                    }
                  );
                } else {
                  console.log("No data found on the given ID");
                  res.status(400).send("Something went wrong on server");
                }
              }
            });
          }
        }
      );
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Advisor reject

const RejectAdvisor = (req, res) => {
  try {
    let { token, application_id, feedback } = req.body;
    let UpdateRejectQuery =
      "update u_applications set is_advisor_approved = ?,u_application_feedback=? where u_application_id = ?";
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      connection.query(
        UpdateRejectQuery,
        [false, feedback, application_id],
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Updated rejected");
            let findUserEmail =
              "select u_applications.u_applied_by,u_applications.u_application_header,u_applications.u_application_type,users.userEmail from u_applications inner join users on u_applications.u_applied_by = users.userId where u_application_id = ?";
            connection.query(findUserEmail, [application_id], (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  let email = data[0].userEmail;
                  let type = data[0].u_application_type;
                  let header = data[0].u_application_header;
                  let updateNotification =
                    "update u_application_notification set is_updated = ? where u_application_id = ? and u_user_id = ?";
                  connection.query(
                    updateNotification,
                    [true, application_id, user_id],
                    async (err) => {
                      if (err) {
                        console.log(err.message);
                      } else {
                        console.log("Updated notification center");
                        let mail = await sendRejectMail(email, type, header);
                        if (mail) {
                          res.status(200).send("Successfully rejected");
                        } else {
                          res
                            .status(200)
                            .send("Successfully rejected");
                        }
                      }
                    }
                  );
                } else {
                  console.log("No data found on the given ID");
                  res.status(400).send("Something went wrong on server");
                }
              }
            });
          }
        }
      );
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Reject HOD

const RejectHod = (req, res) => {
  try {
    let { token, application_id, feedback } = req.body;
    let UpdateRejectQuery =
      "update u_applications set is_hod_approved = ?,u_application_feedback=? where u_application_id = ?";
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      connection.query(
        UpdateRejectQuery,
        [false, feedback, application_id],
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Updated rejected");
            let findUserEmail =
              "select u_applications.u_applied_by,u_applications.u_application_header,u_applications.u_application_type,users.userEmail from u_applications inner join users on u_applications.u_applied_by = users.userId where u_application_id = ?";
            connection.query(findUserEmail, [application_id], (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  let email = data[0].userEmail;
                  let type = data[0].u_application_type;
                  let header = data[0].u_application_header;
                  let updateNotification =
                    "update u_application_notification set is_updated = ? where u_application_id = ? and u_user_id = ?";
                  connection.query(
                    updateNotification,
                    [true, application_id, user_id],
                    async (err) => {
                      if (err) {
                        console.log(err.message);
                      } else {
                        console.log("Updated notification center");
                        let mail = sendRejectMail(email, type, header);
                        if (mail) {
                          res.status(200).send("Successfully rejected");
                        } else {
                          res
                            .status(200)
                            .send("Successfully rejected");
                        }
                      }
                    }
                  );
                } else {
                  console.log("No data found on the given ID");
                  res.status(400).send("Something went wrong on server");
                }
              }
            });
          }
        }
      );
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  RejectMentor,
  RejectAdvisor,
  RejectHod,
};
