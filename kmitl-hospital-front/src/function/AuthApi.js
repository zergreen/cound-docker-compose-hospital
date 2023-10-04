import axios from "axios";

const domain = `${process.env.REACT_APP_SERVER_DOMAIN}`;
const db_domain =  `${process.env.REACT_APP_DB_DOMAIN}`;

const login = async (username, password, navigate) => {
  const url = `${domain}/auth/login`;
  await axios({
    method: "POST",
    url: url,
    data: {
      username: username,
      password: password,
    },
  })
    .then((response) => {
      console.log(response.data.accessToken);
      localStorage.setItem("TOKEN", response.data.accessToken);
      navigate("/home");
      // window.location.replace('/home');
    })
    .catch((err) => {
      console.log("34");
      console.log(err);
      alert("Failed");
    });
};

const register = async (username, password, role, navigate) => {
  const qs = require("qs");
  let data = qs.stringify({
    Employee_ID: "1",
    Myuser_Username: username,
    Myuser_Password: password,
    Myuser_Role: role,
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: `${domain}/auth/register`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

const getProfile = () => {
  // alert('hello')
  const token = localStorage.getItem("TOKEN");
  alert(`SERVER DOMAIN: ${domain} \nDATABASE DOMAIN: ${db_domain}`)
  // alert(token);
  axios({
    method: "GET",
    maxBodyLength: Infinity,
    url: `${domain}/auth/protected`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      alert(JSON.stringify(response.data) + `\nTOKEN: ${token}`);
      // alert('TOKEN: '+token)
    })
    .catch((error) => {
      console.log(error);
      alert("can not access becase token is expired");
    });
  console.log("1");
};

const autoLogin = async (navigate) => {
  const token = localStorage.getItem("TOKEN");
  await axios({
    method: "GET",
    maxBodyLength: Infinity,
    url: `${domain}/auth/protected`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status !== 401) {
        // console.log(response.data.role);
        localStorage.setItem("permission", JSON.stringify(response.data.role));
        navigate("/loading");
      } else {
        // alert('Your token has been expired')
        // navigate("/")
        console.log("your token has been expired!");
      }
    })
    .catch((error) => {
      // alert('Your are joker!')
      // console.log('web server is down');
    });
};

const autoLogin2 = async (navigate) => {
  const token = localStorage.getItem("TOKEN");

  if(token){
    navigate("/loading")
  }
  // await axios({
  //   method: "GET",
  //   maxBodyLength: Infinity,
  //   url: `${domain}/auth/protected`,
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((response) => {
  //     if (response.status !== 401) {
  //       // console.log(response.data.role);
  //       localStorage.setItem("permission", JSON.stringify(response.data.role));
  //       navigate("/loading");
  //     } else {
  //       // alert('Your token has been expired')
  //       // navigate("/")
  //       console.log("your token has been expired!");
  //     }
  //   })
  //   .catch((error) => {
  //     // alert('Your are joker!')
  //     // console.log('web server is down');
  //   });
}

const getLogout = (navigate) => {
  const token = localStorage.getItem("TOKEN");
  axios({
    method: "POST",
    maxBodyLength: Infinity,
    url: `${domain}/auth/logout`,

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      refreshToken: token,
    },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      localStorage.clear();
        navigate("/",{ replace: true });
      // window.location('/login');
      // alert(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
};

const getRefreshToken = (time) => {
  setInterval(() => {
    const token = localStorage.getItem("TOKEN");
    console.log(`${token}`);
    axios({
      method: "POST",
      maxBodyLength: Infinity,
      url: `${domain}/auth/refresh-token`,

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        refreshToken: `${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("TOKEN", response.data.accessToken);
      })
      .catch((error) => {
        localStorage.clear();
        alert("cannot refresh token : you must Re Login Again");
        window.location.replace("/");
        console.log(error);
      });
  }, time);
};

export { login, register, getProfile, getLogout, getRefreshToken, autoLogin, autoLogin2 };
