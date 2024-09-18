import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";

export const Allusers = () => {
  // Fetch the user data from Redux state
  const alldata = useSelector((state) => state.form.userdata);
  console.log(alldata);

  return (
    <div style={{ paddingTop: "80px" }}>
      <Header />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
          >
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner ">
              <li className="menu-item active">
                <a href="" className="menu-link">
                  <i className="menu-icon tf-icons bx bx-home-circle"></i>
                  <div>Dashboard</div>
                </a>
              </li>
              <li className="menu-item">
                <a
                  href="/read"
                  className="menu-link"
                  style={{ color: "black" }}
                >
                  <i
                    className="menu-icon bx bx-user"
                    style={{ color: "black" }}
                  ></i>
                  <div>Add User</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="/" className="menu-link" style={{ color: "black" }}>
                  <FaCircleArrowLeft />
                  <div style={{ marginLeft: "15px" }}>Back Grid</div>
                </a>
              </li>
            </ul>
          </aside>
          <div className="layout-page">
            <div
              className="card mb-3 mx-auto "
              style={{ maxWidth: "600px", marginTop: "30px" }}
            >
              <div className="card-body ">
                <h2
                  style={{
                    color: "black",
                    marginLeft: "0px",
                    marginTop: "0px",
                  }}
                >
                  Total Users
                </h2>

                <div className="mx-auto">
                  <h1 style={{ color: "black" }}>
                    <FaUsers />
                    {/* Show the total number of users */}
                    <span style={{ marginLeft: "20px" }}>
                      ({alldata ? alldata.length : 0})
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
