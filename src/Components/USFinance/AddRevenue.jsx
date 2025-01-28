import axios from "axios";
import { useEffect, useState } from "react";
import GetAllRevenue from "../IndianFinance/Revenue";
import "../../../src/assets/Styles/Revenue.css";
export default function AddRevenue() {
  var projectID = sessionStorage.getItem("id");
  const [Project, setProject] = useState({});
  useEffect(() => {
    FetchData();
  }, [projectID, Project]);

  console.log(projectID, "project id");
  async function FetchData() {
    var ProjectResponse = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${projectID}`
    );
    var result = ProjectResponse.data;
    setProject(result.item.project);
  }
  console.log(Project);
  return (
    <div>
      <div className="Project_destils_content" style={{ display: "flex" }}>
        <span>
          <i
            class="bi bi-arrow-left"
            style={{ height: "12px", wid: "25px" }}
          ></i>
        </span>
        Project Details
      </div>
      <div className="addRevenueMaindiv">{Project.projectName}</div>
    </div>
  );
}
