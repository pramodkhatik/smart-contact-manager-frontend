import "./HomePage.css";
import { doLogOut } from "../auth";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";

const HomePage = () => {
  const handleLogOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toast.error("Logged Out");
    doLogOut();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.replace("/");
  };

  return (
    <>
      <section className="vb-100">
        <div>
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
          <div>
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
