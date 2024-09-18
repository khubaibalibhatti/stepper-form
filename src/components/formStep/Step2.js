import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, nextStep, prevStep, setErrors } from "../../formSlice";
import Progress from "../formProgress/Progress";

const Step2 = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.form.data.step2);
  const errors = useSelector((state) => state.form.errors);

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
    <>
      <section class=" gradient-custom ">
        <div class="container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <Progress/>
              <div
                class="card shadow-2-strong card-registration"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "  #00246B",
                  width: "600px",
                  marginTop: "30px",
                  marginLeft: "50px",
                  position: "sticky",
                }}
              >
                <form class="form-width " />

                <div class="row">
                  <div
                    class="col-md-8 mt-2"
                    style={{ marginLeft: "80px" }}
                  >
                    <table className="form-outline">
                      <tr>
                        <td>
                          <h6 className="bold  mt-2 lable lable3 color" style={{fontFamily:"Roboto Slab serif"}}>
                            Skill:
                          </h6>
                        </td>
                        <td>
                          <select
                            class="form-select "
                            aria-label="Default select example"
                            style={{ marginLeft: "95px", marginRight: "19px" }}
                            name="Skill"
                            value={data.Skill || ""}
                            onChange={handleChange}
                          >
                            <option selected> select Skill</option>
                            <option value="Programming">Programming</option>
                            <option value="Communiction">Communiction</option>
                            <option value="Designing">Designing</option>
                            <option value="not yet Defined">
                              not yet Defined
                            </option>
                          </select>

                          {errors.Skill && (
                            <p
                              className=""
                              style={{ color: "red", marginLeft: "100px" }}
                            >
                              {" "}
                              {errors.Skill}{" "}
                            </p>
                          )}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="row">
                  <div
                    class="col-md-8 mt-3 mb-3"
                    style={{ marginLeft: "80px" }}
                  >
                    <table>
                      <tr>
                        <td>
                          <h6 className="bold   lable lable3 color" style={{fontFamily:"Roboto Slab serif"}}>
                            Experience:
                          </h6>
                        </td>
                        <td>
                          <select
                            class="form-select "
                            aria-label="Default select example"
                            style={{ marginLeft: "52px", marginRight: "53px" }}
                            name="Experience"
                            value={data.Experience || ""}
                            onChange={handleChange}
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
                    </table>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-8 mb-4" style={{ marginLeft: "80px" }}>
                    <table>
                      <tr>
                        <td>
                          <h6 className="bold lable lable3 mt-2 color" style={{fontFamily:"Roboto Slab serif"}}>
                            Worke:
                          </h6>
                        </td>
                        <td>
                          <select
                            class="form-select mt-2"
                            aria-label="Default select example"
                            value={data.Worke || ""}
                            style={{ marginLeft: "80px", marginRight: "25px" }}
                            onChange={handleChange}
                            name="Worke"
                          >
                            <option selected> select Work</option>
                            <option value="Marketting">Marketting</option>
                            <option value="Official Work">Official Work</option>
                            <option value="Work from home">
                              Work from home
                            </option>
                          </select>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8 mb-4" style={{ marginLeft: "80px" }}>
                    <table>
                      <tr>
                        <td>
                          <h6 className="bold lable3 lable mt-2 color" style={{fontFamily:"Roboto Slab serif"}}>
                            Salary:
                          </h6>
                        </td>

                        <td>
                          <select
                            class="form-select  mt-"
                            aria-label="Default select example"
                            style={{ marginLeft: "80px", marginRight: "55px" }}
                            name="Salary"
                            value={data.Salary || ""}
                            onChange={handleChange}
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
                  </div>
                </div>

                <div class="w3-bar">
                  <button
                    class="w3-button w3-left w3-light-grey "
                    style={{ marginLeft: "10px", borderRadius: "8px" }}
                    onClick={handlePrev}
                  >
                    &laquo; Previous
                  </button>

                  <button
                    className="w3-button w3-right w3-green   "
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

export default Step2;
