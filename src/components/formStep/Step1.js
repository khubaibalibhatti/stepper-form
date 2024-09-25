import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, setErrors, showUser } from "../../formSlice";
import Progress from "../formProgress/Progress";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Footer from "../footer/Footer";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import Header from "../header/Header";
const Step1 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data.step1);
  const errors = useSelector((state) => state.form.errors);
  const alldata = useSelector((state) => state.form.userdata);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const validate = () => {
    let errors = {};
    if (!data.firstname) errors.firstname = "First Name is Required:";
    if (!data.email) errors.email = "Email is Required:";

    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    //progress validation
    //field validation
    if (validate()) {
      dispatch(nextStep());
    }
  };
  return (
    <div style={{ paddingTop: "50px" }}>
      <Header />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
          >
            {/* Sidebar and Navigation */}

            <ul className="menu-inner py-1">
              <li className="menu-item ">
                <a className="menu-link">
                  <FaHome />
                  <div style={{ marginLeft: "15px" }}>Dashboard</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="" className="menu-link" style={{ color: "white" }}>
                  <FaUsers />
                  <div style={{ marginLeft: "15px" }}>
                    Total Users ({alldata && alldata.length})
                  </div>
                </a>
              </li>
              <li className="menu-item">
                <a href="/" className="menu-link" style={{ color: "white" }}>
                  <FaCircleArrowLeft />
                  <div style={{ marginLeft: "15px" }}>Back Grid</div>
                </a>
              </li>
            </ul>
          </aside>
          <div className="">
            <section
              className=" gradient-custom "
              style={{ alignItems: "center", marginLeft: "150px" }}
            >
              <div className="  h-100">
                <div className="row justify-content-center align-items-center h-100">
                  <div className="">
                    <Progress />

                    <div
                      className="card  card-registration"
                      style={{
                        marginRight: "600px",
                        borderRadius: "15px",
                        backgroundColor: " lightgray",
                        width: "640px",
                        marginTop: "10px",
                        height:"410px",
                        marginLeft: "50px",
                        position: "sticky",
                      }}
                    >
                      <form style={{ marginLeft: "55px" }}>
                        <div className="form-group row">
                          <label htmlFor="firstname" className="col-sm-3">
                            Firstname
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="firstname"
                              name="firstname"
                              value={data.firstname || ""}
                              onChange={handleChange}
                              className="form-control "
                              style={{
                                borderColor: errors.firstname ? "red" : "",
                              }}
                            />
                          </div>
                        </div>
                        {errors.firstname && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "200px", // Adjust alignment
                              marginTop: "5px",
                            }}
                          >
                            {errors.firstname}
                          </p>
                        )}

                        <div className="form-group row mt-4">
                          <label htmlFor="lastname" className="col-sm-3 ">
                            LastName
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="lastname"
                              name="lastname"
                              value={data.lastname || ""}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label htmlFor="email" className="col-sm-3 ">
                            Email
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={data.email || ""}
                              onChange={handleChange}
                              className="form-control"
                              style={{
                                borderColor: errors.email ? "red" : "",
                              }}
                            />
                          </div>
                        </div>
                        {errors.email && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "200px", // Adjust alignment
                              marginTop: "5px",
                            }}
                          >
                            {errors.email}
                          </p>
                        )}

                        <div className="form-group row mt-4">
                          <label htmlFor="phone" className="col-sm-3 ">
                            Phone
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={data.phone || ""}
                              onChange={handleChange}
                              className="form-control"
                              style={{
                                borderColor: errors.email ? "red" : "",
                              }}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p
                            style={{
                              color: "red",
                              marginLeft: "200px", // Adjust alignment
                              marginTop: "5px",
                            }}
                          >
                            {errors.phone}
                          </p>
                        )}
                      </form>

                      <button
                        className="btn btn-success mt-4 "
                        style={{ borderRadius: "8px", marginLeft: "400px" }}
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step1;
