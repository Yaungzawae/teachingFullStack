
const { createTeacher, loginTeacher, getOneTeacher, getAllTeachers, editTeacherDetails } = require("../controller/Teacher");
const { isTeacher } = require("../middlewares/validateCookie");

const Router = require("express").Router();

Router.post("/create", createTeacher);

Router.post("/login", loginTeacher);

Router.post("/get-one-teacher", getOneTeacher);

Router.post("/get-all-teachers", getAllTeachers)

Router.post("/edit-teacher", editTeacherDetails);   

// Router.post("/login", userValidator, handleValidatorError, loginUser);

// Router.post("/getOtp", getOtp);

module.exports = Router;