const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);

    if (!task)
      return res.status(404).json({ error: `No task with id: ${taskID}` });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findByIdAndUpdate(taskID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task)
      return res.status(404).json({ error: `No task with id: ${taskID}` });

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID);

    if (!task)
      return res.status(404).json({ error: `No task with id: ${taskID}` });

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// app.get("/api/v1/tasks")         - get all the tasks
// app.post("/api/v1/tasks")        - create a new task
// app.get("/api/v1/tasks/:id")     - get single task
// app.patch("/api/v1/tasks/:id")   - update task
// app.delete("/api/v1/tasks/:id")  - delete task

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
