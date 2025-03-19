import React, { useContext, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { ThemeContext } from "../context/Theme";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const { theme } = useContext(ThemeContext);
  const [options, setOptions] = useState(null);
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const { login, userData } = useSelector((state) => {
    return state.user;
  });

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/todo/${userData.userId}`
      );
      setTodos(response.data);
    } catch (err) {
      if (login) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleAddTodo = async () => {
    setError("");
    if (!login) {
      toast.error("Please login to add a todo");
      navigate("/login");
      return;
    }

    if (!todo.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/todo/add-todo`,
        { userId: userData.userId, content: todo }
      );
      toast.success("Todo added");
      setTodo(""); // Clear input after successful addition
      fetchTodos(); // Refresh the list of todos
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const handleUpdateTodo = async (id, updatedContent) => {
    setError("");
    if (!updatedContent.trim()) {
      setError("Todo cannot be empty");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/update-todo/${id}`,
        { content: updatedContent }
      );
      toast.success("Todo updated");
      fetchTodos(); // Refresh the list of todos
      setEdit(null); // Exit edit mode
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/todo/completed-todo/${id}`,
        { completed }
      );
      toast.success("Todo status updated");
      fetchTodos(); // Refresh the list of todos
    } catch (err) {
      toast.error("Failed to update todo status");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/todo/delete-todo/${id}`
      );
      toast.success("Todo deleted");
      fetchTodos(); // Refresh the list of todos
    } catch (err) {
      toast.error("Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      className={`${
        theme === "light" ? "light" : "dark"
      } h-screen pt-20 sm:px-10 overflow-auto`}
    >
      <div className="flex justify-center">
        <TypeAnimation
          sequence={["Remember", 1000, "Your Task", 1000]}
          wrapper="span"
          speed={50}
          className="text-3xl sm:text-[3rem]"
          style={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Playwrite HU",
          }}
          repeat={Infinity}
        />
      </div>
      <p className="text-center text-white mt-3 text-sm">
        A platform for your ease
      </p>

      <div className="flex justify-center mt-10">
        <div className="flex flex-wrap justify-center gap-2">
          <div className="bg-white/60 overflow-hidden rounded-3xl w-[18rem] sm:w-[30rem] flex items-center justify-between">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="border-0 outline-0 w-[100%] px-4 py-2"
              placeholder="Enter your todo"
            />
          </div>
          <button
            onClick={handleAddTodo}
            className={`${
              theme === "light" ? "bg-dark-purple" : "bg-blue"
            } text-white hover:scale-105 text-nowrap transition-all text-sm sm:text-[1rem] cursor-pointer px-2 sm:px-7 py-1 sm:py-2 rounded-xl sm:rounded-2xl`}
          >
            Add Todo
          </button>
        </div>
      </div>
      {error && (
        <p className="text-center text-red-500 mt-2 text-sm">{error}</p>
      )}

      <div className="w-[95%] sm:w-[90%] lg:w-[50%] flex flex-col gap-2 h-[22rem] overflow-auto hide-scrollbar mx-auto mt-10">
        {todos.map((item, index) => (
          <div
            key={item?._id || index}
            onMouseEnter={() => {
              setOptions(index);
            }}
            onMouseLeave={() => {
              setOptions(null);
            }}
            className="bg-white/50 backdrop-blur-xl px-3 py-2 rounded-2xl flex gap-2"
          >
            <input
              type="checkbox"
              checked={item?.completed}
              onChange={(e) => handleToggleComplete(item._id, e.target.checked)}
            />
            {edit === index ? (
              <textarea
                name=""
                id=""
                className="bg-white rounded-lg w-[87%] p-2 text-[0.8rem] border-0 outline-0"
                defaultValue={item?.content}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUpdateTodo(item._id, e.target.value);
                  }
                }}
              ></textarea>
            ) : (
              <p className={`w-[87%] ${item?.completed ? "line-through" : ""}`}>
                {item?.content}
              </p>
            )}

            <div
              className={`${
                options === index ? "flex" : "hidden"
              } text-gray-600 items-center gap-3`}
            >
              <span
                onClick={() => {
                  if (edit === index) {
                    setEdit(null);
                    return;
                  }
                  setEdit(index);
                }}
                className="fa-solid fa-pen cursor-pointer"
              ></span>
              <span
                onClick={() => handleDeleteTodo(item._id)}
                className="fa-solid fa-trash cursor-pointer"
              ></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
