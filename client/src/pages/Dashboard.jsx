import {useContext,useEffect,useState} from "react";

import API from "../services/api";

import {AuthContext} from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";

function Dashboard(){

    const {user,logout}=useContext(AuthContext);

    const [stats,setStats]=useState({
        totalTasks:0,
        pendingTasks:0,
        completedTasks:0,
        overdueTasks:0
    });

    useEffect(()=>{
        fetchDashboard();
    },[]);

    const fetchDashboard=async()=>{

        try{

            const res=await API.get("/dashboard/stats");

            setStats(res.data);

        }catch(error){
            console.log(error);
        }
    };

   return(

    <div className="layout">

        <Sidebar/>

        <div className="main-content">


            <div className="dashboard-container">

                <div className="dashboard-header">

                    <h1>
                        Welcome {user?.name}
                    </h1>
                </div>

                <div className="stats-grid">

                    <div className="stat-card">

                        <h3>Total Tasks</h3>

                        <p>{stats.totalTasks}</p>

                    </div>

                    <div className="stat-card">

                        <h3>Pending Tasks</h3>

                        <p>{stats.pendingTasks}</p>

                    </div>

                    <div className="stat-card">

                        <h3>Completed Tasks</h3>

                        <p>{stats.completedTasks}</p>

                    </div>

                    <div className="stat-card">

                        <h3>Overdue Tasks</h3>

                        <p>{stats.overdueTasks}</p>

                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default Dashboard;