import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Paper,
} from "@mui/material";
import "../../../assets/Styles/AllProduct.css";
import { apiurl } from "../../../Service/createAxiosInstance";
import ProjectService from "../../../Service/AdminService/ProjectService";

export default function AllProjects() {
  const navigate = useNavigate();
  const [getAll, setAllProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("projectName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function viewClickfunction(e, id) {
    e.preventDefault();
    localStorage.setItem("projectId", id);
    navigate("/Dashboard/ViewProject");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ProjectService.AllProjects();
        const result = response.data;

        setAllProjects(result.item);
        setFilteredProjects(result.item);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = getAll.filter((project) => {
      const projectManager = `${project.employee.firstName} ${project.employee.lastName}`;
      const lowerSearchText = searchText.toLowerCase();

      return (
        project.project.projectName.toLowerCase().includes(lowerSearchText) ||
        project.client.clientName.toLowerCase().includes(lowerSearchText) ||
        projectManager.toLowerCase().includes(lowerSearchText) ||
        project.project.projectID.toString().includes(lowerSearchText) ||
        new Date(project.project.startDate)
          .toLocaleDateString()
          .includes(lowerSearchText) ||
        new Date(project.project.endDate)
          .toLocaleDateString()
          .includes(lowerSearchText)
      );
    });

    setFilteredProjects(filteredData);
  }, [searchText, getAll]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedProjects = filteredProjects.sort((a, b) => {
    if (a.project[orderBy] < b.project[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a.project[orderBy] > b.project[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const noDataMessage = (
    <div style={{ padding: "10px", textAlign: "center" }}>No records found</div>
  );

  return (
    <div className="AllProductmaindiv">
      <div className="card" style={{ borderRadius: "0px" }}>
        <div className="AddProjects">
          <p className="contentallproject">Projects</p>
          <Link to="/Dashboard/AddProject" className="addprojectlink">
            Add New Project
          </Link>
        </div>

        <div>
          <div className="search-container">
            <TextField
              variant="outlined"
              placeholder="Search projects..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input "
              style={{ padding: "05px 0px" }}
            />
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: " rgb(37, 122, 150)",
                    color: "white",
                  }}
                >
                  <TableCell>
                    <TableSortLabel
                      style={{ color: "white" }}
                      active={orderBy === "projectID"}
                      direction={orderBy === "projectID" ? order : "asc"}
                      onClick={() => handleRequestSort("projectID")}
                    >
                      Project ID
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      style={{ color: "white" }}
                      active={orderBy === "projectName"}
                      direction={orderBy === "projectName" ? order : "asc"}
                      onClick={() => handleRequestSort("projectName")}
                    >
                      Project Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      style={{ color: "white" }}
                      active={orderBy === "clientName"}
                      direction={orderBy === "clientName" ? order : "asc"}
                      onClick={() => handleRequestSort("clientName")}
                    >
                      Client
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      style={{ color: "white" }}
                      active={orderBy === "projectManager"}
                      direction={orderBy === "projectManager" ? order : "asc"}
                      onClick={() => handleRequestSort("projectManager")}
                    >
                      Project Manager
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "startDate"}
                      style={{ color: "white" }}
                      direction={orderBy === "startDate" ? order : "asc"}
                      onClick={() => handleRequestSort("startDate")}
                    >
                      Start Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "endDate"}
                      style={{ color: "white" }}
                      direction={orderBy === "endDate" ? order : "asc"}
                      onClick={() => handleRequestSort("endDate")}
                    >
                      Deadline
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProjects.length > 0 ? (
                  sortedProjects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={row.project.id}
                        hover
                        onClick={(e) => viewClickfunction(e, row.project.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{row.project.projectID}</TableCell>
                        <TableCell>{row.project.projectName}</TableCell>
                        <TableCell>{row.client.clientName}</TableCell>
                        <TableCell>
                          {row.employee.firstName || row.employee.lastName
                            ? `${row.employee.firstName} ${row.employee.lastName}`
                            : "--"}
                        </TableCell>
                        <TableCell>
                          {new Date(row.project.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.project.endDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      {noDataMessage}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProjects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
