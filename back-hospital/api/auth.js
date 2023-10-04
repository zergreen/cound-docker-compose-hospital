const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios").default;
require("dotenv").config();

const domain = process.env.DOMAIN_NAME

const fetch = require("node-fetch");

//for hash password
const bcrypt = require("bcrypt");
const saltRounds = 10;

const secretKey = process.env.SECRET_KEY;
const tokenExpiration = "60m";

// In-memory storage for refresh tokens
const refreshTokens = {};


// Generate JWT token
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
}

// Authentication route
router.post("/login", async (req, res) => {
  console.log(1);
  const { username, password } = req.body;

  const url = `${domain}/myuser/gethashed/` + username;
  console.log("URL DB :" + url);
  const hash_db = await axios(url)
    .then((response) => {
      console.log(response.data);
      return response.data.Myuser_Password;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("HASH: " + hash_db);
  const status_validate_hash = await validateUser(password, hash_db);
  console.log("STATUS: " + status_validate_hash);

  // Verify user credentials here...
  // If the credentials are valid, generate a JWT and send it back to the client
  if (status_validate_hash) {
    const profile = await profile_fetch(username);
    // console.log(profile);
    // res.status(200).json({ profile });
    const payload = {
      username: profile.Myuser_Username,
      role: profile.Myuser_Role,
      id: profile.Myuser_ID,
      emp_id: profile.Employee_ID,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateToken(payload);

    refreshTokens[refreshToken] = true;

    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Token refreshing route
router.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  // Check if the refresh token is valid
  if (refreshToken && refreshTokens[refreshToken]) {
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid refresh token" });
      } else {
        const payload = {
          username: decoded.username,
          role: decoded.role,
        };

        const accessToken = generateToken(payload);

        res.json({ accessToken });
      }
    });
  } else {
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  // Remove the refresh token from storage
  if (refreshToken && refreshTokens[refreshToken]) {
    delete refreshTokens[refreshToken];
  }

  res.json({ message: "Logout successful" });
});

// Protected route
router.get("/protected", verifyToken, (req, res) => {
  // If the token is valid, you can access the decoded payload
  const { username, role, id, emp_id } = req.decoded;

  res.json({
    id: id,
    emp_id: emp_id,
    username: username,
    role: role,
  });
});

// Middleware to verify the JWT
function verifyToken(req, res, next) {
  // Get the token from the request headers
  const token = req.headers["authorization"];

  if (typeof token !== "undefined") {
    // Remove the 'Bearer ' prefix from the token string
    const tokenString = token.split(" ")[1];

    jwt.verify(tokenString, secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid token" });
      } else {
        // Token is valid, save the decoded payload for future use
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
}

router.post("/register", async (req, res) => {
  const { Employee_ID, Myuser_Username, Myuser_Password, Myuser_Role } =
    req.body;

  
  const isUserExists = await checkIfUserExists(Myuser_Username);
  console.log(isUserExists);
  console.log("123");
  if (isUserExists) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }
 
  console.log("next step");

 
  req.body.Myuser_Password = await getHashPwd(Myuser_Password);

  const user = await createUser(req, res);
  res.status(200).json({ message: "Ok : you can create user" });

  
});

router.get("/test", function (req, res) {
  res.send("TEST DB_DOMAIN: " + domain);
});

router.post("/testhash", function (req, res) {
  const { username, password } = req.body;
  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      userHash = hash;
      console.log("Hash ", hash);
      validateUser(password, hash);

      return res.status(200).json({ message: "hash is valid" });
    })
    .catch((err) => console.error(err.message));
});

async function getHashPwd(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hash:", hash);
    return hash;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

async function validateUser(password, hash) {
  // console.log("222");
  // console.log(password)
  // console.log(hash);
  return (temp = await bcrypt
    .compare(password, hash)
    .catch((err) => console.error(err.message)));
  // console.log("validateUser: " + temp);
}

async function checkIfUserExists(username) {
  const url = `${domain}/myuser/` + username;
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);

  if (username == jsonData.Myuser_Username) {
    console.log("TRUE/123");
    return true;
  }
  return false;
  // res.status(200).send(jsonData);
}

async function createUser(req, res) {
  console.log(req);
  const url = `${domain}/myuser`;
  await axios({
    method: "post",
    url: url,
    data: req.body,
  })
    .then((response) => {
      console.log(response);
      console.log("FINISH");
      // return res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      console.log("FAILED");
      return res.status(err.response.status).send(err.response.data);
    });
}

router.get("/myuser", async (req, res) => {
  // res.status(200).send({message: 'welcome'})
  console.log("welcome");
  const url = `${domain}/myuser`;
  console.log(url);
  const response = await fetch(url);
  const jsonData = await response.json();
  res.send(jsonData);
});

async function profile_fetch(username) {
  const url = `${domain}/myuser/` + username;
  const response = await fetch(url);
  const jsonData = await response.json();
  //   console.log(jsonData);
  return jsonData;
}

router.get("/appoint", async (req, res) => {
  const url = `${domain}/appoint/`;
  const response = await fetch(url);
  const jsonData = await response.json();
  res.send(jsonData);
});

router.get("/report", async (req, res) => {
  try {
    const url = `${domain}/report/`;
    const response = await fetch(url);
    const jsonData = await response.json();
    res.send(jsonData);
  } catch (error) {
    res.send({ error });
  }
});

router.get("/report/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`id : ${id}`);
  const url = `${domain}/report/` + id;
  const response = await fetch(url);
  const jsonData = await response.json();
  res.send(jsonData);
});

module.exports = router;
