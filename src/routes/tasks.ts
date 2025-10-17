import { Router, Request, Response } from "express"
import { Task } from "../model/task"
import { v4 as uuidv4 } from "uuid";

const taskRouter = Router()

let tasks: Task[] = []

taskRouter.get("/", (req: Request, res: Response) => {
    res.json({ success: true, data: tasks })
})

taskRouter.post("/", (req: Request, res: Response) => {
    const { title, description } = req.body
    const date: Date = new Date()
    const task: Task = {
        id: uuidv4(),
        title,
        description,
        completed: false
    }
    tasks.push(task)
    res.status(201)
    res.json({ success: true, data: task })
})

export default taskRouter