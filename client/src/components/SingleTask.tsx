import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "./types/task";

const SingleTask = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [successMsg, setSuccessMsg] = useState({
    message: "Task edited successfully!",
    active: false,
  });
  const { taskID } = useParams();

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = () => {
    axios
      .get(`http://localhost:3000/api/v1/tasks/${taskID}`)
      .then((response) => response.data)
      .then((data) => setTask(data.task));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .patch(`http://localhost:3000/api/v1/tasks/${taskID}`, task)
      .then(() =>
        setSuccessMsg((prevState) => {
          return { ...prevState, active: true };
        })
      )
      .catch((error) => alert(error));
  };

  return (
    <div className="flex items-center flex-col py-40">
      <h3
        className={`text-center text-green-500 ${
          successMsg.active ? "opacity-100" : "opacity-0"
        }`}
      >
        {successMsg.message}
      </h3>
      <div className="border shadow-lg flex flex-col w-[450px] p-8 my-4 bg-white">
        <h2 className=" text-center mb-6 font-bold text-2xl">Edit Task</h2>
        {task ? (
          <>
            <form className="grid grid-cols-3 gap-4" onSubmit={handleSubmit}>
              <label htmlFor="taskID" className="col-span-1">
                Task ID
              </label>
              <span id="taskID" className="col-span-2">
                {taskID}
              </span>
              <label htmlFor="taskName" className="col-span-1">
                Name
              </label>
              <input
                id="taskName"
                className="col-span-2 bg-zinc-200 px-2 py-1 rounded-md"
                value={task.name}
                onChange={(e) => {
                  setTask((prevState) => {
                    if (!prevState) return prevState;
                    return { ...prevState, name: e.target.value };
                  });
                }}
                type="text"
              />
              <label htmlFor="taskCompleted" className="col-span-1">
                Completed
              </label>
              <input
                id="taskCompleted"
                className="col-span-2 float-left"
                checked={task.completed}
                onChange={(e) =>
                  setTask((prevState) => {
                    if (!prevState) return prevState;
                    return { ...prevState, completed: e.target.checked };
                  })
                }
                type="checkbox"
              />
              <button
                type="submit"
                className="col-span-3 bg-blue-500 text-white rounded-md py-1"
              >
                Edit
              </button>
            </form>
          </>
        ) : (
          <p>Task with id: "{taskID}" Does not exist!</p>
        )}
      </div>

      <Link to="/" className=" bg-black text-white py-2 px-12 rounded-md">
        Back To Tasks
      </Link>
    </div>
  );
};

export default SingleTask;
