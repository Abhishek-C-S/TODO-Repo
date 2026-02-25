import express from "express";
import { createTodo,getTodos,updateTodo,deleteTodo } from "../Controllers/Controllers.js";
const router = express.Router();


router.post("/post",createTodo);
router.get("/get",getTodos);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo);

export default router;