import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

const Login = () => {

    let navigate = useNavigate();

    const [user, setUser] = React.useState({
        email : "", 
        password : ""
    });

    const [data, setData] = React.useState();

    const {email, password} = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/auth/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
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
            toast.success("User is Login Successfully", {theme : "colored"});
            setUser({
                email : "", 
                password : ""
            });
            navigate("/");
        }
    }, [data])

  return (
    <div className="container">
    <form>
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
  )
}

export default Login