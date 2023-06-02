import "./HomePage.css";
import "font-awesome/css/font-awesome.min.css";
import { doLogOut } from "../auth";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import MyCard from "./Card";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleLogOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toast.error("Logged Out");
    doLogOut();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSearchValue("");
    window.location.replace("/");
  };

  return (
    <>
      <section className="vb-100">
        <div className="container">
          <nav
            className="navbar fixed-top"
            style={{
              backgroundColor: "#0478c2",
              width: "100%",
              position: "fixed",
            }}
          >
            <div className="container">
              <a
                className="navbar navbar-fixed navbar-brand text-center fw-bold"
                href="#"
                style={{ color: "white" }}
              >
                <h1>Smart Contact Manager</h1>
              </a>
              <div className="search-container">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="search-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <a href="#" className="search-btn">
                  <i className="fa fa-search" style={{ color: "#3f7be4;" }}></i>
                </a>
              </div>
              <div className="topnav">
                <a
                  className="active"
                  style={{ color: "white" }}
                  href="/user/home"
                >
                  Home
                </a>
                <a href="/user/addContact" style={{ color: "white" }}>
                  Add Contact
                </a>
                <a style={{ color: "white" }} onClick={handleLogOut}>
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <div className="grid-container">
            <div>
              <Sidebar />
            </div>
            <div style={{ marginTop: "100px", marginLeft: "10px" }}>
              <div className="main-content">
                <MyCard searchValue={searchValue} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
