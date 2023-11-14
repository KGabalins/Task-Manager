import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Task } from "./types/task";

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postTask(newTask);
  };

  const loadTasks = () => {
    axios
      .get("http://localhost:3000/api/v1/tasks")
      .then((response) => response.data)
      .then((data) => setTasks(data.tasks));
  };

  const postTask = (taskName: string) => {
    axios
      .post("http://localhost:3000/api/v1/tasks", { name: taskName })
      .then(() => {
        loadTasks();
        setNewTask("");
      })
      .catch((error) => alert(error));
  };

  const deleteTask = (taskID: string) => {
    axios
      .delete(`http://localhost:3000/api/v1/tasks/${taskID}`)
      .then(loadTasks)
      .catch((error) => alert(error));
  };

  return (
    <div className="flex items-center flex-col">
      <div className=" border shadow-lg flex flex-col w-[450px] p-8 my-20 bg-white">
        <label className=" text-center mb-4 font-bold" htmlFor="task-manager">
          Task Manager
        </label>
        <form className="grid  grid-cols-8" onSubmit={submitHandler}>
          <input
            type="text"
            className=" bg-zinc-200 col-span-6 px-2 py-1"
            id="task-manager"
            placeholder="e.g. wash dishes"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className=" bg-blue-600 text-white col-span-2">
            Submit
          </button>
        </form>
      </div>
      {tasks &&
        tasks.map((task) => (
          <div
            key={task._id}
            className=" border shadow-lg flex items-center w-[450px] p-8 my-2 bg-white"
          >
            <span className={`${task.completed && " line-through"}`}>
              {task.name}
            </span>
            <div className=" ml-auto flex gap-4">
              <Link to={`/${task._id}`} className="fas fa-pen-square"></Link>
              <button
                className="fa fa-trash-o"
                onClick={() => deleteTask(task._id)}
              ></button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
