import {Link} from "react-router-dom";

function Navbar(){

    return(

        <nav className="navbar">

            <h2>Team Task Manager</h2>

            <div className="nav-links">

                <Link to="/">
                    Dashboard
                </Link>

                <Link to="/tasks">
                    Tasks
                </Link>

                <Link to="/projects">
                    Projects
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;