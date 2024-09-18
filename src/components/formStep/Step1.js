import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, setErrors } from "../../formSlice";
import Progress from "../formProgress/Progress";
const Step1 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data.step1);
  const errors = useSelector((state) => state.form.errors);
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
    <>
      <section
        className=" gradient-custom "
        style={{ alignItems: "center" }}
      >
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-8 col-lg-9 col-xl-7">
            <Progress/>
              <div
                className="card shadow-2-strong card-registration"
                style={{
                  marginRight:"50px",
                  borderRadius: "15px",
                  backgroundColor: " #00246B",
                  width: "600px",
                  marginTop: "10px",
                  marginLeft: "50px",
                  position: "sticky",

                }}
              >
                
                <form className="form-width  " />
                <div className="row">
                  <div className="bold lable lable3 color  " style={{ marginLeft: "80px" }}>
                    <table className="form-outline">
                      <tr>
                        <td className="" htmlfor="Name">
                          F-Name:
                        </td>
                       
                        <input
                          type="text"
                          id="name"
                          name="firstname"
                          value={data.firstname || ""}
                          onChange={handleChange}
                          className="form-control  "
                          style={{ marginLeft: "60px",marginRight:"9px" }}
                          autoFocus
                          required
                          placeholder="Enter  first name"
                        />
                         {errors.firstname && (
                          <p
                            style={{ color: "red", marginLeft: "100px" }}
                          >
                            {errors.firstname}{" "}
                          </p>
                        )}
                      </tr>
                    </table>
                    <table
                      className="form-outline"
                      style={{ marginTop: "30px" }}
                    >
                      <tr>
                        <td className="" htmlfor="Name">
                          L-Name:
                        </td>
                        <input
                          type="text"
                          id="name"
                          name="lastname"
                          value={data.lastname || ""}
                          onChange={handleChange}
                          className="form-control  "
                          style={{ marginLeft: "60px",marginRight:"9px" }}
                          autoFocus
                          required
                          placeholder="Enter  last name"
                        />
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="bold lable lable3 color mt-4 " style={{ marginLeft: "80px" }}>
                    <table className="form-outline">
                      <tr>
                        <td
                          style={{ marginRight: "" }}
                          className=""
                          htmlfor="email"
                        >
                          Email:
                        </td>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={data.email || ""}
                          onChange={handleChange}
                          className="form-control  "
                          style={{ marginLeft: "73px" }}
                          autoFocus
                          required
                          placeholder="Enter  email"
                        />
                        {errors.email && (
                          <p
                            className=""
                            style={{ color: "red", marginLeft: "100px" }}
                          >
                            {errors.email}{" "}
                          </p>
                        )}
                      </tr>
                    </table>
                    <table
                      className="form-outline"
                      style={{ marginTop: "30px", marginRight: "40px" }}
                    >
                      <tr>
                        <td className="" htmlfor="phone">
                          phone:
                        </td>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={data.phone || ""}
                          onChange={handleChange}
                          className="form-control  "
                          style={{ marginLeft: "70px" }}
                          autoFocus
                          required
                          placeholder="Enter  phone"
                        />
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="w3-bar">
                  <button
                    className="w3-button w3-right w3-green  mt-3 "
                    style={{ marginRight: "10px", borderRadius: "8px" }}
                    onClick={handleNext}
                  >
                    Next &raquo;
                  </button>
                </div>

                <form />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Step1;
