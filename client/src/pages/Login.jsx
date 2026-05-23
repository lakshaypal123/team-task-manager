import {useState,useContext} from "react";
import {Link,useNavigate} from "react-router-dom";

import API from "../services/api";
import {AuthContext} from "../context/AuthContext";

function Login(){

    const navigate=useNavigate();

    const {login}=useContext(AuthContext);

    const [formData,setFormData]=useState({
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            const res=await API.post("/auth/login",formData);

            console.log(res.data);
            login(res.data.user,res.data.token);
            


            navigate("/");

        }catch(error){
            alert(error.response.data.message);
        }
    };

    return(
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/signup">
                        Signup
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;