import Registration from "./components/Registration";
import Login from "./components/Login";
import { Route, BrowserRouter } from "react-router-dom";
import { Navigate, Routes } from "react-router";
import HomePage from "./components/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import PrivateRouter from "./components/PrivateRouter";
import AddContact from "./components/AddContact";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Registration} />
        <Route path="/user" Component={PrivateRouter}>
          <Route path="home" Component={HomePage} />
          <Route path="addContact" Component={AddContact}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
