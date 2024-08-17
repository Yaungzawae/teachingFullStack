const { getOneUser, getAllUsers, editUserDetails } = require("../controller/User");
const Router = require("express").Router();

Router.post("/get-one-user", getOneUser);

module.exports = Router;


