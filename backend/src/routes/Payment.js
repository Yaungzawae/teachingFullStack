const { registerClassStripe, confirmRegistrationStripe } = require("../controller/Stripe");
const { isStudent, validateCookie } = require("../middlewares/validateCookie");

const Router = require("express").Router();

Router.post("/stripe/register-class", validateCookie, isStudent ,registerClassStripe);

Router.post("/stripe/confirm-registration", validateCookie, isStudent ,confirmRegistrationStripe);


module.exports = Router;