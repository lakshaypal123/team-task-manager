import {useEffect,useState} from "react";

import API from "../services/api";

import Sidebar from "../components/Sidebar.jsx";
import { isAdmin } from "../utils/auth";

function Projects(){

    const [projects,setProjects]=useState([]);

    const [formData,setFormData]=useState({
        title:"",
        description:"",
        members:[]
    });

    useEffect(()=>{
        fetchProjects();
    },[]);

    const fetchProjects=async()=>{

        try{

            const res=await API.get("/projects");

            setProjects(res.data);

        }catch(error){
            console.log(error);
        }
    };

    const createProject=async(e)=>{

        e.preventDefault();

        try{

            await API.post(
                "/projects",
                formData
            );

            setFormData({
                title:"",
                description:"",
                members:[]
            });

            fetchProjects();

        }catch(error){
            console.log(error.response.data);
        }
    };

    return(

        <div className="layout">

            <Sidebar/>

            <div className="main-content">

                <div className="projects-container">

                    <h1>Projects</h1>
                    {
                    isAdmin() && (
                    <form
                        className="task-form"
                        onSubmit={createProject}
                    >

                        <input
                            type="text"
                            placeholder="Project Title"
                            value={formData.title}
                            onChange={(e)=>
                                setFormData({
                                    ...formData,
                                    title:e.target.value
                                })
                            }
                            required
                        />

                        <textarea
                            placeholder="Project Description"
                            value={formData.description}
                            onChange={(e)=>
                                setFormData({
                                    ...formData,
                                    description:e.target.value
                                })
                            }
                            required
                        />

                        <button type="submit">
                            Create Project
                        </button>

                    </form>
)}
                    <div className="project-grid">

                        {
                            projects.map((project)=>(

                                <div
                                    className="task-card"
                                    key={project._id}
                                >

                                    <h3>
                                        {project.title}
                                    </h3>

                                    <p>
                                        {project.description}
                                    </p>

                                    <p>
                                        Members:
                                        {" "}
                                        {
                                            project.members?.length || 0
                                        }
                                    </p>

                                    <p>
                                        Created By:
                                        {" "}
                                        {
                                            project.createdBy?.name
                                        }
                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Projects;