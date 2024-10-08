import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import toast from "react-hot-toast";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;



const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  // const [shipping,setShipping]=useState("");

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  };


  const handleCreate=async(e)=>{
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
      const {data}=axios.post('/api/v1/product/create-product',productData);

      if(data?.success){
        toast.error("something wrong");
      }
      else{
        toast.success('Product created successfully');
        navigate("/dashboard/admin/products");
      

      }
    }catch(err){
      console.log(err);
      toast.error("something wrong")
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                  {photo? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
              </div>
              <div className="mb-3">
                  {photo && (<div className="text-center">
                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className="img img-responsive"/>
                  </div>)}
              </div>

                <div className="mb-3">
                    <input type="text" value={name} placeholder="write a name" className="form-control" onChange={(e)=>setName(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <input type="text" value={description} placeholder="write a description" className="form-control" onChange={(e)=>setDescription(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <input type="text" value={price} placeholder="write Price" className="form-control" onChange={(e)=>setPrice(e.target.value)}></input>
                </div>

                <div className="mb-3">
                    <input type="text" value={quantity} placeholder="write quantity" className="form-control" onChange={(e)=>setQuantity(e.target.value)}></input>
                </div>

                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>Create Product</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
