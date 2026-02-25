import Todomodel from "../Models/Todo.js";


// CREATE
export const createTodo = async (req,res)=>{
    try{
        const newTodo = await Todomodel.create(req.body);

        res.status(201).json({
            message:"Todo created successfully",
            data:newTodo
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
};


// Read
export const getTodos = async (req,res)=>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const todos = await Todomodel.find()
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1});

        const total = await Todomodel.countDocuments();

        res.json({
            todos,
            currentPage:page,
            totalPages:Math.ceil(total/limit)
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
};


// UPDATE
export const updateTodo = async (req,res)=>{
    try{
        const updatedTodo = await Todomodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json({
            message:"Todo updated successfully",
            data:updatedTodo
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
};


// DELETE
export const deleteTodo = async (req,res)=>{
    try{
        await Todomodel.findByIdAndDelete(req.params.id);

        res.json({
            message:"Todo deleted successfully"
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
};