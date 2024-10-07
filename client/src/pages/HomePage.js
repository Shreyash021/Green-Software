

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {

    const navigate = useNavigate();
    const [cart, setCart] = useCart();
  


   const [products, setProducts] = useState([]);
   const getAllProducts = async () => {
     try {
       const response = (await axios.get("/api/v1/product/get-product")).data;
       console.log(response);
       const temp=response.data;
       setProducts(temp);
     } catch (error) {
       console.log(error);
       toast.error("something wrong");
     }
   };
 
   useEffect(() => {
     getAllProducts();
   }, []);
 
   


    return (
        <Layout >
          <div className="container-fluid row mt-3 home-page">
            <div className="col-md-16 ">
              <h1 className="text-center">All Products</h1>
              <div className="d-flex flex-wrap prod">
                {products?.map((p) => (
                  <div className="card m-2" key={p._id}>
                    <img
                      src={`${p.photo}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price}
                        </h5>
                      </div>
                      <p className="card-text ">
                        {p.description.substring(0, 60)}...
                      </p>
                      <div className="card-name-price">
                        <button
                          className="btn btn-info ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-dark ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      );
    };

    export default HomePage