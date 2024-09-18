import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, prevStep } from "../../formSlice";
import { submitForm, setCity, setCountry, setErrors } from "../../formSlice";
import { useNavigate } from "react-router-dom";
import Progress from "../formProgress/Progress";

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
  

  // form validation start
  const validate = () => {
    let errors = {};
    if (!data.country) errors.country = "country field is Requierd:";

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
    <>
      <section className=" gradient-custom ">
        <div className="container py-5 h-50">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <Progress />
              <div
                className="card shadow-2-strong card-registration"
                style={{
                  borderRadius: "15px",
                  backgroundColor: " #00246B",
                  width: "600px",
                  marginTop: "30px",
                  marginLeft: "50px",
                  position:"sticky"
                }}
              >
                <form className="form-width " />
                <div className="row">
                  <div
                    className="col-md-8 "
                    style={{ marginLeft: "80px" }}
                  >
                    <table>
                      <tr>
                        <td>
                          <h6 className="bold  mt-4 mb-3 lable lable3 color" style={{fontFamily:"Roboto Slab serif"}}>
                            Country:
                          </h6>
                        </td>
                        <td>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="country"
                            value={data.country || ""}
                            style={{ marginLeft: "70px", marginRight: "59px" }}
                            onChange={handleCountryChange}
                          >
                            <option value=""> select country</option>
                            {countries.map((country) => (
                              <option value={country} key={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <p className="" style={{ color: "red" }}>
                              {" "}
                              {errors.country}{" "}
                            </p>
                          )}
                        </td>
                      </tr>
                    </table>
                    <table>
                      <tr>
                        <td>
                          <h6 className="bold   lable lable3 mt-4 color" style={{fontFamily:"Roboto Slab serif"}}>
                            City:
                          </h6>
                        </td>
                        <td>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="city"
                            value={data.city || ""}
                            onChange={handleCityChange}
                            style={{ marginLeft: "94px", marginRight: "45px" }}
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
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-8 mb-4"
                    style={{ marginLeft: "80px" }}
                  >
                    <div className="form-outline">
                      <table>
                        <tr>
                          <td>
                            <label
                              className="form-label lable bold mt-4 mb-3 lable color"
                              for="age"
                            >
                              Zip_Code:
                            </label>
                          </td>
                          <td>
                            <input
                              name="zip_code"
                              value={data.zip_code || ""}
                              style={{ marginLeft: "60px"}}
                              onChange={handleChange}
                              type="text"
                              id="age"
                              className="form-control "
                              placeholder="Enter zip-code"
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div className="form-outline">
                      <table>
                        <tr>
                          <td>
                            <label
                              className="form-label bold lable lable1 mt-4 color"
                              for="age"
                            >
                              Street:
                            </label>
                          </td>

                          <td>
                            <input
                              name="street"
                              value={data.street || ""}
                              onChange={handleChange}
                              type="text"
                              id="age"
                              className="form-control  col-md-4"
                              style={{ marginLeft: "70px",  }}
                              placeholder="Enter Street"
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="w3-bar">
                  <button
                    class="w3-button w3-left w3-light-grey  "
                    style={{ marginLeft: "10px", borderRadius: "8px" }}
                    onClick={handlePrev}
                  >
                    &laquo; Previous
                  </button>

                  <button
                    className="w3-button w3-right w3-green  "
                    style={{ marginRight: "10px", borderRadius: "8px" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>

                <form />
              </div>
            </div>
          </div>
        </div>
      </section>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {errors}</p>}
    </>
  );
};

export default Step3;
