import { useEffect, useState } from "react";
import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
export default function ViewMangerProject() {
  const [projectid, setProjectid] = useState("");
  const [ProjectEmployees, setProjectEmployees] = useState([]);
  const [project, setProject] = useState({});

  useEffect(() => {
    projectManager();
    const projectId = localStorage.getItem("ProjectID");
    setProjectid(projectId);
    if (projectid) {
      FetchData(projectid);
    }
  }, [projectid]);

  async function FetchData(projectid) {
    var response = await EmployeeService.FcnGetAllProjectEmployees(projectid);

    if (response.isSuccess) {
      setProjectEmployees(response.item.item2);
      setProject(response.item.item1);
    }
  }

  return (
    <div className="maindivc">
      <div className="card mt-3">
        <div>
          <p>{project.projectName}</p>
        </div>
        <div>
          <p className="description">Project Description</p>
        </div>
        <div className="descriptioncontent mt-3">
          <p style={{ marginBottom: "0px", fontWeight: "400" }}>
            {project.description}
          </p>
        </div>
      </div>
      <div className="card mt-3">
        {ProjectEmployees.map((obj, index) => (
          <p>{obj.firstName}</p>
        ))}
      </div>
    </div>
  );
}
