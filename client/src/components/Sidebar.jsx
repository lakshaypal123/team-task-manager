import {Link,useLocation,useNavigate} from "react-router-dom";

function Sidebar(){

    const location=useLocation();
    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <div className="sidebar">

            <h2 className="logo">
                Task Manager
            </h2>

            <Link
                to="/"
                className={
                    location.pathname==="/"
                    ? "active-link"
                    : ""
                }
            >
                Dashboard
            </Link>

            <Link
                to="/tasks"
                className={
                    location.pathname==="/tasks"
                    ? "active-link"
                    : ""
                }
            >
                Tasks
            </Link>

            <Link
                to="/projects"
                className={
                    location.pathname==="/projects"
                    ? "active-link"
                    : ""
                }
            >
                Projects
            </Link>

            {/* Logout */}
            <button
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>
    );
}

export default Sidebar;