import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
        <h3 className="text-center">Developed By &copy; Shreyash</h3>
        <p className="text-center mt-3">
           <Link to="/about">About</Link> 
           <Link to="/contact">Contact Us</Link> 
        </p>
    </div>
  )
}

export default Footer