import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api/v1/auth/viewUsers");
      setUsers(response?.data?.users);
    } catch (e) {
      console.log(e);
    }
  };
  var srno = 1;

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No.</th>
            </tr>
          </thead>
          <tbody>
          {users?.map((u)=>(
            <tr>
              <th scope="row">{srno++}</th>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.mobileno}</td>
            </tr>
          ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
