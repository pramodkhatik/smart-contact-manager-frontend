import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import HomePage from "./components/HomePage";
import AddContact from "./components/AddContact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Registration} />
        <Route path="/home" Component={HomePage} />
        <Route path="/addContact" Component={AddContact} />
      </Routes>
    </Router>
  );
};

export default App;
