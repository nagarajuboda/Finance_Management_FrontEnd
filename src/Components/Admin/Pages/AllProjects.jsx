import "../../../assets/Styles/AllProduct.css";
import React from "react";
import DataTable from "react-data-table-component";

export default function AllProjects() {
  const columns = [
    {
      name: "Project Name",
      selecter: "name",
      sortable: true,
      cell: (row) => <div className="date">{row.name}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
    {
      name: "Project Type",
      selecter: "projectType",
      sortable: true,
      cell: (row) => <div className="date">{row.projectType}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
    {
      name: "Clients",
      selecter: "client",
      sortable: true,
      cell: (row) => <div className="date">{row.client}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
    {
      name: "Due date",
      selecter: "date",
      sortable: true,
      cell: (row) => <div className="date">{row.date}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
    {
      name: "Progress",
      selecter: "progress",
      sortable: true,
      cell: (row) => <div className="date">{row.progress}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
    {
      name: "",
      selecter: "ename",
      sortable: true,
      cell: (row) => <div className="date">{row.ename}</div>,
      style: {
        padding: "10px",
        fontSize: "14px",
      },
    },
  ];
  const Data = [
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
    {
      name: "Portu Website",
      projectType: "Web Design",
      client: "image",
      date: "June 1, 2020",
      progress: "20%",
      ename: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="AllProductmaindiv">
      {/* <div className="header card">
        <div className="row">
          <div className="col-4">
            <p>Projects</p>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <input
              type="text"
              className="form-control productSearch"
              placeholder="Search"
            />
          </div>
        </div>
      </div> */}
      <div className="card mt-4">
        <div className="row">
          <div
            className="col-4 contentpro"
            style={{ fontSize: "1.5rem", color: "#202020", fontWeight: "700" }}
          >
            Product Design Team
          </div>
          <div className="col-3"></div>
          <div className="col-4">
            <p className="threedots">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </p>
          </div>
        </div>
        <div>
          {console.log(Data)}
          {/* <DataTable columns={columns} data={Data} pagination /> */}
          <DataTable
            columns={columns}
            data={Data}
            pagination
            selectableRows
            className="rows"
          ></DataTable>
        </div>
      </div>
    </div>
  );
}
