import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section className="vb-100">
        <div>
          <nav className="navbar" style={{ backgroundColor: "#0478c2" }}>
            <div className="container ">
              <a
                className="navbar-brand text-center fw-bold"
                href="#"
                style={{ color: "white" }}
              >
                <h1>Smart Contact Manager</h1>
              </a>
              <div className="topnav">
                <a className="active" style={{ color: "white" }} href="/home">
                  Home
                </a>
                <a href="/addContact" style={{ color: "white" }}>
                  Add Contact
                </a>
                <a href="/" style={{ color: "white" }}>
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default HomePage;
