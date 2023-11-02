const connection = require("../config/Db");
const { decodeToken } = require("../auth/jwt");

//Fetch all application progress

const GetAllTrackApplication = (req, res) => {
  try {
    let { token,applicationId } = req.body;
    if (token) {
      let payload = decodeToken(token);
      let userId = payload.userId;
      let FetchAllTrack =
        "select is_mentor_approved,is_advisor_approved,is_hod_approved,u_application_feedback,u_applied_on from u_applications where u_applied_by = ? and u_application_id = ?";
        connection.query(FetchAllTrack , [userId,applicationId] , (err,data) => {
            if(err){
                console.log(err.message);
                res.status(400).send("Something went wrong");
            }else{
                if(data.length > 0){
                    res.status(200).send(data);
                }else{
                    res.status(200).send("No new notifications");
                }
            }
        });
    } else {
      console.log("No token found");
      res.status(400).send("No token found");
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  GetAllTrackApplication,
};
