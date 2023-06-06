import React, { useState } from "react";
import "./DropDown.css";
import { getToken } from "../auth";
import { toast } from "react-toastify";
import axios from "axios";
import ContactDetails from "./ContactDetails";

interface ContactDetails {
  contactData: any;
}

const DropDown: React.FC<ContactDetails> = ({ contactData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [updatedContactData, setUpdatedContactData] = useState(contactData);
  const [showDetails, setShowDetails] = useState(false);

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

  const openDetails = (contact: any) => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
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
    await axios
      .delete(`http://localhost:8081/api/contacts/${contactData.contactId}`, {
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
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUpdatedContactData((prevData: any) => ({
        ...prevData,
        image: file.name,
      }));
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        `http://localhost:8081/api/contacts/image/upload/${contactId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success("Image Uploaded");
      await new Promise((reslove) => setTimeout(reslove, 1000));
      window.location.replace("/user/home");
    } catch (error) {
      console.log(error);
    }
  };

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
            <a onClick={openImage}>Upload Image</a>
            {imageUpload && (
              <div className="image-confirmation-modal">
                <div className="image-confirmation-box">
                  <h3>Upload Image</h3>
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    onChange={(event) =>
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
                    <button className="btn btn-secondary" onClick={closeImage}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <a onClick={openUpdate}>Update</a>
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
                    <div className="form-group row">
                      <div className="col">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => handleUpdate(updatedContactData)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={closeUpdate}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <a onClick={openDelete}>Delete</a>
            {deleteOpen && (
              <div className="delete-confirmation-modal">
                <div className="delete-confirmation-box">
                  <h3>Delete Contact</h3>
                  <p>Are you sure you want to delete this contact?</p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={closeDelete}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <a onClick={openDetails}>More Info</a>
            {showDetails && (
              <div className="confirmation-modal" ref={updatedContactData}>
                <div className="confirmation-box">
                  <h2>Contact Details</h2>
                  <div className="row">
                    <div className="col">
                      <p>Name: {updatedContactData.name}</p>
                    </div>
                    <div className="col">
                      <p>Designation : {updatedContactData.designation}</p>
                    </div>
                  </div>
                  <p>Name: {updatedContactData.name}</p>
                  <p>Designation : {updatedContactData.designation}</p>
                  <p>Work: {updatedContactData.work}</p>
                  <p>Email: {updatedContactData.email}</p>
                  <p>Phone: {updatedContactData.phone}</p>
                  <p>About: {updatedContactData.description}</p>
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
