import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Projects from "./pages/Projects.jsx";
import NotFound from "./pages/NotFound.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App(){

    return(
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login/>}
                />

                <Route
                    path="/signup"
                    element={<Signup/>}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Tasks/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/projects"
                    element={
                        <ProtectedRoute>
                            <Projects/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound/>}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;