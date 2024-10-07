import React from 'react'
import Layout from "../../components/Layout/Layout"
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {

    const [auth]=useAuth();

  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu></AdminMenu>
                </div>
                <div className="col-md-9">
                   <div className="card w-75 p-3">
                        <div className='paneltemp'>
                        <h4>Admin Name : </h4>
                        <h5>{auth?.user?.name}</h5>
                        </div>
                      <div className='paneltemp'>
                      <h4>Admin Email: </h4>
                        <h5>{auth?.user?.email}</h5>
                      </div>
                   <div className='paneltemp'>
                   <h4>Admin Contact: </h4>
                        <h5>{auth?.user?.mobileno}</h5>
                   </div>
                        
                   </div>
                </div>

            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard