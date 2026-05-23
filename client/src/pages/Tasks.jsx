import {useEffect,useState} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar.jsx";
import { isAdmin } from "../utils/auth";

function Tasks(){

    const [tasks,setTasks]=useState([]);
    const [users,setUsers]=useState([]);

    const [formData,setFormData]=useState({
        title:"",
        description:"",
        priority:"Medium",
        dueDate:"",
        status:"Pending",
        assignedTo:""
    });

    useEffect(()=>{
        fetchTasks();
        fetchUsers();
    },[]);

    const fetchTasks=async()=>{

        try{

            const res=await API.get("/tasks");

            setTasks(res.data);

        }catch(error){
            console.log(error);
        }
    };
    const fetchUsers=async()=>{

    try{

        const res=await API.get("/users");

        setUsers(res.data);

    }catch(error){
        console.log(error);
    }
};

    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await API.post(
                "/tasks",
                formData
            );

            fetchTasks();

            setFormData({
                title:"",
                description:"",
                priority:"Medium",
                dueDate:"",
                status:"Pending"
            });

        }catch(error){
            console.log(error.response.data);
        }
    };

    const updateStatus=async(id,status)=>{

        try{

            await API.put(
                `/tasks/${id}`,
                {
                    status
                }
            );

            fetchTasks();

        }catch(error){
            console.log(error);
        }
    };

    const deleteTask=async(id)=>{

        try{

            await API.delete(`/tasks/${id}`);

            fetchTasks();

        }catch(error){
            console.log(error);
        }
    };

    return(

        <div className="layout">

            <Sidebar/>

            <div className="main-content">

                <div className="tasks-container">

                    <h1>Tasks</h1>
                    {
                    isAdmin()&&(
                    <form
                        className="task-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >

                            <option>
                                Low
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                High
                            </option>

                        </select>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                        <select
    name="assignedTo"
    value={formData.assignedTo}
    onChange={handleChange}
>

    <option value="">
        Assign Member
    </option>

    {
        users.map((user)=>(

            <option
                key={user._id}
                value={user._id}
            >
                {user.name}
            </option>
        ))
    }

</select>

                        <button type="submit">
                            Create Task
                        </button>

                    </form>)}

                    <div className="task-list">

                        {
                            tasks.map((task)=>(

                                <div
                                    className="task-card"
                                    key={task._id}
                                >

                                    <h3>
                                        {task.title}
                                    </h3>

                                    <p>
                                        {task.description}
                                    </p>
                                    <p>
    Assigned To:
    {" "}
    {
        task.assignedTo
        ?
        task.assignedTo.name
        :
        "Unassigned"
    }
</p>

                                    <p>
                                        Priority:
                                        {" "}
                                        {task.priority}
                                    </p>

                                    <p>
                                        Due Date:
                                        {" "}
                                        {
                                            task.dueDate
                                            ?
                                            new Date(
                                                task.dueDate
                                            ).toLocaleDateString()
                                            :
                                            "No Due Date"
                                        }
                                    </p>

                                    <select
                                        value={task.status}
                                        onChange={(e)=>
                                            updateStatus(
                                                task._id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            In Progress
                                        </option>

                                        <option>
                                            Completed
                                        </option>

                                    </select>

                                    <button
                                        onClick={()=>
                                            deleteTask(task._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Tasks;