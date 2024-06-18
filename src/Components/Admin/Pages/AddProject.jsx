import "../../../assets/Styles/AddProject.css";
import { Link } from "react-router-dom";
export default function AddProject() {
  return (
    <div className="maindiv1">
      <div className="maindiv card ">
        <div className="addproject">Add New Project</div>
        <div>
          <form>
            <div className="row">
              <div className="col-4">
                <div>
                  <lable className="lables">ProjectID</lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectID"
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <div>
                  <lable>
                    ProjectName
                    <span className="ms-1 ">*</span>
                  </lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectName"
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <div>
                  <lable>
                    StartDate
                    <span className="ms-1 ">*</span>
                  </lable>
                </div>
                <input
                  type="date"
                  placeholder="Enter Description"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <lable>EndDate</lable>
                </div>
                <input
                  type="date"
                  placeholder="Enter ProjectID"
                  className="form-control"
                />
              </div>
              <div className="col-3 ">
                <lable>Select Client</lable>

                <div class="dropdown">
                  <button
                    className=" form-control dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Clients
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-1">
                <p>
                  <svg
                    style={{ cursor: "pointer" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </p>
              </div>
              <div className="col-4">
                <div>
                  <lable>TeamSize</lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter TeamSize"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <lable>ProjectRefId</lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectRefId"
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <div>
                  <lable>
                    ProjectType
                    <span className="ms-1 ">*</span>
                  </lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectType"
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <div>
                  <lable>
                    Progress
                    <span className="ms-1 ">*</span>
                  </lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter Progress"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <lable>Assign ProjectManager</lable>
                </div>
                <div class="dropdown">
                  <button
                    className=" form-control dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Clients
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-4">
                <div>
                  <lable>
                    Description
                    <span className="ms-1 ">*</span>
                  </lable>
                </div>
                <textarea
                  className="form-control"
                  placeholder="enter Description"
                ></textarea>
              </div>
              <div className="col-4">
                {/* <div>
                  <lable>Progress</lable>
                </div>
                <input
                  type="text"
                  placeholder="Enter Progress"
                  className="form-control"
                /> */}
              </div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-2">
                <button className="form-control addbtn">Add</button>
              </div>
              <div className="col-2">
                {/* <button className="form-control backbtn">Back</button> */}
                <Link
                  to="/analytics/AllProjects"
                  className="form-control backbtn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
