const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

//Task Management (CRUD)

// Create a new task      (POST http://localhost:3000/tasks)
router.post("/", auth, async (req, res) => {
    const { title, description, status } = req.body;

    const task = new Task({userId: req.user.id, title, description, status})
    await task.save()

    res.status(201).json({message: 'Task Created Successfully', task})   // no need to respond with id if the task will display task Schema which contains id, so it wont display twice in responds
});

// Get all tasks for logged-in user   (GET http://localhost:3000/tasks)
router.get("/", auth, async (req, res) => {
    const tasks = await Task.find({userId: req.user.id})
    
    res.status(201).json({tasks})
});

// search For all completed Or pending tasks for logged-in user   (GET http://localhost:3000/tasks/search?status=pending) or http://localhost:3000/tasks/search?status=completed
router.get("/search", auth, async (req, res) => {
    const { status } = req.query;  // Get status from query params

    if (!status || (status !== "pending" && status !== "completed")) {
        return res.status(400).json({ message: "Invalid status. Use 'pending' or 'completed'." });
    }
    
    try {
        // Find tasks for the logged-in user with the specified status
        const tasks = await Task.find({userId: req.user.id, status}).limit(50);

        if (!tasks) {
            return res.status(404).json({ message: 'There is no such task' });
        }
    
        res.status(201).json({tasks})
    } catch (error) {
        console.error('Error Searching tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    
});

// Get a specific task by id        (GET http://localhost:3000/tasks/:id)
router.get("/:id", auth, async (req, res) => {
    const task = await Task.findOne({_id: req.params.id, userId: req.user.id});
    if(!task) return res.status(404).json({message: "task not found"})

    res.status(201).json({task})
});

// Update a task (PUT http://localhost:3000/tasks/:id)
router.put("/:id", auth, async (req, res) => {
    const task = await Task.findOneAndUpdate({_id: req.params.id, userId: req.user.id}, req.body, { new: true });
    if(!task) return res.status(404).json({message: "task not found"})

    res.status(201).json({message: 'Task Updated Successfully', task})
});

// Delete a task  (DELETE http://localhost:3000/tasks/:id)
router.delete("/:id", auth, async (req, res) => {
    const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.user.id});
    if(!task) return res.status(404).json({message: "task not found"})

    res.status(201).json({message: 'Task Deleted Successfully'})
});

module.exports = router;