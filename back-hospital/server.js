const express = require("express");
const server = express();
const routes = require("./router/router.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const department = require("./api/hospital-department");
const employee = require("./api/hospital-employee");
const factor = require("./api/hospital-factor");
const inspectionDetail = require("./api/hospital-inspection-detail");
const listProser = require("./api/hospital-list-proser");
const mainAction = require("./api/hospital-main-action");
const nLab = require("./api/hospital-n-lab");
const packageDetail = require("./api/hospital-package-detail");
const patient = require("./api/hospital-patient");
const position = require("./api/hospital-position");
const proserType = require("./api/hospital-proser-type");
const proser = require("./api/hospital-proser");
const treatment = require("./api/hospital-treatment");

const doctor = require("./api/doctor-list.js");
const appointment = require("./api/appointment.js");
const datetime = require("./api/datetime.js");

server.set("port", process.env.PORT || 3000);

// server.set ( "view engine", "ejs" );

// Define the allowed origins
// const allowedOrigins = [
//     'https://media.discordapp.net',
//     'https://cdn.discordapp.net',
//     /https:\/\/(.*\.)?github\.com/,
//     /https:\/\/(.*\.)?gitlab\.com/
//   ];

//   // Create a custom CORS options function
//   const corsOptions = {
//     origin: function (origin, callback) {
//       // Check if the origin matches any allowed origin
//       const isAllowed = allowedOrigins.some(allowedOrigin => {
//         if (typeof allowedOrigin === 'string') {
//           return origin === allowedOrigin;
//         } else if (allowedOrigin instanceof RegExp) {
//           return allowedOrigin.test(origin);
//         }
//         return false;
//       });

//       if (isAllowed) {
//         callback(null, true); // Allow the request
//       } else {
//         callback(new Error('Not allowed by CORS')); // Block the request
//       }
//     }
//   };

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(routes);

// Route API
// Doctor list page
server.use("/doctor", doctor);
// Appoinment Page
server.use("/appointment", appointment);
server.use("/datetime", datetime);

server.use("/department", department);
server.use("/employee", employee);
server.use("/factor", factor);
server.use("/inspectionDetail", inspectionDetail);
server.use("/listProser", listProser);
server.use("/mainAction", mainAction);
server.use("/nLab", nLab);
server.use("/packageDetail", packageDetail);
server.use("/patient", patient);
server.use("/position", position);
server.use("/proserType", proserType);
server.use("/proser", proser);
server.use("/treatment", treatment);
const auth = require("./api/auth");
server.use("/department", department);
server.use("/auth", auth);

const data = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

server.get("/api/data", (req, res) => {
  res.json(data);
});

server.listen(server.get("port"), () => {
  // console.log(process.env.SECRET_KEY);
  console.log("Server started on port " + server.get("port"));
  console.log(`[HOST] http://localhost:${server.get("port")}/`);
});
