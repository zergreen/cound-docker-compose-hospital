const express = require("express");
const router = express.Router();
const { Endpoint } = require("../controller/endpoint.js");

// go to logic
// router.get("/", function (req, res) {
//   // res.render("homepage", { title: "I just code IT [Youtube Channel]" });
//   // res.render("login");
//   res.send(`
//   <!DOCTYPE html>
// <html>
//   <head>
//     <title>FULLSTACK-KMITL-HOSPITAL</title>
//     <link rel="icon" type="image/x-icon" href="favicon.ico" />
//     <style>
//       /* Add any desired styles for the page */
//       body {
//         font-family: Arial, sans-serif;
//         background-color: #f2f2f2;
//         margin: 0;
//         padding: 20px;
//       }

//       .container {
//         margin-top: 100px;
//         background-color: #ffffff;
//         padding: 20px;
//       }

//       .container-space {
//         display: flex;
//         justify-content: space-between;
//         background-color: #f9f9f9;
//         padding: 20px;
//       }

//       h1 {
//         font-size: 28px;
//         color: #333;
//         margin-bottom: 20px;
//       }

//       p {
//         font-size: 18px;
//         color: #555;
//         margin-bottom: 10px;
//       }

//       .button {
//         display: inline-block;
//         padding: 10px 20px;
//         font-size: 16px;
//         background-color: #4caf50;
//         color: white;
//         border: none;
//         cursor: pointer;
//         text-decoration: none;
//         margin-top: 20px;
//       }

//       .button:hover {
//         background-color: #45a049;
//       }

//       .team-info {
//         font-size: 16px;
//         color: #666;
//         margin-top: 50px;
//         text-align: left;
//       }

//       .team-info p {
//         margin: 5px 0;
//       }

//       .section-image {
//         margin-top: 40px;
//       }

//       .section-image img {
//         max-width: 100%;
//         height: auto;
//       }

//       @media (max-width: 768px) {
//         .container {
//           margin-top: 50px;
//         }

//         .container-space {
//           flex-direction: column;
//         }

//         .team-info {
//           margin-top: 20px;
//         }

//         .section-image {
//           margin-top: 20px;
//         }
//       }
//     </style>
//   </head>

