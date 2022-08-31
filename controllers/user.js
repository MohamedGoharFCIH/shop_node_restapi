const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator/check');


const User = require("../models/user");
const config = require("../config");

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('firstname', 'firstname must exists and cannot be Empty').exists().not().isEmpty(),
                body('middlename', 'middlename must exists and cannot be Empty').exists().not().isEmpty(),
                body('lastname', 'lastname nmust exists and cannot be Empty').exists().not().isEmpty(),
                body('email', 'Invalid email').exists().isEmail(),
                body('phone', 'invalid mobile').exists().matches(/^01[0-2]{1}[0-9]{8}/),
                body('password', 'password must exists and cannot be Empty').exists().not().isEmpty(),
            ]
        }
        case 'userLogin': {
            return [
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'password must exists and cannot be Empty').exists().not().isEmpty(),
            ]
        }
    }
}




exports.createUser = async (req, res, next) => {

    try {

        // Finds the validation errors in this request and wraps them in an object with handy functions

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        }

        const exist_user = await User.findOne({ where: { email: req.body.email } });
        if (exist_user) {
            return res.status(409).json({
                message: "User aleardy exist"
            });
        }


        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            try {
                const user = await User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    middlename: req.body.middlename,
                    email: req.body.email,
                    password: hash,
                    phone: req.body.phone,

                })
                return res.status(201).json({
                    msg: 'User Created ..!',
                    result: user

                })
            }
            catch (e) {
                res.send(e)
            }

        })


    } catch (err) {
        return res.status(500).json({
            message: "Error When creating User!"
        });
    }

};

exports.userLogin = async (req, res, next) => {



    try {

        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        }
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(401).json({
                message: "Auth failed...  wrong email "
            });
        }

        bcrypt.compare(req.body.password, user.password).then(async (result) => {
            if (!result) {
                return res.status(401).json({
                    message: " Wrong Password! ... Auth faield "
                });
            }
            const token = jwt.sign(
                { email: user.email, id: user.id },
                config.JWT_KEY,
                { expiresIn: "24h" }
            );
            const updatedUser = await User.update(
                {
                    token: token,
                },
                {
                    where: { id: user.id },
                }
            );
            console.log(updatedUser);
            return res.status(200).json({
                token: token,
                expiresIn: 86400,
                userId: user.id,
            });

        })
    } catch (err) {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        });
    }

};
