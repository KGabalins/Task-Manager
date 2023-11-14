const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

// Variables
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get("/api/v1/tasks")         - get all the tasks
// app.post("/api/v1/tasks")        - create a new task
// app.get("/api/v1/tasks/:id")     - get single task
// app.patch("/api/v1/tasks/:id")   - update task
// app.delete("/api/v1/tasks/:id")  - delete task

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");
    app.listen(port, console.log(`Server running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
