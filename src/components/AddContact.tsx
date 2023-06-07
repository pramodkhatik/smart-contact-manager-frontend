import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, getCurrentUser, doLogOut } from "../auth";
import "./AddContact.css";
import { toast } from "react-toastify";

const AddContact = () => {
  const handleLogOut = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toast.error("Logged Out");
    doLogOut();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.replace("/");
  };
  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    work: "",
    designation: "",
    phone: "",
    email: "",
    image: "",
    description: "",
    user: {},
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleUserData = () => {
    const userData = getCurrentUser();
    setFormData((prevFormData) => ({ ...prevFormData, user: userData }));
    // console.log(userData);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = getToken();
    //console.log(userData);

    // console.log(formData);
    const validationErrors: { [key: string]: string } = {};
    if (formData.name.trim() === "") {
      validationErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters long";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      validationErrors.name = "Name can only contain letters and spaces";
    }

    if (formData.work.trim() === "") {
      validationErrors.work = "Role is required";
    } else if (formData.work.length < 3) {
      validationErrors.work = "Role must be at least 3 characters long";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.work)) {
      validationErrors.work = "Role can only contain letters and spaces";
    }

    if (formData.designation.trim() === "select designation") {
      validationErrors.work = "Designation is required";
    }

    if (formData.phone.trim() === "") {
      validationErrors.phone = "Contact number is required";
    } else if (
      !/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(formData.phone)
    ) {
      validationErrors.phone = "Contact number should be of 10 digits";
    } else if (
      !/^\+?([6,7,8,9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(
        formData.phone
      )
    ) {
      validationErrors.phone = "Please enter valid contact number";
    }

    if (formData.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      validationErrors.email = "Please insert valid email address";
    }

    if (formData.description.length > 500) {
      validationErrors.description = "Max 500 characters allowed ";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/contacts",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(formData);
      console.log("Data Saved:", response.data);
      toast.success("Contact Added Successfully!!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.replace("/user/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    property: string
  ) => {
    setFormData({ ...formData, [property]: event.target.value });
  };

  return (
    <>
      <section className="vb-100">
        <div>
          <nav
            className="navbar fixed-top"
            style={{ backgroundColor: "#0478c2" }}
          >
            <div className="container ">
              <a
                className="navbar-brand text-center fw-bold"
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
                <a style={{ color: "white" }} onClick={handleLogOut}>
                  Logout
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="container h-100" id="root">
          <div className="row d-flex justify-content-center align-itmes-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-0" id="card">
                <div className="card-body p-md-3">
                  <div className="row">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      style={{ width: "100%" }}
                    >
                      <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                        Contact Details
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        action=""
                        onSubmit={handleSubmit}
                      >
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fa-user fa-lg me-3 fa-fw"
                              title="Name"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Contact name"
                              value={formData.name}
                              onChange={(e) => handleChange(e, "name")}
                              style={{ width: "300px", marginLeft: "8px" }}
                            />
                            {errors.name && (
                              <span className="error-message">
                                {errors.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fa-user fa-lg me-3 fa-fw"
                              title="Nick Name"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="secondName"
                              className="form-control"
                              placeholder="Nick name"
                              value={formData.secondName}
                              onChange={(e) => handleChange(e, "secondName")}
                              style={{ width: "300px", marginLeft: "8px" }}
                            />
                            {errors.secondName && (
                              <span className="error-message">
                                {errors.secondName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fas fa-laptop fa-lg me-3 fa-fw"
                              title="Role"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="work"
                              className="form-control"
                              placeholder="Role"
                              value={formData.work}
                              onChange={(e) => handleChange(e, "work")}
                              style={{ width: "300px", marginLeft: "9px" }}
                            />
                            {errors.work && (
                              <span className="error-message">
                                {errors.work}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fa-briefcase fa-lg me-3 fa-fw"
                              title="Designation"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <select
                              id="designation"
                              className="form-control"
                              placeholder="Select Designation"
                              value={formData.designation}
                              onChange={(e) => handleChange(e, "designation")}
                              style={{ width: "300px", marginLeft: "9px" }}
                            >
                              <option value={""}>Select Designation</option>
                              <option value={"Manager"}>Manager</option>
                              <option value={"Director"}>Director</option>
                              <option value={"Associate Engineer"}>
                                Associate Engineer
                              </option>
                              <option value={"Buisness System Analyst"}>
                                BSA
                              </option>
                              <option value={"People & Culture"}>P & C</option>
                              <option value={"Software Engineer"}>
                                Software Engineer
                              </option>
                            </select>
                            {errors.designation && (
                              <span className="error-message">
                                {errors.designation}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fa-phone fa-lg me-3 fa-fw"
                              title="Contact Number"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="phone"
                              className="form-control"
                              placeholder="Contact Number"
                              value={formData.phone}
                              onChange={(e) => handleChange(e, "phone")}
                              style={{ width: "300px", marginLeft: "8px" }}
                            />
                            {errors.phone && (
                              <span className="error-message">
                                {errors.phone}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <label>
                            <i
                              className="fa fa-envelope fa-lg me-3 fa-fw"
                              title="Email"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="email"
                              className="form-control"
                              placeholder="Email"
                              value={formData.email}
                              onChange={(e) => handleChange(e, "email")}
                              style={{ width: "300px", marginLeft: "7px" }}
                            />
                            {errors.email && (
                              <span className="error-message">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-image fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              accept=".png,.jpg,.jpeg,"
                              value={formData.image}
                              onChange={(e) => handleChange(e, "image")}
                               style={{ width: "300px" }}
                            />
                            {errors.image && (
                              <span className="error-message">
                                {errors.image}
                              </span>
                            )}
                          </div>
                        </div> */}
                        <div className="d-flex flex-row align-itmes-center mb-4">
                          <label>
                            <i
                              className="fa fa-info-circle fa-lg me-3 fa-fw"
                              title="Description"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <textarea
                              id="description"
                              name="Description"
                              placeholder="Max 500 characters accepted"
                              // rows={4}
                              cols={35}
                              style={{
                                minWidth: "fit-content",
                                minHeight: "fit-content",
                                marginLeft: "8px",
                                marginRight: "20px",
                                width: "300px",
                              }}
                              value={formData.description}
                              onChange={(e) => handleChange(e, "description")}
                            />
                            <br />
                            {errors.description && (
                              <span className="error-message">
                                {errors.description}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={handleUserData}
                          >
                            Add Contact
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="col-md-12 col-lg-7 col-xl-7 d-flex order-1 order-lg-2 position-fixed"
                      style={{ marginTop: "4rem", marginLeft: "25rem" }}
                    >
                      <img
                        src={window.location.origin + "/contact.jpg"}
                        className="img-fluid rounded mx-auto d-block"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
