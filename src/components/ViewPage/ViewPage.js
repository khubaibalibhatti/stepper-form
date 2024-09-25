import React, { useState, useEffect } from "react";
import "../ViewPage/View.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaEdit, FaHome, FaUser, FaUsers } from "react-icons/fa";
import { showUser } from "../../formSlice";

export const ViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.form);
  const alldata = useSelector((state) => state.form.userdata);
  const location = useLocation(); // for getting query parameters
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  // Check if there's a 'tab' query parameter in the URL and set it as activeTab
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "personal";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filter to get the specific user's data
  const singleUser =
    alldata && alldata.filter((eachData) => eachData.id === id);

  // Function to handle tab change and navigate to the same page with a tab parameter
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/view/${id}?tab=${tab}`);
    // Add query parameter to the URL
  };

  // Render user data in different tabs
  return (
    <div style={{ paddingTop: "50px" }}>
      <Header />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
            style={{ backgroundColor: "gray" }}
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
                  <table>
                    {/* Tab content */}
                    <div className=" " style={{ marginLeft: "40px" }}>
                      {activeTab === "personal" && singleUser && (
                        <div className="card mb-3 mx-auto">
                          <div className="card-body w-50">
                            <table>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{
                                      color: "black",
                                    }}
                                  >
                                    Firstname:
                                  </h5>
                                </td>

                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step1.firstname}
                                  </h5>
                                </td>
                                <td style={{ fontSize: "20px" }}>
                                  <Link
                                    to={`/edit/${id}?tab=personal`}
                                    style={{
                                      color: "#778899",
                                      marginLeft: "250px",
                                    }}
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Lastname:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step1.lastname}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Email:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step1.email}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Phone:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step1.phone}
                                  </h5>
                                </td>
                               
                              </tr>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTab === "skills" && singleUser && (
                        <div className="card mb-3 mx-auto">
                          <div className="card-body">
                            <table>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Skill:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step2.Skill}
                                  </h5>
                                </td>
                                <td>
                                  <Link
                                    to={`/skills/${id}?tab=skills`}
                                    style={{
                                      fontSize: "20px",
                                      color: "#778899",
                                      marginLeft: "320px",
                                    }}
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Experience:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step2.Experience}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Work:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step2.Worke}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Salary:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step2.Salary}
                                  </h5>
                                </td>
                                
                              </tr>
                            </table>
                          </div>
                        </div>
                      )}

                      {activeTab === "address" && singleUser && (
                        <div
                          className="card mb-3 mx-auto"
                          style={{ maxWidth: "900px", position: "fiexd" }}
                        >
                          <div className="card-body">
                            <table>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Country:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step3.country}
                                  </h5>
                                </td>
                                <td>
                                  <Link
                                    to={`/address/${id}?tab=address`}
                                    style={{
                                      fontSize: "20px",
                                      color: "#778899",
                                      marginLeft: "388px",
                                    }}
                                  >
                                    <FaEdit />
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    City:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step3.city}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Zip_Code:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step3.zip_code}
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h5
                                    className="card-title"
                                    style={{ color: "black" }}
                                  >
                                    Street:
                                  </h5>
                                </td>
                                <td>
                                  <h5
                                    style={{
                                      marginLeft: "80px",
                                    }}
                                  >
                                    {singleUser[0].step3.street}
                                  </h5>
                                </td>
                               
                              </tr>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </table>
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
