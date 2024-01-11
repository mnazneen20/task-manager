import User from '../user/user.schema.js';
import Task from './task.schema.js'
import express from 'express'
import jwt from 'jsonwebtoken';
const taskRouter = express.Router();

// Route for getting a task
taskRouter.get('/task/:taskid', async (req, res) => {
    const { taskid } = req.params;
    try {
        const task = await Task.findById(taskid);
        return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ messege: 'something went wrong' });
    }
})

// Route for adding new task..
taskRouter.post('/task', async (req, res) => {
    const data = req.body;
    const userid = data.user;
    delete data.user;
    try {
        const newtask = await Task.create(data);
        await User.updateOne({ _id: userid }, {
            $push: { 'tasks': newtask._id }
        });
        return res.status(201).json({
            message: 'new task created',
            task: newtask,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'something went wrong' })
    }
});

// Route for updating the task..
taskRouter.patch('/task/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updateTask = await Task.findOneAndUpdate({ _id: id }, { ...data }, { returnOriginal: false });
        return res.status(200).json({ message: 'task upfdated', task: updateTask });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ messege: 'something weny wrong' });
    }
});

// Route for mark completed tasks..
taskRouter.patch('/complete/:taskid', async (req, res) => {
    const { taskid } = req.params;
    try {
        const updatedTask = await Task.findOneAndUpdate({ _id: taskid }, { status: 'completed' }, { returnOriginal: false })
        return res.status(200).json({ message: 'task updated', task: updatedTask })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
});

taskRouter.delete('/task/:id', async (req, res) => {
    const cookiee = req.cookies?.taskmanager;
    const user = jwt.decode(cookiee, process.env.JWT_SECRET);
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        await User.updateOne({ _id: user.id }, {
            $pull: { "tasks": id },
        })
        return res.status(200).json({ messege: 'task deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ messege: 'Something went wrong' })
    }
})

export default taskRouter;