const router = require("express").Router();
const LoginUser = require("../controller/Login");
const {dashboardStudent , dashboardStaff} = require("../controller/Dashboard");
const {Application_apply} = require("../controller/Application");
const {ApproveMentor,ApproveAdvisor,ApproveHod} = require("../controller/Approve");
const {RejectAdvisor,RejectMentor,RejectHod} = require("../controller/Reject");
const {GetNotification} = require("../controller/Notification");
const {GetAllTrackApplication} = require("../controller/Track");
router.post("/login", LoginUser);
//router to handle dashboard student
router.post("/dashboard/student", dashboardStudent);
router.post("/dashboard/staff", dashboardStaff);
//router to handle application submit
router.post("/apply",Application_apply);
//router to approve the application
router.post("/approve/mentor",ApproveMentor);
router.post("/approve/advisor",ApproveAdvisor);
router.post("/approve/hod",ApproveHod);
//router to reject the application
router.post("/reject/mentor",RejectMentor);
router.post("/reject/advisor",RejectAdvisor);
router.post("/reject/hod",RejectHod);
//router to get all notification
router.post("/getAllNotification",GetNotification);
router.post("/trackNotification",GetAllTrackApplication);
module.exports = router;
