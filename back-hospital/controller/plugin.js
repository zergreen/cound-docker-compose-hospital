// const connection = require("../database.connect/connector");
const axios = require("axios").default;
class Plugin {

  getApiPlugin = async (req, res) => {
    // const url = "https://dummyjson.com/products/1";

    // axios
    //   .get(url)
    //   .then((response) => {
    //     // handle success
    //     console.log(response.data);

    //     console.log("testtstra");

    //     return res.status(200).send(response.data);

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     // handle errors
    //     console.log("ERROR - 51")
    //   });

    const response = await fetch("https://dummyjson.com/products/1");
    const jsonData = await response.json();
    console.log(jsonData);

    return res.status(200).send(jsonData);
  };

  // Example by Green
  addDepartmentPlugin = (req, res) => {
    console.log(req);
    const url = "http://database.porapipat.me/api/department";
    axios({
      method: "post",
      url: url,
      data: req.body,
    })
      .then((response) => {
        console.log(response);
        return res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(err.response.status).send(err.response.data);
      });
  };

  getAllDepartmentPlugin = async (req, res) => {
    const url = "http://database.porapipat.me/api/department";
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    return res.status(200).send(jsonData);
  };

  getDepartmentByIdPlugin = async (req, res) => {
    const url = "http://database.porapipat.me/api/department/" + req.params.id;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    return res.status(200).send(jsonData);
  };

  updateDepartmentByIdPlugin = (req, res) => {
    console.log(req.body);
    const url = "http://database.porapipat.me/api/department/" + req.params.id;
    axios({
      method: "put",
      url: url,
      data: req.body,
    })
      .then((response) => {
        console.log(response);
        return res.send(response.data);
      })
      .catch((err) => {
        console.log(err);
        return res.status(501).send("Error: updateDepartmentByIdPlugin");
      });
  };

  deleteDepartmentByIdPlugin = async (req, res) => {
    const url = "http://database.porapipat.me/api/department/" + req.params.id;
    const response = await fetch(url, {method: "DELETE"});
    const jsonData = await response.json();
    console.log(jsonData);
    return res.status(200).send(jsonData);
  }
}

module.exports = {
  Plugin,
};
