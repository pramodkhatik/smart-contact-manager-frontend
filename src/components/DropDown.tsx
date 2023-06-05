import React, { useState } from "react";
import "./DropDown.css";
import { getToken, getCurrentUser } from "../auth";
import { myAxios } from "../services/helper.js";
import { toast } from "react-toastify";
import axios from "axios";
interface ContactDetails {
  contactData: any;
}

const DropDown: React.FC<ContactDetails> = ({ contactData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [updatedContactData, setUpdatedContactData] = useState(contactData);

  const openImage = () => {
    setImageUpload(true);
  };

  const closeImage = () => {
    setImageUpload(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openDelete = () => {
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
  };

  const openUpdate = () => {
    setUpdateOpen(true);
  };

  const closeUpdate = () => {
    setUpdateOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = event.target;
    setUpdatedContactData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleUpdate = async (updatedData: any) => {
    await axios
      .post("http://localhost:8081/api/contacts", updatedData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.log(error);
      });
    toast.success("Contact Details Updated");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.replace("/user/home");
    closeUpdate();
  };

  const handleDelete = async () => {
    // console.log(contactData.contactId);
    myAxios
      .delete(`/contacts/${contactData.contactId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((error: any) => console.log(error));

    toast.success("Contact Deleted Successfully!!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.replace("/user/home");
    closeDelete();
  };

  const handleContactImageUpload = async (
    event: { target: { files: any[] } },
    contactId: any
  ) => {
    console.log(contactId);
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      updatedContactData.image = file.name;
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("image", file);
    console.log(formData);

    await axios
      .post(
        "http://localhost:8081/api/contacts/image/upload/" + contactId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        toast.success("Image Uploaded");
        console.log(response.data);
        window.location.replace("/user/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log(updatedContactData);

  return (
    <div>
      <div className="dropdown">
        <i
          className="fa fa-ellipsis-v"
          aria-hidden="true"
          style={{
            marginLeft: "10rem",
            marginBottom: "2rem",
            cursor: "pointer",
            position: "absolute",
          }}
          onClick={toggleDropdown}
        ></i>
        {dropdownOpen && (
          <div className="dropdown-content">
            <a href="#" onClick={openImage}>
              Upload Image
            </a>
            {imageUpload && (
              <div className="image-confirmation-modal">
                <div className="image-confirmation-box">
                  <h3>Upload Image</h3>
                  <form>
                    <label htmlFor="image">Image :</label>
                    <input
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      onSubmit={(event) =>
                        handleContactImageUpload(
                          event,
                          updatedContactData.contactId
                        )
                      }
                    />
                    <div className="image-confirmation-buttons">
                      <button type="submit" className="btn btn-primary">
                        Upload
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={closeImage}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <a href="#" onClick={openUpdate}>
              Update
            </a>
            {updateOpen && (
              <div className="update-confirmation-modal">
                <div className="update-confirmation-box">
                  <form className="mx-1 mx-md-4">
                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={updatedContactData.name}
                          onChange={(event) => handleInputChange(event, "name")}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="secondName">Second Name:</label>
                        <input
                          type="text"
                          id="secondName"
                          name="secondName"
                          className="form-control"
                          value={updatedContactData.secondName}
                          onChange={(event) =>
                            handleInputChange(event, "secondName")
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="work">Work:</label>
                        <input
                          type="text"
                          id="work"
                          name="work"
                          className="form-control"
                          value={updatedContactData.work}
                          onChange={(event) => handleInputChange(event, "work")}
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={updatedContactData.email}
                          onChange={(event) =>
                            handleInputChange(event, "email")
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={updatedContactData.phone}
                          onChange={(event) =>
                            handleInputChange(event, "phone")
                          }
                        />
                      </div>
                      <div className="col">
                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                          value={updatedContactData.description}
                          onChange={(event) =>
                            handleInputChange(event, "description")
                          }
                        />
                      </div>
                    </div>
                    <div className="update-confirmation-buttons">
                      <button
                        onClick={() => handleUpdate(updatedContactData)}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <button
                        onClick={closeUpdate}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <a href="#" onClick={openDelete}>
              Delete
            </a>
            {deleteOpen && (
              <div className="confirmation-modal">
                <div className="confirmation-box">
                  <h3>Confirm Deletion</h3>
                  <p>Are you sure you want to delete this contact?</p>
                  <div className="confirmation-buttons">
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Confirm
                    </button>
                    <button className="btn btn-secondary" onClick={closeDelete}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
