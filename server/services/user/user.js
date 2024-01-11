// this is user authentication route.
import Users from "./user.schema.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import express from 'express';
const userRouter = express.Router();

// registering a new user
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
        const newuser = await Users.create({ username, email, password: hashed });
        delete newuser.password;
        return res.status(201).json({ msg: 'new user created', user: newuser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});

// logging in a user
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const finduser = await Users.findOne({ email }).populate('tasks');
        if (!finduser) return res.status(400).json({ msg: 'User not found' });
        else {
            const comparePass = await bcrypt.compare(password, finduser.password);
            if (!comparePass) return res.status(400).json({ msg: 'invalid credentials' });
            delete finduser.password;
            const token = jwt.sign({ id: finduser._id }, process.env.JWT_SECRET);
            // console.log(token)
            res.cookie(process.env.TOKEN, token, {
                httpOnly: true,
                expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)),/* 2 days */
            })
            return res.status(200).json({ msg: 'user logged in', user: finduser });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});

// me request for user refresh
userRouter.get('/me', async (req, res) => {
    const cookiee = req.cookies?.taskmanager;
    if (!cookiee) return res.status(404).json({ messege: 'not authorized' })
    const user = jwt.decode(cookiee, process.env.JWT_SECRET);
    try {
        const me = await Users.findById(user.id).populate('tasks');
        res.status(200).json({ user: me });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went wrong' });
    }
});

userRouter.get('/logout', (req, res) => {
    res.clearCookie(process.env.TOKEN, {
        httpOnly: true,
        expires: new Date(Date.now()) //immidiate cookie excursion.
    });
    return res.status(200).json({ messege: 'logout successful' });
})

export default userRouter;