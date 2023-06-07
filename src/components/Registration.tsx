import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { ChangeEvent, useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Registration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    enabled: true,
    about: "",
  });

  const [error, setError] = useState({ errors: {}, isError: false });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isRegistered, setIsRegistered] = useState(false);
  //   useEffect(() => {
  //     console.log(userData);
  //   }, [userData]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    property: string
  ) => {
    setUserData({ ...userData, [property]: event.target.value });
  };

  const submitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const validationErrors: { [key: string]: string } = {};
    if (userData.name.trim() === "") {
      validationErrors.name = "Name is required";
    } else if (userData.name.length < 3) {
      validationErrors.name = "Name Must be at least 3 charaters long";
    } else if (!/^[a-zA-Z\s]+$/.test(userData.name)) {
      validationErrors.name = "Name can only contain letters and spaces";
    } else {
      validationErrors.name = "";
    }
    if (userData.email.trim() === "") {
      validationErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)
    ) {
      validationErrors.email = "Please insert valid email address";
    }

    if (userData.password.trim() === "") {
      validationErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      validationErrors.password = "Password should have: at least 8 characters";
    } else if (!/[A-Z]/.test(userData.password)) {
      validationErrors.password =
        "Password should have: at least 1 uppercase letter";
    } else if (!/[a-z]/.test(userData.password)) {
      validationErrors.password =
        "Password should have: at least 1 lowercase letter";
    } else if (!/[0-9]/.test(userData.password)) {
      validationErrors.password = "Password should have: at least 1 digit";
    } else if (!/[!@#$%^&*_=+-]/.test(userData.password)) {
      validationErrors.password =
        "Password should have: at least 1 special Character";
    }

    if (userData.about.trim() === "") {
      validationErrors.about = "About field cannot be empty";
    } else if (userData.about.length >= 500) {
      validationErrors.about = "Max 500 characters are allowed";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (error.isError) {
      return;
    }

    // call server API for sending the data
    signUp(userData)
      .then((resp: any) => {
        console.log(resp);
        console.log("success log");
        toast.success("Regiseterd Successfully");
        setTimeout(() => {
          window.location.replace("/");
        }, 3000);
      })
      .catch(async (error: any) => {
        console.log(error);
        if (error.response || error.response.status === 500) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "Email alreday exists") {
            setIsRegistered(true);
            toast.error("user already exists !!");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            window.location.replace("/register");
            // if(errorMessage.includes('Duplicate entry')){
          }
        }
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <>
      <section className="vb-100">
        {/* {JSON.stringify(userData)} */}
        <div>
          <nav
            className="navbar fixed-top"
            style={{ backgroundColor: "#0478c2" }}
          >
            <div className="container justify-content-center ">
              <a
                className="navbar-brand text-center fw-bold"
                href="#"
                style={{ color: "white" }}
              >
                <h1>Smart Contact Manager</h1>
              </a>
            </div>
          </nav>
        </div>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-itmes-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-0" id="card">
                <div className="card-body p-md-3">
                  <div className="row justify-content-right">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      id="signUpForm"
                      style={{ width: "100%" }}
                    >
                      <p
                        className="text-center h1 fw-bold mb-4 mx-1 mx-md-4"
                        style={{ marginTop: "5rem" }}
                      >
                        Sign up
                      </p>

                      {/* {isRegistered && (
                        <p className="text-center" style={{ color: "red" }}>
                          User Already Exists.
                        </p>
                     )}*/}

                      <form className="mx-1 mx-md-4" onSubmit={submitForm}>
                        <div className="d-flex flex-row align-itmes-center mb-4">
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
                              placeholder="Your Name"
                              onChange={(e) => handleChange(e, "name")}
                              value={userData.name}
                              style={{ width: "300px", marginLeft: "7px" }}
                            />
                            {errors.name && (
                              <span className="error-message">
                                {errors.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-4">
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
                              placeholder="Your Email"
                              onChange={(e) => handleChange(e, "email")}
                              value={userData.email}
                              style={{ width: "300px", marginLeft: "7px" }}
                            />
                            {errors.email && (
                              <span className="error-message">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-4">
                          <label>
                            <i
                              className="fa fa-user fa-lg me-3 fa-fw"
                              title="Password"
                            ></i>
                          </label>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Your Password"
                              //pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"

                              onChange={(e) => handleChange(e, "password")}
                              value={userData.password}
                              style={{ width: "300px", marginLeft: "7px" }}
                            />
                            {errors.password && (
                              <span className="error-message">
                                {errors.password}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="d-flex flex-row align-itmes-center mb-4">
                          <i className="fa fa-image fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              accept=".png,.jpg,.jpeg,"
                              onChange={(e) => handleChange(e, "imageUrl")}
                              value={userData.imageUrl}
                            />
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
                              id="about"
                              name="about"
                              placeholder="Max 500 characters allowed."
                              rows={4}
                              cols={35}
                              maxLength={500}
                              style={{
                                minWidth: "fit-content",
                                minHeight: "fit-content",
                                marginRight: "20px",
                                width: "300px",
                                marginLeft: "7px",
                              }}
                              onChange={(e) => handleChange(e, "about")}
                              value={userData.about}
                            />
                            <br />
                            {errors.about && (
                              <span className="error-message">
                                {errors.about}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2 text-center"
                            type="checkbox"
                            value=""
                            id="checkbox"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkbox"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-3 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <div className="d-flex justify-content-center mx-3 mb-3 mb-lg-4">
                          <p className="medium mt-2 pt-1 mb-0">
                            Do you have an account?{" "}
                            <a href="/" className="link-danger h5">
                              Login
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div
                      className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-left order-1 order-lg-2 position-fixed"
                      style={{ marginTop: "7rem", marginLeft: "25rem" }}
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                    {/* <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <p>
                        Already an have Account Log in <a href="/login">here</a>
                      </p>
                    </div> */}
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

export default Registration;
