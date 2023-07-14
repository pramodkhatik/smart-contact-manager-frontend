import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { getCurrentUser, getToken } from "../auth";
import axios from "axios";
import { toast } from "react-toastify";
import { ChangeEvent } from "react";

const Sidebar: React.FC = () => {
  const userData = getCurrentUser();
  const token = getToken();

  const getImage = () => {
    let profileImage = window.location.origin + "/default.png";
    // console.log(userData);
    if (userData.imageUrl != null && userData.imageUrl != "")
      profileImage = "http://172.30.85.94:8081/api/users/image/" + userData.id;
    return profileImage;
  };

  // const [image, setImage] = useState(profileImage);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    // console.log(event.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      userData.imageUrl = file.name;
      // console.log(file.name);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("image", file);
    // console.log(formData);

    await axios
      .post(
        "http://172.30.85.94:8081/api/users/image/upload/" + userData.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async () => {
        toast.success("Image Uploaded");
        // console.log(response.data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        window.location.replace("/user/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="sidebar">
        <form>
          <div className="content">
            <label htmlFor="image">
              <img
                src={getImage()}
                alt="User Avatar"
                className="rounded-circle avatar-img"
              />
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(event) => handleImageUpload(event)}
              style={{ display: "none" }}
            />
          </div>
        </form>
        <div className="user-data">
          <h5 style={{ color: "white", textAlign: "center" }}>
            {userData.name}
          </h5>
        </div>
        <hr />
        <div className="info-box" style={{ color: "white", fontSize: "small" }}>
          {userData.about}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
