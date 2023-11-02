const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");

//Mentor Approval

const ApproveMentor = (req, res) => {
  try {
    let { token, application_id } = req.body;
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      let updateNotification =
        "update u_application_notification set is_updated = ? where u_user_id = ? and u_application_id = ?";
      connection.query(
        updateNotification,
        [true, user_id, application_id],
        (err, data) => {
          if (err) {
            console.log(err.message);
          } else {
            let fetchAdvisorName =
              "select u_applications.u_applied_by,u_applications.u_application_id,u_s_list.s_advisor_id from u_applications inner join u_s_list on u_s_list.s_id = u_applications.u_applied_by where u_application_id = ?";
            connection.query(
              fetchAdvisorName,
              [application_id],
              (err, data) => {
                if (err) {
                  console.log(err.message);
                } else {
                  if (data.length > 0) {
                    let advisor_id = data[0].s_advisor_id;
                    // let application_id = data[0].u_application_id;
                    let updateNotificationToAdvisor =
                      "insert into u_application_notification(u_application_id,u_user_id) values(?,?)";
                    connection.query(
                      updateNotificationToAdvisor,
                      [application_id, advisor_id],
                      (err) => {
                        if (err) {
                          console.log(err.message);
                        } else {
                          let updateMentorApproved =
                            "update u_applications set is_mentor_approved = ? where u_application_id = ?";
                          connection.query(
                            updateMentorApproved,
                            [true, application_id],
                            (err) => {
                              if (err) {
                                console.log(err.message);
                              } else {
                                res
                                  .status(200)
                                  .send("Successfully aproved your request");
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    res.status(400).send("Something went wrong!!");
                  }
                }
              }
            );
          }
        }
      );
    } else {
      res.status(400).send("No payload present in token");
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Approve advisor

const ApproveAdvisor = (req, res) => {
  try {
    let { token, application_id } = req.body;
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      let updateNotification =
        "update u_application_notification set is_updated = ? where u_user_id = ? and u_application_id = ?";
      connection.query(
        updateNotification,
        [true, user_id, application_id],
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            let fetchHodId =
              "select  u_applications.u_applied_by,u_applications.u_application_id,dept_hod.u_id from u_applications inner join u_s_list on u_s_list.s_id = u_applications.u_applied_by inner join dept_hod on u_s_list.s_department = dept_hod.dept where u_application_id = ?";
            connection.query(fetchHodId, [application_id], (err, data) => {
              if (err) {
                console.log(err.message);
              } else {
                if (data.length > 0) {
                  let hod_id = data[0].u_id;
                  // let application_id = data[0].u_application_id;
                  let updateNotificationToAdvisor =
                    "insert into u_application_notification(u_application_id,u_user_id) values(?,?)";
                  connection.query(
                    updateNotificationToAdvisor,
                    [application_id, hod_id],
                    (err) => {
                      if (err) {
                        console.log(err.message);
                      } else {
                        let updateAdvisorApproved =
                          "update u_applications set is_advisor_approved = ? where u_application_id = ?";
                        connection.query(
                          updateAdvisorApproved,
                          [true, application_id],
                          (err) => {
                            if (err) {
                              console.log(err.message);
                            } else {
                              res
                                .status(200)
                                .send("Successfully aproved your request");
                            }
                          }
                        );
                      }
                    }
                  );
                } else {
                  res.status(400).send("Something went wrong!!");
                }
              }
            });
          }
        }
      );
    } else {
      res.status(400).send("No payload present in token");
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Approve by HOD
//check outpass requires
//If requires update notification by warden Id

const ApproveHod = (req, res) => {
  try {
    let { token, application_id } = req.body;
    let wardenId = "7YrDenJw";
    let payload = decodeToken(token);
    if (payload) {
      let user_id = payload.userId;
      let updateNotification =
        "update u_application_notification set is_updated = ? where u_user_id = ? and u_application_id = ?";
      connection.query(
        updateNotification,
        [true, user_id, application_id],
        (err) => {
          if (err) {
            console.log(err.message);
          } else {
            let checkOutpassRequires =
              "select u_outpass_required from u_applications where u_application_id = ?";
            connection.query(
              checkOutpassRequires,
              [application_id],
              (err, data) => {
                if (err) {
                  console.log(err.message);
                } else {
                  if (data.length > 0) {
                    let isRequired = data[0].u_outpass_required;
                    if (isRequired) {
                      let updateNotificationToWarden =
                        "insert into u_application_notification(u_application_id,u_user_id) values(?,?)";
                      connection.query(
                        updateNotificationToWarden,
                        [application_id, wardenId],
                        (err) => {
                          if (err) {
                            console.log(err.message);
                          } else {
                            let updateHodApproved =
                              "update u_applications set is_hod_approved = ? where u_application_id = ?";
                            connection.query(
                              updateHodApproved,
                              [true, application_id],
                              (err) => {
                                if (err) {
                                  console.log(err.message);
                                } else {
                                  res
                                    .status(200)
                                    .send("Successfully aproved your request");
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      let updateHodApproved =
                        "update u_applications set is_hod_approved = ? where u_application_id = ?";
                      connection.query(
                        updateHodApproved,
                        [true, application_id],
                        (err) => {
                          if (err) {
                            console.log(err.message);
                          } else {
                            res
                              .status(200)
                              .send("Successfully aproved your request");
                          }
                        }
                      );
                    }
                  } else {
                    res.status(400).send("Something went wrong!!");
                  }
                }
              }
            );
          }
        }
      );
    } else {
      res.status(400).send("No payload present in token");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  ApproveMentor,
  ApproveAdvisor,
  ApproveHod
};
