const express = require('express');
userModel = require('../model/user/user');
const app = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticate = require('./authenticate');

app.post('/user', async (req, res) => {
    console.log(req.body);
    const { name, email, password, phone, address } = req.body;
    const salt = bycrypt.genSaltSync(10);
    const hashPassword = bycrypt.hashSync(password, salt);
    const user = new userModel({ name, email, password: hashPassword, phone, address, role: 0 });
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await (userModel.findOne({ email }));
    if (user) {
        const isMatch = bycrypt.compareSync(password, user.password);
        if (!isMatch) return res.sendStatus(401)
        delete user._doc.password;
        const token = await jwt.sign({ user }, 'abcd');
        res.send({user, token});
    }
})
app.post('/register', async (req, res) => {
    const { name, email, phone, password, address } = req.body;
    const salt = bycrypt.genSaltSync(10);
    const hashPassword = bycrypt.hashSync(password, salt);
    const user = new userModel({ name, email, phone, password: hashPassword, address, role: 0 });
    console.log(user);

    try {
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'abcd', { expiresIn: '24h' });
        console.log(user, token);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/authlogin', authenticate, async (req, res) => {
    console.log(req.user);
    try {
        const user = await userModel.findById(req.user);
        if (user) {
            isUser = true;
            res.send({user, isUser});
        } else {
            res.status(404).send('User not found'); 
        }
    } catch (error) {
        res.send({isUser: false});
        res.status(500).send(error)
    }
})
module.exports = app;   