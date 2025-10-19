import { Router, Request, Response } from "express";
import { Task } from "../model/task";
import { v4 as uuidv4 } from "uuid";

const taskRouter = Router();

let tasks: Task[] = [];

taskRouter.get("/", (req: Request, res: Response) => {
  res.json({ success: true, data: tasks });
});

taskRouter.post("/", (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task: Task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };
  tasks.push(task);
  res.status(201);
  res.json({ success: true, data: task });
});

taskRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === id);
  res.status(201);
  res.json({ success: true, data: task });
});

taskRouter.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
  res.status(201);
  res.json({ success: true, data: tasks[taskIndex] });
});

taskRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.status(201);
  res.json({ success: true });
});

export default taskRouter;
