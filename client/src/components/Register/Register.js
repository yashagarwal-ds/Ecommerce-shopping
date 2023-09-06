import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Register = () => {

    let navigate = useNavigate();

    const [user, setUser] = React.useState({
        username : "",
        email : "", 
        password : ""
    });

    const [data, setData] = React.useState();

    const {username, email, password} = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/auth/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username : username,
                email : email,
                password : password
            })
        }).then((response) => response.json()).then((result) => {
            console.log(result);
            setData(result);
        }).catch((error) => console.log(error))
    };

    React.useEffect(() => {
        if(data?.isSuccess){
            toast.success("User is registered succesfully", {theme : "colored"});
            setUser({
                username : "",
                email : "", 
                password : ""
            });
            navigate("/login")
        }else{
            toast.error("Please fill the details properly", {theme : "colored"})
        }
    }, [data])

  return (
    <div className="container">
      <form>
        <div className="mb-3">
            <label className="form-label">
                UserName
            </label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUser({...user, username : e.target.value})} />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setUser({...user, email : e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setUser({...user, password : e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
