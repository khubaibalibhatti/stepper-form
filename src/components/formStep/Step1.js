import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, setErrors, showUser } from "../../formSlice";
import Progress from "../formProgress/Progress";
import Header from "../header/Header";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import Footer from "../footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";

const Step1 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data.step1);
  const errors = useSelector((state) => state.form.errors);
  const alldata = useSelector((state) => state.form.userdata);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  const validate = () => {
    let errors = {};
     // First Name Validation - only alphabetic characters
  if (!data.firstname) {
    errors.firstname = "First Name is required";
  } else if (!/^[A-Za-z]+$/.test(data.firstname)) {
    errors.firstname = "First Name must only contain alphabets";
  }
  if(!data.lastname){

  }else if (!/^[A-Za-z]+$/.test(data.lastname)) {
    errors.lastname = "Last Name must only contain alphabets";
  }
    // Email Validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.phone) {
      errors.phone = "number is required";
    } else if (!/^\d{11}$/.test(data.phone)) {
      errors.phone = "Phone number must be 11 digits";
    }

    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault(); // prevent form submission before validation
    if (validate()) {
      dispatch(nextStep());
    }
  };

  return (
    <div style={{ paddingTop: "40px" }}>
      <Header />
      <div className="layout-wrapper layout-content-navbar">
        <div
          className={`layout-container ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
        >
          {" "}
          {/* Conditional class for sidebar */}
          <aside
            id="layout-menu"
            className={`layout-menu menu-vertical menu bg-menu-theme ${
              isSidebarOpen ? "" : "d-none"
            }`} // Hide when closed
          >
            <ul className="menu-inner mt-1">
              <li className="menu-item ">
                <a href="" className="menu-link">
                  <FaHome />
                  <div style={{ marginLeft: "15px" }}>Dashboard</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/" className="menu-link" style={{ color: "white" }}>
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
          <section
            class=" gradient-custom "
            style={{ alignItems: "center", marginLeft: "150px" }}
          >
            <div class="container  h-100">
              <div class="row justify-content-center align-items-center h-100">
                <div className="">
                  <Progress />
                  <div
                    className="cards card-registration"
                    style={{
                      marginRight: "400px",
                      borderRadius: "15px",
                      backgroundColor: " #fff",
                      boxShadow: "0 0 10px",
                      width: "650px",
                      height: "409px",
                      background: "lightgray",
                      position: "sticky",
                      marginBottom: "60px",
                    }}
                  >
                    <form
                      style={{
                        color: "black",
                        marginLeft: "70px",
                        height:"300px"
                      }}
                    >
                      <div className="form-group row mt-4">
                        <label htmlFor="firstname" className="col-sm-4 ">
                          Firstname <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter firstName"
                            type="text"
                            id="firstname"
                            value={data.firstname || ""}
                            onChange={handleChange}
                            name="firstname"
                            className="form-control"
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
                        <label htmlFor="lastname" className="col-sm-4 ">
                          Lastname
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter LastName"
                            type="text"
                            id="lastname"
                            value={data.lastname || ""}
                            onChange={handleChange}
                            name="lastname"
                            className="form-control"
                          />
                        </div>
                      </div>
                      {errors.lastname && (
                        <p
                          style={{
                            color: "red",
                            marginLeft: "200px", // Adjust alignment
                            marginTop: "5px",
                          }}
                        >
                          {errors.lastname}
                        </p>
                      )}

                      <div className="form-group row mt-4">
                        <label htmlFor="email" className="col-sm-4 ">
                          Email <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter Email"
                            type="email"
                            id="email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            className="form-control"
                            style={{ borderColor: errors.email ? "red" : "" }}
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
                        <label htmlFor="phone" className="col-sm-4 ">
                          Phone <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter Number"
                            type="tel"
                            id="phone"
                            name="phone"
                            value={data.phone || ""}
                            onChange={handleChange}
                            className="form-control"
                            style={{ borderColor: errors.phone ? "red" : "" }}
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
                        className="btn btn-success"
                        style={{ borderRadius: "8px", marginLeft: "500px",marginBottom:"70px" }}
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
      <Footer />
    </div>
  );
};

export default Step1;
