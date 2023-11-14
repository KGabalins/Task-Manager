const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const cors = require("cors");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

// Variables
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

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
