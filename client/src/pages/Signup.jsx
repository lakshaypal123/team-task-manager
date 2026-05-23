import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import API from "../services/api";

function Signup(){

    const navigate=useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"member"
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

            await API.post("/auth/signup",formData);

            alert("Signup successful");

            navigate("/login");

        }catch(error){
            alert(error.response.data.message);
        }
    };

    return(
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSubmit}>

                <h2>Signup</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleChange}
                    required
                />

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

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="member">
                        Member
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

                <button type="submit">
                    Signup
                </button>

                <p>
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Signup;