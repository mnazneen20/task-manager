import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './services/user/user.js';
import taskRouter from './services/task/task.js';

dotenv.config();
const port = 3333;
const app = express();

app.use(cors({
    origin: "task-manager-client-omega.vercel.app",
    credentials: true,
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser())


app.get('/', (req, res) => {
    res.status(200).json({ msg: "hello world" })
});

app.use('/api', userRouter);
app.use('/api', taskRouter);

try {
    mongoose.connect(process.env.MONGO_CRED).then(() => {
        console.log('database connected');
        app.listen(port, () => {
            console.log('Server started at port no:', port)
        })
    })
} catch (error) {
    console.log('something went wrong', error);
}


