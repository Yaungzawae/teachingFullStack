
const { createClass, getAllClassesOfTeacher, registerClass, confirmRegistration } = require("../controller/Class");
const { isTeacher } = require("../middlewares/validateCookie");

const Router = require("express").Router();

Router.post("/create", isTeacher, createClass);

Router.post("/get", getAllClassesOfTeacher);

Router.post("/register", registerClass);

Router.post("/register-class", registerClass);

Router.post("/confirm-registration", confirmRegistration);

 

// Router.post("/login", userValidator, handleValidatorError, loginUser);

// Router.post("/getOtp", getOtp);c

module.exports = Router; 