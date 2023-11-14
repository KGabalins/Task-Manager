import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SingleTask from "./components/SingleTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:taskID" element={<SingleTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
