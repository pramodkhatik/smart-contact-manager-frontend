import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { getCurrentUser } from "../auth";
import Avatar from "./Avatar";

const Sidebar: React.FC = () => {
  const userData = getCurrentUser();
  const image = "http://localhost:8081/api/users/image/" + userData.id;
  console.log(userData);
  return (
    <>
      <div className="sidebar position-static">
        <div className="content">
          <img
            src={image}
            alt="User Avatar"
            className="rounded-circle avatar-img"
          />
        </div>
        <div>
          <h4 style={{ color: "white", textAlign: "center" }}>
            {userData.name}
          </h4>
        </div>
        <hr />
        <div className="info-box" style={{ color: "white" }}>
          {userData.about}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
