import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { getCurrentUser } from "../auth";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const userData = getCurrentUser();
  const image = "http://localhost:8081/api/users/image/" + userData.id;
  console.log(userData);
  const [profileImage, setProfileImage] = useState(image);

  const handleImageUpload = () => {};

  return (
    <>
      <div className="sidebar position-static">
        <form>
          <div className="content">
            <label htmlFor="profileImage">
              <img
                src={image}
                alt="User Avatar"
                className="rounded-circle avatar-img"
              />
            </label>
            <input
              type="file"
              id="profileImage"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </form>
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
