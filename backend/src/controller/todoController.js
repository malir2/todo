import Todo from "../models/TodoModel.js";

export const getAllTodo = async (req, res) => {
  try {
    const { userId } = req.params; // Take userId from query params (not body)
    if (!userId) return res.status(400).json({ msg: "User ID is required" });

    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const addTodo = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ msg: "User ID and content are required" });
    }

    const newTodo = new Todo({ userId, content, completed: false });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { content }, // Fix: Wrap content inside an object
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// ✅ Mark a todo as completed
export const completed = async (req, res) => {
  try {
    const { id } = req.params;

    const completedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!completedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json(completedTodo);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
