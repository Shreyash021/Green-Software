


import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import "../../styles/AuthStyles.css"

import axios from "axios"

import {toast} from "react-hot-toast"

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [mobileno,setMobileno] = useState("");
  const [otp,setOtp]=useState("");

  const navigate = useNavigate();

  const otpSender=async()=>{
    try{
      const res = await axios.post('/api/v1/auth/sendotp',{email});
      if(res && res.data.success){
        toast.success(`${res.data.message}`);
      }
      else{
        toast.error(`${res.data.message}`)
      }
    }catch(e){
      console.log(e);
      toast.error("Something wrong");
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(name,email,password,mobileno,otp);
    try{
      const res = await axios.post('/api/v1/auth/register',{name,email,password,otp,mobileno});

      if(res && res.data.success){
        toast.success(`${res.data.message}`);
        navigate("/login");
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
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
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
              type="text"
              value={mobileno}
              onChange={(e)=>setMobileno(e.target.value)}
              className="form-control"
              id="exampleInputMobno"
              placeholder="Enter Mobile No."
              required
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={otpSender}>
            Send Otp
          </button>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={otp}
              onChange={(e)=>setOtp(e.target.value)}
              className="form-control"
              id="exampleInputOtp"
              placeholder="Enter Otp"
              required
            />
          </div>
    
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
