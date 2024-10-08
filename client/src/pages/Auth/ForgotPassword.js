import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";

import "../../styles/AuthStyles.css"

import axios from "axios"

import {toast} from "react-hot-toast"

import { useAuth } from "../../context/auth";

const ForgotPassword = () => {


    const location = useLocation();
    const [auth,setAuth] =useAuth();
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");

    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(email,password);
        try{
          const res = await axios.post('/api/v1/auth/login',{email,password});
    
          if(res && res.data.success){
            toast.success(`${res.data.message}`);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state || "/");
          }else{
            toast.error(`${res.data.message}`);
          }
    
        } catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
      }


  return (
    <Layout>
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={()=>navigate('/forgot-password')}>
          Forgot Password
        </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  </Layout>
  )
}

export default ForgotPassword