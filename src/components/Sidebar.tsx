import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { getCurrentUser, getToken } from "../auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const userData = getCurrentUser();
  const token = getToken();
  const image =
    getCurrentUser.image == null
      ? window.location.origin + "/default.png"
      : "http://localhost:8081/api/users/image/" + userData.id;
  console.log(userData);
  const [profileImage, setProfileImage] = useState(image);

  const handleImageUpload = async () => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      userData.imageUrl = file.name;
      console.log(file.name);
      setProfileImage(file.name);
    };
    reader.readAsDataURL(file);
    const image = new FormData();
    image.append("profileImage", file);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/users/image/upload/" + userData.id,
        image,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Image Uploaded");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sidebar">
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
        <div className="user-data">
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
