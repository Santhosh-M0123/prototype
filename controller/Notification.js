const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");

//Get all notification

const GetNotification = (req, res) => {
  try {
    let { token } = req.body;
    if (token) {
      let payload = decodeToken(token);
      let userId = payload.userId;
      let getNotification =
        "select u_application_notification.u_application_id,u_applications.u_application_type,u_applications.u_application_header,u_applications.u_application_body,u_applications.u_from_date,u_applications.u_to_date,u_applications.u_applied_on,u_applications.u_applied_by,u_s_list.s_name,u_s_list.s_reg_no,u_s_list.s_year from u_application_notification inner join u_applications on u_applications.u_application_id = u_application_notification.u_application_id inner join u_s_list on u_s_list.s_id = u_applications.u_applied_by where u_application_notification.u_user_id = ? and u_application_notification.is_updated = ?";
        connection.query(getNotification , [userId , true] , (err,data) => {
            if(err){
                console.log(err.message);
                res.status(400).send("something went wrong")
            }else{
                if(data.length > 0){
                    res.status(200).send(data)
                }else{
                    console.log(data);
                    console.log("Empty array receive from Db");
                    res.status(400).send("something went wrong")
                }
            }
        })
    } else {
      res.status(400).send("No tokens found in body");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  GetNotification,
};
