import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData,
  nextStep,
  prevStep,
  setErrors,
  showUser,
} from "../../formSlice";
import Progress from "../formProgress/Progress";
import Footer from "../footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaHome, FaUsers } from "react-icons/fa";
import Header from "../header/Header";

const Step2 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data.step2);
  const errors = useSelector((state) => state.form.errors);
  const alldata = useSelector((state) => state.form.userdata);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  const validate = () => {
    let errors = {};
    if (!data.Skill) errors.Skill = "Skill field is Requierd:";

    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (validate()) {
      dispatch(nextStep());
    }
  };

  const handlePrev = () => {
    dispatch(prevStep());
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
                    <form style={{ marginLeft: "70px" }}>
                      <div className="form-group row  mt-4">
                        <label htmlFor="Skill" className="col-sm-4 ">
                          Skill <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="Skill"
                            style={{ borderColor: errors.Skill ? "red" : "" }}
                            value={data.Skill || ""}
                            onChange={handleChange}
                          >
                            <option selected>Select Skill</option>
                            <option value="Programming">Programming</option>
                            <option value="Communication">Communication</option>
                            <option value="Designing">Designing</option>
                            <option value="not yet Defined">
                              Not yet Defined
                            </option>
                          </select>
                        </div>
                      </div>
                      {errors.Skill && (
                        <p
                          className=""
                          style={{
                            color: "red",
                            marginLeft: "190px",
                            marginTop: "3px",
                          }}
                        >
                          {" "}
                          {errors.Skill}{" "}
                        </p>
                      )}

                      <div className="form-group row mt-4">
                        <label htmlFor="Experience" className="col-sm-4 ">
                          Experience
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="Experience"
                            value={data.Experience || ""}
                            onChange={handleChange}
                          >
                            <option selected>Select Experience</option>
                            <option value="Less than 1 Year">
                              Less than 1 Year
                            </option>
                            <option value="More than 1 Year">
                              More than 1 Year
                            </option>
                            <option value="1 Year">1 Year</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row mt-4">
                        <label htmlFor="Worke" className="col-sm-4 ">
                          Work
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="Worke"
                            value={data.Worke || ""}
                            onChange={handleChange}
                          >
                            <option selected>Select Work</option>
                            <option value="Marketting">Marketing</option>
                            <option value="Official Work">Official Work</option>
                            <option value="Work from home">
                              Work from Home
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group row mt-4">
                        <label htmlFor="Salary" className="col-sm-4 ">
                          Salary
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="Salary"
                            value={data.Salary || ""}
                            onChange={handleChange}
                          >
                            <option selected>Select Salary</option>
                            <option value="25000">25000</option>
                            <option value="30000">30000</option>
                            <option value="35000">35000</option>
                            <option value="45000">45000</option>
                            <option value="60000">60000</option>
                          </select>
                        </div>
                      </div>
                    </form>

                    <div className="d-flex justify-content-between " style={{marginTop:"60px"}}>
                      <button
                        type="button"
                        className="btn btn-light"
                        style={{ borderRadius: "8px", color: "black" }}
                        onClick={handlePrev}
                      >
                        Previous
                      </button>

                      <button
                        className="btn btn-success"
                        style={{ borderRadius: "8px",marginRight:"20px" }}
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
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

export default Step2;
