require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT || 3001;
const cors = require("cors");
const routesHandler = require("./routes/routes");
// const {sendRejectMail} = require("./helpers/mailer");
app.use(cors());
// sendRejectMail("santhosh.m.cse.2021@snsce.ac.in","leave","leave permitting")
app.use(express.static("public/"))
app.use(express.json());
app.use("/", routesHandler);
app.listen(port, () => console.log(`Server running on port : ${port}`));