//   <body>
//     <div class="container">
//       <center>
//         <h1>Welcome to KMITL-API-SERVER TEST Page!</h1>
//         <p>
//           ในส่วนนี้จะเป็น api ที่ติดต่อ กับ database มีเฉพาะคำสั่ง CRUD
//           มาตรฐานเพื่อจัดการกับ database โดยตรง API.
//         </p>
//         <a
//           class="button"
//           href="https://grey-astronaut-339109.postman.co/workspace/Team-Workspace~ac68c43a-2972-44ff-88d5-a499779e6d86/collection/20110985-03b476af-e660-45e5-b50a-de46c9ff92ed?action=share&creator=20110985"
//           >Access DATABASE API</a
//         >
//         <br />
//         <hr />
//         <br />
//         <p>
//           ในส่วนนี้จะเป็น api เกี่ยวกับ business logic และกลไก การทำงานต่างๆ ของ
//           backend server เช่น login และการประมวลผลต่างๆ
//         </p>
//         <a
//           class="button"
//           href="https://grey-astronaut-339109.postman.co/workspace/Team-Workspace~ac68c43a-2972-44ff-88d5-a499779e6d86/collection/20110985-f9162701-f2cf-4032-a330-caedcb0d9019?action=share&creator=20110985"
//           >Access BACKEND API</a
//         >
//         <div>
//           <h4>Source Code</h4>
//           <button
//             class="button"
//             style="background-color: red"
//             onclick="window.location.href='https://gitlab.com/zergreen/back-hospital.git'"
//           >
//             BACKEND
//           </button>
//           <button
//             class="button"
//             style="background-color: orange"
//             onclick="window.location.href='https://gitlab.com/zergreen/kmitl_hospital.git'"
//           >
//             FRONTEND
//           </button>
//           <button
//             class="button"
//             style="background-color: blue"
//             onclick="window.location.href='https://github.com/Tersornpat/api-server.git'"
//           >
//             DATABASE-API
//           </button>
//         </div>
//       </center>
//       <div class="container-space">
//         <div class="team-info" style="background-color: #f7f7f7">
//           <ul>
//             <li>รายชื่อกลุ่มระบบโรงพยาบาล</li>
//             <li>63050108 นายฉัตรณภัทร์ เศรษฐ์ณโชค</li>
//             <li>63050156 นายปรพิพัฒน์ แก่นพุฒ</li>
//             <li>63050157 นางสาวปิยาภรณ์ ตั้งจิตสิริสิน</li>
//             <li>63050159 นายพงศกร กาเหว่าลาย</li>
//             <li>63050165 นางสาวพิยดา เสนาเพ็ง</li>
//             <li>63050196 นายสรณ์พัฒน์ อ่ำเที่ยงธรรม</li>
//             <li>63050198 นายสิรภพ หน่อท้าว</li>
//           </ul>
//         </div>
//         <div class="team-info" style="background-color: #f0f0f0">
//           <p>ใช้ id นี้เพื่อทำการ Login เข้ายิง Postman</p>
//           <p>Username : kawhao101@gmail.com</p>
//           <p>Password : admin1234</p>
//         </div>
//       </div>
//       <section class="section-image">
//         <div>
//           <h1>Route Structure</h1>
//           <p>โครงสร้างโดยรวมของ api แต่ ละ folder</p>
//           <img
//             src="https://media.discordapp.net/attachments/1067458504014708767/1121858947033342063/image.png?width=788&height=684"
//             alt=""
//           />
//           <p>
//             ในส่วนของ <b>hospital-api-database</b> เป็น api
//             ที่เป็นตัวกลางในการสื่อสารระหว่าง backend-server และ database เอง
//             ซึ่งอย่างที่เคยบอกว่า จะเป็นส่วนที่มี แค่ CRUD พื้นฐานสำหรับคุยกับ
//             database โดยตรง
//           </p>
//           <p>
//             ถัดมาเป็นในส่วนของ <b>kmitl-hospital-back-api-logic</b> เป็น api
//             server สำหรับการประมวลผล และ bussiness logic ต่างๆ เช่น login บันทึก
//             นัด จอง เป็นต้น
//           </p>
//           <ul>
//             <li>
//               <b>Appointment Page</b> - จัดการในเรื่องของการจองและการออก report
//             </li>
//             <li>
//               <b>Doctor Page</b> - ส่งข้อมูลของหมอกลับไปที่ส่วนของ frontend
//             </li>
//             <li>
//               <b>Datetime-Check</b> - ตรวจว่าเวลาที่ user นัดเข้ามา
//               ตรงกับที่มีคนจองไว้หรือไม่
//             </li>
//             <li>
//               <b>Auth</b> - จัดการในเรื่องของระบบ สิทธิ์ และการเข้าถึงการใช้งาน
//               ของ user เช่น login, logout, register เป็นต้น
//             </li>
//           </ul>
//           <h2>AUTH - Route</h2>
//           <p>เมื่อทำการ Login จะได้ access token มา ให้ทำการ</p>
//           <p>
//             นำ accessToken ที่ได้ ไปใส่ในส่วนของ เส้น api ที่ต้องใช้ token
//             เพื่อทำการ เรียก ใช้งาน เช่น
//           </p>
//           <ul>
//             <li>Get profile with token</li>
//             <li>Refresh Token</li>
//             <li>Logout</li>
//           </ul>
//           <img
//             src="https://media.discordapp.net/attachments/1067458504014708767/1121843543531606117/image.png?width=1644&height=1028"
//             alt="Access Token"
//           />
//           <p>
//             ในส่วนนี้จะเป็นการสาธิตการใช้ accessToken ซึ่ง accessToken
//             มีอายุการใช้งาน 1 ชั่วโมง
//           </p>
//           <p>
//             ให้ทำการใส่ Token ในส่วนที่เรียกว่า Bearer Token จากนั้นกด Send
//             เพื่อทำการยิง
//           </p>
//           <img
//             src="https://media.discordapp.net/attachments/1067458504014708767/1121843794640384091/image.png?width=1644&height=1028"
//             alt="Bearer Token"
//           />
//           <p>หลังจากทำการยิง ก็จะได้หน้า ตา api ประมาณนี้</p>
//           <img
//             src="https://cdn.discordapp.com/attachments/1067458504014708767/1121854522143285248/image.png"
//           />
//           <p>
//             ในส่วนถัดไปจะเป็นการ สาธิต การใช้งาน refreshToken เพื่อทำการขอ Token
//             ใหม่ เนื่องจาก token ตัวเก่าได้หมดอายุไปแล้ว
//           </p>
//           <img
//             src="https://media.discordapp.net/attachments/1067458504014708767/1121855175376769054/image.png?width=1644&height=1028"
//             alt=""
//           />
//           <p>
//             จากนั้นเรา จะทำการ logout เพื่อทำ การทำให้ token
//             ตัวนั้นไปเรียกใช้งาน refresh Token อีกไม่ได้แล้ว ต้อง login
//             ใหม่เท่านั้น ถึงจะได้ Token ตัวใหม่มา
//           </p>
//         </div>
//       </section>
//     </div>
//   </body>
// </html>

//   `);
// });

router.get("/testjson", new Endpoint().getApiEndpoint);

// router.post("/login", new Endpoint().loginEndpoint);

// router.post("/register", new Endpoint().registerEndpoint);

// router.get("/profile" ,new Endpoint().profileEndpoint);

// router.post("/forgetpwd", new Endpoint().forgetpwdEndpoint);

router.get("/test", function (req, res) {
  res.send("TEST");
});

module.exports = router;
