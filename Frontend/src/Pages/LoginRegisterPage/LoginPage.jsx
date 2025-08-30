import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './LoginRegisterPage.css'

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setName('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLogin){
        try {
            const res= await axios.post('http://localhost:5000/api/auth/login',{email,password});
            if(res.data){
                alert(res.data.message);
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('user',JSON.stringify(res.data.user));
                navigate('/');
                setEmail('');
                setPassword('');
            }else{
                alert(res.data.message);
            }
        } catch (error) {
            alert("Something wents wrong");
            console.log(error);
        }
    }else{
        try {
            const res= await axios.post('http://localhost:5000/api/auth/register',{name,email,password});
            if(res.data.success){
                alert(res.data.message);
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('name',res.data.name);
                navigate('/');
                setIsLogin(true);
            }else{
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something wents wrong");
        }
    }

}
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "28rem", borderRadius: "15px" }}>
        <div className="card-body text-center">
          <h3 className="card-title mb-4 text-white">{isLogin ? "Welcome Back!" : "Join Us!"}</h3>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-start d-block text-white">
                  Full Name
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form-control"
                  value={name}
                  id="name"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start d-block text-white">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start d-block text-white">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              style={{ borderRadius: "25px" }}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-white">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link text-decoration-none text-white"
              onClick={toggleForm}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
