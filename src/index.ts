import express, { Request, Response } from "express";
import taskRouter from "./routes/tasks";

const app = express()

app.use(express.json())

app.use("/api/tasks", taskRouter)

app.get("/", (req: Request, res: Response) => {
    res.json({ status: true, message: "Server is running..." })
})

app.listen(8080, () => {
    console.log("server is running at http://localhost:8080")
})