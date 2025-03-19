import { Router } from "express";
import {
  addTodo,
  completed,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from "../controller/todoController.js";

const postRouter = Router();

postRouter.get("/:userId", getAllTodo);
postRouter.post("/add-todo", addTodo);
postRouter.put("/update-todo/:id", updateTodo);
postRouter.delete("/delete-todo/:id", deleteTodo);
postRouter.put("/completed-todo/:id", completed);

export default postRouter;
