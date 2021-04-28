const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator')
require("dotenv").config();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { validationResult } = require('express-validator')

// VERSION 1: WORKING AS A BEST WAY (I LOVE IT)
exports.login = async (req, res) => {
    const { user_name, password } = req.body

    try {
        //1. Find the user
        const user = await findUserInfo('user_name', user_name.toLowerCase());
        // console.log(user);

        //2. Check if user found
        if (!user) return res.status(404).json({ message: 'User not found!' })

        //3. Check if password matches
        // body_password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' })

        //4. Generate auth token
        const userWithToken = generateToken(user)
        userWithToken.user.avatar = user.avatar

        return res.send(userWithToken)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

const findUserInfo = async (key, value, ...args) => {
    const info = args.length == 0 ? '*' : args.join(', ');
    const res = await pool.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
    return res.rows[0];
};

// Function to generate token
const generateToken = (user) => {

    delete user.password
    // payload is user in this case
    const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: 86400 })

    return { ...{ user }, ...{ token } }
}

/*
// VERSION 2: PARTLY WORKING NOT BEST
exports.login = async (req, res) => {

    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json('Fields can not be empty');
    } // else if (!(await accountHelper.checkPassword(null, password, user_name.toLowerCase()))) {
    //     return res.status(400).json('Invalid credentials');
    //}

    // db query to save user in const user
    const user = await findUserInfo('user_name', user_name.toLowerCase());

    // check if account activated
    if (user.verified === 0) {
        return res.status(426).json('Your account is not activated yet. Please, check your email.');
    }

    // const data = await getLocation(req);
    // set user online
    // data.online = 1;
    // await accountModel.updateAccount(user.user_id, data);

    return res.json({
        user: { status: user.status, userId: user.user_id },
        tkn: jwt.sign({ userId: user.user_id, status: user.status }, process.env.APP_KEY, {
            expiresIn: 1000 * 60 * 60,
        }),
    });
};

const findUserInfo = async (key, value, ...args) => {
    const info = args.length == 0 ? '*' : args.join(', ');
    const res = await pool.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
    return res.rows[0];
}; */