// import React from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const getAllProducts = async () => {
//     try {
//       const response = (await axios.get("/api/v1/product/get-product")).data;
//       console.log("\n\n\n\n\n");
//       // const pr = Array.from(data.products);
//       // console.log(pr);
//       //console.log(response);
//       const temp=response.data;
//       setProducts(temp);
//     } catch (error) {
//       console.log(error);
//       toast.error("something wrong");
//     }
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <Layout>
//     <div className="container-fluid m-3 p-3">
//       <div className="row">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1>All Products List</h1>
//           <div className="d-flex">
//             {products?.map((p) => (
//               <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
//                 <div className="card m-2" style={{ width: "18rem" }}>
//                   <img src={`${p.photo}`} className="card-img-top" alt={p.name} />
//                   <div className="card-body">
//                     <h5 className="card-title">{p.name}</h5>
//                     <p className="card-text">{p.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//       </div>
//     </Layout>
//   );
// };

// export default Products;


import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import "../../styles/Products.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = (await axios.get("/api/v1/product/get-product")).data;
      console.log("\n\n\n\n\n");
      // const pr = Array.from(data.products);
      // console.log(pr);
      //console.log(response);
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
    <Layout>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 productsPage">
          <h1>All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                <div className="card m-2">
                  <img src={`${p.photo}`} className="card-img-top" alt={p.name} />
                  <div className="card-body">
                  <div className="card-title-text">
                  <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Products;

