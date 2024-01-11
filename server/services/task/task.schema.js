import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    due: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed'],
        default: 'pending',
    }
});

export default model('Tasks', taskSchema);