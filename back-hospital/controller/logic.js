const { Plugin } = require("../controller/plugin");
class Logic {

  getApiLogic = (req,res) => {
    new Plugin().getApiPlugin(req, res);
  }

  addDepartmentLogic = (req, res) => {
    new Plugin().addDepartmentPlugin(req, res);
  }

  getAllDepartmentLogic = (req, res) => {
    new Plugin().getAllDepartmentPlugin(req, res);
  }

  getDepartmentByIdLogic = (req, res) => {
    new Plugin().getDepartmentByIdPlugin(req, res);
  }

  updateDepartmentByIdLogic = (req, res) => {
    new Plugin().updateDepartmentByIdPlugin(req, res);
  }
  
  deleteDepartmentByIdLogic = (req, res) => {
    new Plugin().deleteDepartmentByIdPlugin(req, res);
  }

}
module.exports = {
  Logic,
};
