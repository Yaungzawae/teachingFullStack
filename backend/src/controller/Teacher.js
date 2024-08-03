const {
    formatError,
    formatMongooseUniqueError,
} = require("../helpers/formatError");
const jwt = require("jsonwebtoken");
const { createCookie, getUserId } = require("../helpers/jwt");
const bcrypt = require("bcrypt");
const Teacher = require("../model/Teacher");
const { default: mongoose } = require("mongoose");

module.exports.createTeacher = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        const newTeacher = await Teacher.create({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            img: req.body.img,
            description: req.body.description,
        })

        res.cookie("jwt", createCookie({ id: newTeacher._id, permission: "teacher" }));
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(401).json(formatMongooseUniqueError(err.errors));
    }
}

module.exports.loginTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({ email: req.body.email });

        if (teacher == null) {
            return res.status(401).json(formatError({ email: "Unregistered Email" }));
        }

        const passwordIsCorrect = await bcrypt.compare(
            req.body.password,
            teacher.password
        )
        if (!passwordIsCorrect) {
            return res.status(401).json(formatError({ password: "Incorrect Password" }))
        }

        res.cookie("jwt", createCookie({ id: teacher._id, permission: "teacher" }));
        return res.sendStatus(200);

    } catch (err) {
        console.log(err)
    }
}

module.exports.getOneTeacher = async (req, res) => {

    const id = req.body._id ? req.body._id : getUserId(req.cookies.jwt);

    try {
        const oneDetail = await Teacher.findOne({ _id: new mongoose.Types.ObjectId(id) });
        return res.status(200).json(oneDetail);
    } catch (err) {
        console.log(err);
    }

}

module.exports.getAllTeachers = async (req, res) => {

    try {
        const allTeachers = await Teacher.find();
        return res.status(200).json(allTeachers)
    } catch (err) {
        console.log(err)
    }

}

module.exports.editTeacherDetails = async (req, res) => {

    console.log(req.body.description)

    try {
        const teacherUpdate = {};

        if (req.body.name) {
            teacherUpdate.name = req.body.name;
        }

        if (req.body.description) {
            teacherUpdate.description = req.body.description;
        }

        if (req.body.img) {
            teacherUpdate.img = req.body.img;
        }

        const teacher = await Teacher.findOneAndUpdate(
            { _id: getUserId(req.cookies.jwt) },
            teacherUpdate,
            { new: true } // This option returns the updated document
        );

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

