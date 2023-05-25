import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

const AddContact = () => {
  const handleBack = () => {
    window.location.replace("/user/home");
  };
  return (
    <>
      <section className="vb-100">
        <div
          className="container h-100"
          id="root"
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <div className="row d-flex justify-content-center align-itmes-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black border-0" id="card">
                <div className="card-body p-md-3">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                        Contact Details
                      </p>
                      <form className="mx-1 mx-md-4" action="">
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Contact name"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="secondName"
                              className="form-control"
                              placeholder="Nick name"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-briefcase fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="work"
                              className="form-control"
                              placeholder="Work"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-phone fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="phone"
                              className="form-control"
                              placeholder="Contact Number"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="email"
                              className="form-control"
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-image fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="file"
                              id="image"
                              className="form-control"
                              accept=".png,.jpg,.jpeg,"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-itmes-center mb-3">
                          <i className="fa fa-info-circle fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <textarea
                              id="description"
                              name="Description"
                              // rows={4}
                              cols={40}
                              style={{
                                minWidth: "fit-content",
                                minHeight: "fit-content",
                              }}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                          >
                            Add Contact
                          </button>
                          <div className="mx-3">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={handleBack}
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-12 col-lg-7 col-xl-7 d-flex align-items-center order-1 order-lg-2">
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
