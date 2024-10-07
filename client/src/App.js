import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import CartPage from "./pages/CartPage";
import Categories from "./pages/Categories";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
       
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}></Route>
          <Route path="admin/create-category" element={<CreateCategory/>}></Route>
          <Route path="admin/create-product" element={<CreateProduct/>}></Route>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}></Route>
          <Route path="admin/users" element={<Users/>}></Route>
          <Route path="admin/products" element={<Products/>}></Route>
        </Route>
        <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path="user" element={<Dashboard/>}></Route>
          <Route path="user/orders" element={<Orders/>}></Route>
          {/* <Route path="user/products" element={<Productsu/>}></Route> */}
          <Route path="user/profile" element={<Profile/>}></Route>
        </Route>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<Pagenotfound/>}/>
      </Routes>
    </>
  );
}

export default App;
