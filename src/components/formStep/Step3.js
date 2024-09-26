import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, prevStep, showUser } from "../../formSlice";
import { submitForm, setCity, setCountry, setErrors } from "../../formSlice";
import { useNavigate } from "react-router-dom";
import Progress from "../formProgress/Progress";
import Footer from "../footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaHome, FaUsers } from "react-icons/fa";
import Header from "../header/Header";

const Step3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.form.data.step3);
  const userdata = useSelector((state) => state.form.data);
  const status = useSelector((state) => state.form.status);
  const errors = useSelector((state) => state.form.errors);
  const { countries, cities, selectedCountry } = useSelector(
    (state) => state.form
  );
  const alldata = useSelector((state) => state.form.userdata);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  // form validation start
  const validate = () => {
    let errors = {};
  
    // Check if the selected skill is not the placeholder or "Not yet Defined"
    if (!data.country || data.Skill === "Select Skill" || data.country === "Not yet Defined") {
      errors.country = "Please select  country ";
    }
  
    dispatch(setErrors(errors));
    return Object.keys(errors).length === 0;
  };
  // end validation //

  const handleChange = (e) => {
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };

  // country && city dependence start //
  const handleCityChange = (e) => {
    dispatch(setCity(e.target.value));
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };
  const handleCountryChange = (e) => {
    dispatch(setCountry(e.target.value));
    dispatch(updateFormData({ ...data, [e.target.name]: e.target.value }));
  };
  // end dependence //

  const handlePrev = () => {
    dispatch(prevStep());
  };

  const handleSubmit = (e) => {
    if (validate()) {
      e.preventDefault();
      dispatch(submitForm(userdata));
      navigate("/");
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
            className="gradient-custom"
            style={{ alignItems: "center", marginLeft: "150px" }}
          >
            <div className="container  h-100">
              <div className="row justify-content-center align-items-center h-100">
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
                      position: "sticky",
                      background: "lightgray",
                      marginBottom: "60px",
                    }}
                  >
                    <form style={{ marginLeft: "70px" }}>
                      <div className="form-group row mt-4">
                        <label htmlFor="country" className="col-sm-4 ">
                          Country <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            name="country"
                            style={{ borderColor: errors.country ? "red" : "" }}
                            value={data.country || ""}
                            onChange={handleCountryChange}
                          >
                            <option value="">Select country</option>
                            {countries.map((country) => (
                              <option value={country} key={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errors.country && (
                        <p
                          className=""
                          style={{ color: "red", marginLeft: "185px" }}
                        >
                          {" "}
                          {errors.country}{" "}
                        </p>
                      )}

                      <div className="form-group row mt-4">
                        <label htmlFor="city" className="col-sm-4 ">
                          City
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-select"
                            name="city"
                            value={data.city || ""}
                            onChange={handleCityChange}
                            disabled={!selectedCountry}
                          >
                            <option>Select a city</option>
                            {selectedCountry &&
                              cities[selectedCountry].map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group row mt-4">
                        <label htmlFor="zip_code" className="col-sm-4 ">
                          Zip Code
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter your Code"
                            type="text"
                            name="zip_code"
                            value={data.zip_code || ""}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group row mt-4">
                        <label htmlFor="street" className="col-sm-4 ">
                          Street
                        </label>
                        <div className="col-sm-6">
                          <input
                            placeholder="Enter your Street Address"
                            type="text"
                            name="street"
                            value={data.street || ""}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </form>
                    <div
                      className="d-flex justify-content-between "
                      style={{ marginTop: "60px" }}
                    >
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
                        style={{ borderRadius: "8px", marginRight: "20px" }}
                        onClick={handleSubmit}
                      >
                        Submit
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

export default Step3;
