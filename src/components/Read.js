import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser, deleteUser } from "../formSlice";
import { Link } from "react-router-dom";
import Header from "./header/Header";
import { CSSTransition } from "react-transition-group";
import Footer from "./footer/Footer.js";
import { FaHome, FaTrash, FaUser, FaUsers } from "react-icons/fa";
import "../components/ViewPage/View.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { BsLayoutSidebar } from "react-icons/bs"; // Add import for menu icon

export default function Read() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { userdata } = useSelector((state) => state.form);
  const alldata = useSelector((state) => state.form.userdata);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  // Filter records based on search input
  const filteredRecords =
    userdata?.filter((eachData) => {
      const lowerCaseSearch = search.toLowerCase();
      return (
        eachData.step1.firstname.toLowerCase().includes(lowerCaseSearch) ||
        eachData.step1.lastname.toLowerCase().includes(lowerCaseSearch) ||
        eachData.step1.email.toLowerCase().includes(lowerCaseSearch) ||
        eachData.step1.phone.toLowerCase().includes(lowerCaseSearch) ||
        eachData.step3.country.toLowerCase().includes(lowerCaseSearch)
      );
    }) || [];

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = userdata?.slice(firstIndex, lastIndex) || [];
  const totalPages = userdata?.length
    ? Math.ceil(userdata.length / recordsPerPage)
    : 1;

  const numbers = [...Array(totalPages).keys()].map((n) => n + 1);

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  // Sorting state and logic
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (column) => {
    let direction = "ascending";
    if (sortConfig.key === column && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: column, direction });
  };

  const sortedRecords = [...currentRecords].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a.step1[sortConfig.key]?.toLowerCase();
      const bValue = b.step1[sortConfig.key]?.toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle select/unselect users
  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle delete with confirmation modal
  const handleDeleteClick = (userId = null) => {
    if (userId) {
      setDeleteId(userId);
      setShowModal(true); // Show the modal for single user deletion
    } else {
      setShowModal(true); // Show the modal for multiple user deletion
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteUser(deleteId));
      setAlertMessage("User deleted successfully!");
      setShowAlert(true); // Show the alert message
      setDeleteId(null);
    } else if (selectedUsers.length > 0) {
      selectedUsers.forEach((userId) => dispatch(deleteUser(userId)));
      setAlertMessage("Selected users deleted successfully!");
      setShowAlert(true); // Show the alert message
      setSelectedUsers([]);
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false); // Hide the modal
    // setSelectedUsers([]); // Clear selected users when canceling
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts or alert is dismissed
    }
  }, [showAlert]);

  return (
    <div style={{ paddingTop: "40px" }}>
      <Header />
      {/* Alert Section */}
      <div className="alert-container">
        <CSSTransition
          in={showAlert}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            {alertMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
        </CSSTransition>
      </div>

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
              <a href="/form" className="menu-link" style={{ color: "white" }}>
                <FaUser />
                <div style={{ marginLeft: "15px" }}>Add User</div>
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
          </ul>
        </aside>
        <div className="main-content">
          {/* <a style={{marginTop:"60px",marginLeft:"170px",color:"black"}}
              className="sidebar-toggle-btn" // Add a class for styling the button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
            >
              <BsLayoutSidebar  />
            </a> */}

          {/* The rest of your content */}
          <div
            className="navbar-nav-right align-items-center mt-4"
            style={{ width: "380px" }}
          >
            <div
              className="row d-flex align-items-center"
              style={{ marginLeft: "20px", marginTop: "50px" }}
            >
              <div className="col-8">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-3">
                <Link to="/form">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ width: "100px", marginLeft: "558px" }}
                  >
                    Add User
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Display "No result found" message outside table */}
          {filteredRecords.length === 0 && (
            <div className="mt-3 text-center">
              <p>Not result found</p>
            </div>
          )}

          <div className=" mt-3">
            <table
              className="table mt-3 border "
              style={{ width: "71%", marginRight: "400px", marginLeft: "30px" }}
            >
              <thead>
                <tr
                  style={{
                    color: "black",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(
                            sortedRecords.map((record) => record.id)
                          );
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={selectedUsers.length === sortedRecords.length}
                    />
                  </td>
                  <td>#</td>
                  <td
                    onClick={() => handleSort("firstname")}
                    style={{ cursor: "pointer" }}
                  >
                    FIRSTNAME
                    {sortConfig.key === "firstname" && (
                      <span>{sortConfig.direction === "ascending"}</span>
                    )}
                  </td>
                  <td
                    onClick={() => handleSort("lastname")}
                    style={{ cursor: "pointer" }}
                  >
                    LASTNAME
                    {sortConfig.key === "lastname" && (
                      <span>{sortConfig.direction === "ascending"}</span>
                    )}
                  </td>
                  <td
                    onClick={() => handleSort("email")}
                    style={{ cursor: "pointer" }}
                  >
                    EMAIL
                    {sortConfig.key === "email" && (
                      <span>{sortConfig.direction === "ascending"}</span>
                    )}
                  </td>
                  <td>PHONE</td>
                  <td>COUNTRY</td>
                  <td>ACTION</td>
                </tr>
              </thead>

              {sortedRecords.length > 0 ? (
                sortedRecords
                  .filter((eachData) => {
                    return search.toLowerCase() === ""
                      ? eachData
                      : eachData.step1.firstname
                          .toLowerCase()
                          .includes(search) ||
                          eachData.step1.lastname
                            .toLowerCase()
                            .includes(search) ||
                          eachData.step1.email.toLowerCase().includes(search) ||
                          eachData.step1.phone.toLowerCase().includes(search) ||
                          eachData.step3.country.toLowerCase().includes(search);
                  })
                  .map((eachData) => (
                    <tbody
                      className={`textb ${
                        selectedUsers.includes(eachData.id)
                          ? "selected-row"
                          : ""
                      }`}
                      style={{
                        color: "black",
                      }}
                      key={eachData.id}
                    >
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(eachData.id)}
                            onChange={() => handleSelectUser(eachData.id)}
                          />
                        </td>
                        <td>
                          <Link
                            to={`/view/${eachData.id}`}
                            style={{ color: "black" }}
                          >
                            {eachData.id}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/view/${eachData.id}`}
                            style={{ color: "black" }}
                          >
                            {eachData.step1.firstname}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/view/${eachData.id}`}
                            style={{ color: "black" }}
                          >
                            {eachData.step1.lastname}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/view/${eachData.id}`}
                            style={{ color: "black" }}
                          >
                            {eachData.step1.email}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/view/${eachData.id}`}
                            style={{ color: "black" }}
                          >
                            {eachData.step1.phone}
                          </Link>
                        </td>
                        <td>{eachData.step3.country}</td>
                        <td>
                          <div className="dropdown">
                            <Link
                              to="#"
                              onClick={() => handleDeleteClick(eachData.id)}
                              style={{ color: "#778899" }}
                            >
                              <FaTrash />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      Data Not found.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            {/* Pagination */}
            <nav style={{ marginLeft: "30px" }}>
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <a href="#" className="page-link" onClick={prevPage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n) => (
                  <li
                    key={n}
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <a href="#" className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* Conditionally render the Delete Selected button */}
          <div
            className={`delete-button ${
              selectedUsers.length > 0 ? "show" : ""
            }`}
          >
            {selectedUsers.length > 0 && (
              <Button
                variant="danger"
                style={{
                  width: "150px",
                }}
                onClick={() => handleDeleteClick()}
              >
                Delete Selected
              </Button>
            )}
          </div>
          {/* Modal for delete confirmation */}
          <Modal
            show={showModal}
            onHide={cancelDelete}
            style={{ marginTop: "100px", width: "40%", marginLeft: "450px" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete the following users?</p>
              <ul>
                {deleteId ? (
                  // Single user deletion
                  <li>
                    {
                      userdata.find((user) => user.id === deleteId)?.step1
                        .firstname
                    }{" "}
                    {
                      userdata.find((user) => user.id === deleteId)?.step1
                        .lastname
                    }
                  </li>
                ) : (
                  // Multiple users deletion
                  selectedUsers.map((userId) => {
                    const user = userdata.find((u) => u.id === userId);
                    return (
                      <li key={userId}>
                        {user?.step1.firstname} {user?.step1.lastname}
                      </li>
                    );
                  })
                )}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
