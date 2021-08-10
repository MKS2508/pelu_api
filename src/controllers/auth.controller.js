import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async(req, res) => {
    try {
        // Getting the Request Body
        const { username, email, password, roles } = req.body;
        // Creating a new User Object
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
        });

        // checking for roles
        if (req.body.roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();

        // Create a token
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const signin = async(req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });
        console.log("PASSWORD: " + req.body.password)
        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
                token: null,
                message: "Invalid Password",
            });

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });
        res.json({ token: token, user: userFound });
    } catch (error) {
        console.log(error);
    }
};
export const getUsers = async(req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.find({}).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "Users Not Found" });

        res.json(userFound);
    } catch (error) {
        console.log(error);
    }
};
export const getUserByID = async(req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.findById(req.params.userId ).populate(
            "roles"
        );

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        res.json(userFound );
    } catch (error) {
        console.log(error);
    }
};
export const editUser = async(req, res) => {

    console.log("AKI" + req.body.roles)
    try {
        // Request body email can be an email or username
        const userFound = await User.findById(req.params.userId ).populate(
            "roles"
        );
        userFound.roles = []
        const foundRoles = await Role.find({ name: { $in: req.body.roles } });
        userFound.roles = foundRoles.map((role) => role._id);
        console.log("roles:" + foundRoles)
        console.log("roles:" + userFound.roles)
        userFound.roles == []
        userFound.roles = [foundRoles[0]._id];

        const editedUser = await User.findByIdAndUpdate(userFound._id,
            {
                userFound
            }, {
                new:true
            })
        console.log(editedUser)

        if (!userFound) return res.status(400).json({ message: "User Not Found" });

        res.json(userFound );
    } catch (error) {
        console.log(error);
    }
};