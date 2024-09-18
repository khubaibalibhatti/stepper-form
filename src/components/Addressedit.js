import React, { useEffect, useState } from "react";
import "../components/viewuser/View.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { showUser, updateUser,setCity, setCountry } from "../formSlice";

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
        selectedCity: '', // Reset selected city when country changes
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
        city: e.target.value
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
    <div style={{ paddingTop: "80px" }}>
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
              <FaHome/>
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
          <div className="layout-page">
            <div className="container">
              <div className="container ">
                <div className="layout-page2">
                  {/* Tab content */}
                  <div className="tab-content ">
                    {/* Tab buttons */}
                    <div className="tab text-center mt-5">
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
                    {activeTab === "address" && updateData && (
                      <div
                        className="cards mb-3 mx-auto"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="card-body">
                          <table>
                            <tr>
                              <td>
                                <h6
                                  className="card-title"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Country:
                                </h6>
                              </td>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="country"
                                  value={updateData?.step3?.country || ""}
                                  style={{
                                    marginLeft: "40px",
                                    marginRight: "40px",
                                  }}
                                  onChange={handleCountryChange}
                                >
                                  <option value=""> select country</option>
                                  {countries.map((country) => (
                                    <option value={country} key={country}>
                                      {country}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  City:
                                </h6>
                              </td>
                              <td>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="city"
                                  value={updateData?.step3?.city || " "}
                                  onChange={handleCityChange}
                                  style={{
                                    marginLeft: "40px",
                                    marginRight: "50px",
                                  }}
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
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Zip_Code:
                                </h6>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="zip_code"
                                  value={updateData?.step3?.zip_code || ""}
                                  onChange={newData}
                                  className="form-control mt-4"
                                  style={{ marginLeft: "40px" }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Street:
                                </h6>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="street"
                                  value={updateData?.step3?.street || ""}
                                  onChange={newData}
                                  className="form-control mt-4"
                                  style={{ marginLeft: "40px" }}
                                />
                              </td>
                            </tr>
                          </table>
                          <div class="w3-bar">
                            <Link to={`/view/${id}?tab=address`}>
                              <button
                                class="w3-button w3-left w3-light-grey  mt-3 mb-3"
                                style={{
                                  marginLeft: "10px",
                                  borderRadius: "8px",
                                }}
                              >
                                Back
                              </button>
                            </Link>

                            <button
                              className="w3-button w3-right w3-green  mt-3 mb-3"
                              style={{
                                marginRight: "10px",
                                borderRadius: "8px",
                              }}
                              onClick={handleSave1}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === "personal" && updateData && (
                      <div
                        className="cards  mx-auto"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="card-body">
                          <form>
                            <div
                              className="form-group col-md-8"
                              style={{ marginLeft: "90px" }}
                            >
                              <label htmlFor="firstname">Firstname:</label>
                              <input
                                type="text"
                                id="firstname"
                                style={{ marginLeft: "50px" }}
                                name="firstname"
                                value={updateData?.step1?.firstname || ""}
                                onChange={newData}
                                className="form-control "
                              />
                            </div>
                            <div
                              className="form-group mt-4 col-md-8"
                              style={{ marginLeft: "90px" }}
                            >
                              <label htmlFor="lastname">Lastname:</label>
                              <input
                                type="text"
                                id="lastname"
                                style={{ marginLeft: "50px" }}
                                name="lastname"
                                value={updateData?.step1?.lastname || ""}
                                onChange={newData}
                                className="form-control"
                              />
                            </div>
                            <div
                              className="form-group mt-4 col-md-8"
                              style={{ marginLeft: "90px" }}
                            >
                              <label htmlFor="email">Email:</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                style={{ marginLeft: "50px" }}
                                value={updateData?.step1?.email || ""}
                                onChange={newData}
                                className="form-control"
                              />
                            </div>
                            <div
                              className="form-group mt-4 col-md-8"
                              style={{ marginLeft: "90px" }}
                            >
                              <label htmlFor="phone">Phone:</label>
                              <input
                                type="tel"
                                id="phone"
                                style={{ marginLeft: "50px" }}
                                name="phone"
                                value={updateData?.step1?.phone || ""}
                                onChange={newData}
                                className="form-control"
                              />
                            </div>
                            <div className="w3-bar mt-4">
                              <Link to={`/view/${id}`}>
                                <button
                                  type="button"
                                  className="w3-button w3-left w3-light-grey mt-3 mb-3"
                                  style={{
                                    marginLeft: "10px",
                                    borderRadius: "8px",
                                  }}
                                >
                                  Back
                                </button>
                              </Link>
                              <button
                                className="w3-button w3-right w3-green  mt-3 mb-3"
                                style={{
                                  marginRight: "10px",
                                  borderRadius: "8px",
                                }}
                                onClick={handleSave2}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                    {activeTab === "skills" && updateData && (
                      <div
                        className="cards mb-3 mx-auto"
                        style={{ maxWidth: "600px" }}
                      >
                        <div className="card-body">
                          <table>
                            <tr style={{ marginLeft: "50px" }}>
                              <td>
                                <h6
                                  className="card-title"
                                  style={{
                                    color: "black",
                                    marginLeft: "80px",
                                    fontFamily: "Roboto Slab serif",
                                  }}
                                >
                                  Skill:
                                </h6>
                              </td>
                              <td>
                                <td>
                                  <select
                                    class="form-select "
                                    aria-label="Default select example"
                                    style={{
                                      marginLeft: "70px",
                                      marginRight: "70px",
                                    }}
                                    name="Skill"
                                    value={updateData?.step2?.Skill || ""}
                                    onChange={newData}
                                  >
                                    <option selected> select Skill</option>
                                    <option value="Programming">
                                      Programming
                                    </option>
                                    <option value="Communiction">
                                      Communiction
                                    </option>
                                    <option value="Designing">Designing</option>
                                    <option value="not yet Defined">
                                      not yet Defined
                                    </option>
                                  </select>
                                </td>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Experience:
                                </h6>
                              </td>
                              <td>
                                <select
                                  class="form-select "
                                  aria-label="Default select example"
                                  style={{
                                    marginLeft: "70px",
                                    marginRight: "50px",
                                  }}
                                  name="Experience"
                                  value={updateData?.step2?.Experience || ""}
                                  onChange={newData}
                                >
                                  <option selected> select experience</option>
                                  <option value="Less than 1 Year">
                                    Less than 1 Year
                                  </option>
                                  <option value="More than 1 Year">
                                    More than 1 Year
                                  </option>
                                  <option value="1 Year">1 Year</option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Work:
                                </h6>
                              </td>
                              <td>
                                <select
                                  class="form-select "
                                  aria-label="Default select example"
                                  style={{
                                    marginLeft: "70px",
                                    marginRight: "50px",
                                  }}
                                  name="Worke"
                                  value={updateData?.step2?.Worke || ""}
                                  onChange={newData}
                                >
                                  <option selected> select Work</option>
                                  <option value="Marketting">Marketting</option>
                                  <option value="Official Work">
                                    Official Work
                                  </option>
                                  <option value="Work from home">
                                    Work from home
                                  </option>
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6
                                  className="card-title mt-4"
                                  style={{ color: "black", marginLeft: "80px" }}
                                >
                                  Salary:
                                </h6>
                              </td>
                              <td>
                                <select
                                  class="form-select "
                                  aria-label="Default select example"
                                  style={{
                                    marginLeft: "70px",
                                    marginRight: "50px",
                                  }}
                                  name="Salary"
                                  value={updateData?.step2?.Salary || ""}
                                  onChange={newData}
                                >
                                  <option selected> select Salary</option>
                                  <option value="25000">25000</option>
                                  <option value="30000">30000</option>
                                  <option value="35000">35000</option>
                                  <option value="45000">45000</option>
                                  <option value="60000">60000</option>
                                </select>
                              </td>
                            </tr>
                          </table>
                          <div class="w3-bar">
                            <Link to={`/view/${id}?tab=skills`}>
                              <button
                                class="w3-button w3-left w3-light-grey  mt-3 mb-3"
                                style={{
                                  marginLeft: "10px",
                                  borderRadius: "8px",
                                }}
                              >
                                Back
                              </button>
                            </Link>

                            <button
                              className="w3-button w3-right w3-green  mt-3 mb-3"
                              style={{
                                marginRight: "10px",
                                borderRadius: "8px",
                              }}
                              onClick={handleSave3}
                            >
                              Save
                            </button>
                          </div>
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
