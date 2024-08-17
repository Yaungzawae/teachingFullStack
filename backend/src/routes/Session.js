const { createSession, getAllSessionsOfTeacher } = require("../controller/Session");
const { isTeacher } = require("../middlewares/validateCookie");

const Router = require("express").Router();

Router.post("/create", isTeacher ,createSession);

Router.post("/get", getAllSessionsOfTeacher);

module.exports = Router;