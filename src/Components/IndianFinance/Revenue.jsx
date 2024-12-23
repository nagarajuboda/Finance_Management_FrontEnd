import React, { forwardRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import "../../../src/assets/Styles/Revenue.css";
import IndianFinanceService from "../../Service/IndianFinance/IndianFinanceService";
import { FaDollarSign } from "react-icons/fa6";

export default function GetAllRevenue() {
  const monthMap = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12",
  };
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate, "selected Date");
  useEffect(() => {
    GetRevenue(selectedDate);
  }, [selectedDate]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    await GetRevenue(selectedDate);
  };

  const GetRevenue = async (date) => {
    const formattedDate = format(date, "MMMM yyyy");
    const [month, year] = formattedDate.split(" ");
    const monthNumber = monthMap[month];
    console.log(monthNumber, year);
    var response = await IndianFinanceService.GetRevenue(monthNumber, year);
    setData(response);
    console.log(response, "getRevenue Response");
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) =>
        val != null &&
        val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { name: "ID", selector: (row) => row.employeeId, sortable: true },
    { name: "Name", selector: (row) => row.employeeName, sortable: true },
    {
      name: "Status",
      selector: (row) => (row.employeeStatus === 1 ? "Active" : "Inactive"),
      cell: (row) => (
        <div
          style={{
            backgroundColor:
              row.employeeStatus === 1 ? "#196e8a" : "rgba(248, 215, 218, 0.8)",
            color: row.employeeStatus === 1 ? "white" : "red",
            padding: "5px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          {row.employeeStatus === 1 ? "Active" : "Inactive"}
        </div>
      ),
      sortable: true,
    },
    { name: "Role", selector: (row) => row.roleName, sortable: true },
    {
      name: "Project Manager",
      selector: (row) =>
        row.projectManagerName == null ? "NA" : row.projectManagerName,

      sortable: true,
    },
    { name: "Hours", selector: (row) => row.hoursWorked, sortable: true },
    {
      name: "Revenue",
      selector: (row) => row.revenueSubmitted,
      cell: (row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaDollarSign style={{ fontSize: "0.90rem" }} />

          {row.revenueSubmitted}
        </div>
      ),
      sortable: true,
    },
  ];

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
      <span>{value}</span>
    </div>
  ));

  return (
    <div>
      <div className="componentmaindiv">
        <div className="card tested" style={{ borderRadius: "0px" }}>
          <p className="revenueTest"> Monthly Revenue</p>
          <div className="">
            <div className=""></div>
            <div
              className=" w-100"
              style={{
                alignItems: "end",
                display: "flex",
                textAlign: "end",
                justifyContent: "end",
              }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                customInput={<CustomInput />}
                className="w-25"
                maxDate={maxDate}
              />
            </div>
            <div className="mt-4">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearch}
                  style={{
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                striped
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
