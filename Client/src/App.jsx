import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn } from "./pages/auth";
// import Home from './pages/dashboard/home';
// import Message from './pages/dashboard/Message';
// import Orders from './pages/dashboard/Orders';
// import Product from './pages/dashboard/Product';
// import Users from './pages/dashboard/Users';

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/auth/*" element={<Auth />} />
      {/* <Route path="/home" element={<Home />} />
      <Route path="/Message" element={<Message />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Users" element={<Users />} /> */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
