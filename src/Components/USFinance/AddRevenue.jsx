import axios from "axios";
import { useEffect, useState } from "react";
import GetAllRevenue from "../IndianFinance/Revenue";
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
      <div className="Project_destils_content">Project Details</div>
      <div className="addRevenueMaindiv">{Project.projectName}</div>
    </div>
  );
}
