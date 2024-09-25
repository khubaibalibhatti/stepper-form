import React, { useEffect, useState } from "react";
import "../components/ViewPage/View.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { showUser, updateUser, setCity, setCountry } from "../formSlice";

export const Addressedit = () => {
  const { id } = useParams();
  const alldata = useSelector((state) => state.form.userdata);
  const dispatch = useDispatch();
  const { countries, cities, selectedCountry, selectedCity } = useSelector(
    (state) => state.form
  );

  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id && alldata) {
      const singleUser = alldata.find((eachData) => eachData.id === id);
      if (singleUser) setUpdateData(singleUser);
    }
  }, [id, alldata]);

  // Effect to sync activeTab with URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab") || "personal"; // Default to "personal"
    setActiveTab(tab);
  }, [location.search]);

  const handleTabChange = (address) => {
    setActiveTab(address);
    navigate(`?tab=${address}`, { replace: true });
  };

  const newData = (e) => {
    setUpdateData({
      ...updateData,
      step3: {
        ...updateData.step3,
        [e.target.name]: e.target.value,
      },
      step2: {
        ...updateData.step2,
        [e.target.name]: e.target.value,
      },
      step1: {
        ...updateData.step1,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setUpdateData((updateData) => ({
      ...updateData,
      step3: {
        ...updateData.step3,
        country: country,
        selectedCity: "", // Reset selected city when country changes
      },
    }));
    dispatch(setCountry(country)); // Update Redux state
    dispatch(setCity([selectedCity])); // Optionally clear cities if not managed in the store
  };

  const handleCityChange = (e) => {
    setUpdateData((updateData) => ({
      ...updateData,
      step3: {
        ...updateData.step3,
        city: e.target.value,
      },
    }));
    dispatch(setCity(e.target.value)); // Update Redux state if needed
  };

  const handleSave1 = (e) => {
    if (updateData) {
      e.preventDefault();

      dispatch(updateUser(updateData));
      navigate(`/view/${id}?tab=address`);

      // Redirect to home after save
    }
  };
  const handleSave2 = (e) => {
    if (updateData) {
      e.preventDefault();

      dispatch(updateUser(updateData));
      navigate(`/view/${id}`);

      // Redirect to home after save
    }
  };
  const handleSave3 = (e) => {
    if (updateData) {
      e.preventDefault();

      dispatch(updateUser(updateData));
      navigate(`/view/${id}?tab=skills`);

      // Redirect to home after save
    }
  };

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);
  // State for managing active tab
  const [activeTab, setActiveTab] = useState("address");

  // Render user data in different tabs
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
                <a
                  href="/home"
                  className="menu-link"
                  style={{ color: "white" }}
                >
                  <FaUser />
                  <div style={{ marginLeft: "15px" }}>Add User</div>
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
            {/* Tab buttons */}
            <div className="tabs text-center mt-5">
              <button
                className={`tab-button ${
                  activeTab === "personal" ? "active" : ""
                }`}
                onClick={() => handleTabChange("personal")}
              >
                Personal Info
              </button>
              <button
                className={`tab-button ${
                  activeTab === "skills" ? "active" : ""
                }`}
                onClick={() => handleTabChange("skills")}
              >
                Skills & Experience
              </button>
              <button
                className={`tab-button ${
                  activeTab === "address" ? "active" : ""
                }`}
                onClick={() => handleTabChange("address")}
              >
                Address
              </button>
            </div>
            <div className="">
              <div className=" ">
                <div className="">
                  {/* Tab content */}
                  <div className=" " style={{ marginLeft: "40px" }}>
                    {activeTab === "personal" && updateData && (
                      <div className="card mb-3 mx-auto">
                        <div
                          className="card-body"
                          style={{ marginLeft: "150px" }}
                        >
                          <form>
                            <div className="form-group row">
                              <label htmlFor="firstname" className="col-sm-4 ">
                                Firstname:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  id="firstname"
                                  name="firstname"
                                  value={updateData?.step1?.firstname || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="lastname" className="col-sm-4 ">
                                Lastname:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  id="lastname"
                                  name="lastname"
                                  value={updateData?.step1?.lastname || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="email" className="col-sm-4 ">
                                Email:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  value={updateData?.step1?.email || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="phone" className="col-sm-4 ">
                                Phone:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  value={updateData?.step1?.phone || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <Link to={`/view/${id}`}>
                            <button
                              type="button"
                              className="btn btn-gray"
                              style={{ borderRadius: "8px", color: "black" }}
                            >
                              Cancel
                            </button>
                          </Link>
                          <button
                            className="btn btn-success"
                            style={{ borderRadius: "8px" }}
                            onClick={handleSave2}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "skills" && updateData && (
                      <div className="card mb-3 mx-auto">
                        <div
                          className="card-body"
                          style={{ marginLeft: "150px" }}
                        >
                          <form>
                            <div className="form-group row">
                              <label htmlFor="Skill" className="col-sm-4 ">
                                Skill:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Skill"
                                  value={updateData?.step2?.Skill || ""}
                                  onChange={newData}
                                >
                                  <option selected>Select Skill</option>
                                  <option value="Programming">
                                    Programming
                                  </option>
                                  <option value="Communication">
                                    Communication
                                  </option>
                                  <option value="Designing">Designing</option>
                                  <option value="not yet Defined">
                                    Not yet Defined
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="Experience" className="col-sm-4 ">
                                Experience:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Experience"
                                  value={updateData?.step2?.Experience || ""}
                                  onChange={newData}
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

                            <div className="form-group row mt-3">
                              <label htmlFor="Worke" className="col-sm-4 ">
                                Work:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Worke"
                                  value={updateData?.step2?.Worke || ""}
                                  onChange={newData}
                                >
                                  <option selected>Select Work</option>
                                  <option value="Marketting">Marketing</option>
                                  <option value="Official Work">
                                    Official Work
                                  </option>
                                  <option value="Work from home">
                                    Work from Home
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="Salary" className="col-sm-4 ">
                                Salary:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  name="Salary"
                                  value={updateData?.step2?.Salary || ""}
                                  onChange={newData}
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
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <Link to={`/view/${id}?tab=skills`}>
                            <button
                              type="button"
                              className="btn btn-gray"
                              style={{ borderRadius: "8px", color: "black" }}
                            >
                              Cancel
                            </button>
                          </Link>
                          <button
                            className="btn btn-success"
                            style={{ borderRadius: "8px" }}
                            onClick={handleSave3}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "address" && updateData && (
                      <div className="card mb-3 mx-auto">
                        <div
                          className="card-body"
                          style={{ marginLeft: "150px" }}
                        >
                          <form>
                            <div className="form-group row">
                              <label htmlFor="country" className="col-sm-4 ">
                                Country:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="country"
                                  value={updateData?.step3?.country || ""}
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

                            <div className="form-group row mt-3">
                              <label htmlFor="city" className="col-sm-4 ">
                                City:
                              </label>
                              <div className="col-sm-6">
                                <select
                                  className="form-select"
                                  name="city"
                                  value={updateData?.step3?.city || ""}
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

                            <div className="form-group row mt-3">
                              <label htmlFor="zip_code" className="col-sm-4 ">
                                Zip Code:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  name="zip_code"
                                  value={updateData?.step3?.zip_code || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>

                            <div className="form-group row mt-3">
                              <label htmlFor="street" className="col-sm-4 ">
                                Street:
                              </label>
                              <div className="col-sm-6">
                                <input
                                  type="text"
                                  name="street"
                                  value={updateData?.step3?.street || ""}
                                  onChange={newData}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                          <Link to={`/view/${id}?tab=address`}>
                            <button
                              type="button"
                              className="btn btn-gray"
                              style={{ borderRadius: "8px", color: "black" }}
                            >
                              Cancel
                            </button>
                          </Link>
                          <button
                            className="btn btn-success"
                            style={{ borderRadius: "8px" }}
                            onClick={handleSave1}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="content-wrapper">
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
