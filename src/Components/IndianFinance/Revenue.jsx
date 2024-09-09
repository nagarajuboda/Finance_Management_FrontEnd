import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import DataTable from "react-data-table-component";
import "../../../src/assets/Styles/Revenue.css";

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
  const [data, setData] = useState([
    {
      employeeId: "IARC001",
      name: "Nagaraju",
      status: "Active",
      role: "Employee",
      manager: "Raju",
      hours: 200,
      revenue: 1000000,
    },
    {
      employeeId: "IARC002",
      name: "Sita",
      status: "Inactive",
      role: "Manager",
      manager: "Ravi",
      hours: 180,
      revenue: 850000,
    },
    {
      employeeId: "IARC003",
      name: "Ravi",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 210,
      revenue: 1100000,
    },
    {
      employeeId: "IARC004",
      name: "Anil",
      status: "Active",
      role: "Employee",
      manager: "Raju",
      hours: 190,
      revenue: 900000,
    },
    {
      employeeId: "IARC005",
      name: "Kiran",
      status: "Inactive",
      role: "Intern",
      manager: "Ravi",
      hours: 150,
      revenue: 500000,
    },
    {
      employeeId: "IARC006",
      name: "Swati",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 220,
      revenue: 1200000,
    },
    {
      employeeId: "IARC007",
      name: "Raj",
      status: "Active",
      role: "Manager",
      manager: "Ravi",
      hours: 200,
      revenue: 950000,
    },
    {
      employeeId: "IARC008",
      name: "Renu",
      status: "Inactive",
      role: "Employee",
      manager: "Raju",
      hours: 170,
      revenue: 800000,
    },
    {
      employeeId: "IARC009",
      name: "Amit",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 205,
      revenue: 1050000,
    },
    {
      employeeId: "IARC010",
      name: "Pooja",
      status: "Active",
      role: "Intern",
      manager: "Ravi",
      hours: 160,
      revenue: 600000,
    },
    {
      employeeId: "IARC011",
      name: "Meera",
      status: "Active",
      role: "Employee",
      manager: "Raju",
      hours: 210,
      revenue: 1150000,
    },
    {
      employeeId: "IARC012",
      name: "Suresh",
      status: "Inactive",
      role: "Manager",
      manager: "Nagaraju",
      hours: 180,
      revenue: 880000,
    },
    {
      employeeId: "IARC013",
      name: "Sanjay",
      status: "Active",
      role: "Employee",
      manager: "Ravi",
      hours: 190,
      revenue: 900000,
    },
    {
      employeeId: "IARC014",
      name: "Divya",
      status: "Inactive",
      role: "Employee",
      manager: "Raju",
      hours: 150,
      revenue: 550000,
    },
    {
      employeeId: "IARC015",
      name: "Vikram",
      status: "Active",
      role: "Manager",
      manager: "Nagaraju",
      hours: 230,
      revenue: 1250000,
    },
    {
      employeeId: "IARC016",
      name: "Gita",
      status: "Active",
      role: "Employee",
      manager: "Ravi",
      hours: 220,
      revenue: 1150000,
    },
    {
      employeeId: "IARC017",
      name: "Sandeep",
      status: "Inactive",
      role: "Intern",
      manager: "Raju",
      hours: 140,
      revenue: 450000,
    },
    {
      employeeId: "IARC018",
      name: "Nisha",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 200,
      revenue: 1000000,
    },
    {
      employeeId: "IARC019",
      name: "Akash",
      status: "Active",
      role: "Manager",
      manager: "Ravi",
      hours: 210,
      revenue: 1050000,
    },
    {
      employeeId: "IARC020",
      name: "Neha",
      status: "Inactive",
      role: "Employee",
      manager: "Raju",
      hours: 170,
      revenue: 750000,
    },
    {
      employeeId: "IARC021",
      name: "Deepak",
      status: "Active",
      role: "Intern",
      manager: "Nagaraju",
      hours: 160,
      revenue: 600000,
    },
    {
      employeeId: "IARC022",
      name: "Rita",
      status: "Active",
      role: "Employee",
      manager: "Ravi",
      hours: 200,
      revenue: 1000000,
    },
    {
      employeeId: "IARC023",
      name: "Vinod",
      status: "Inactive",
      role: "Employee",
      manager: "Raju",
      hours: 150,
      revenue: 500000,
    },
    {
      employeeId: "IARC024",
      name: "Mina",
      status: "Active",
      role: "Manager",
      manager: "Nagaraju",
      hours: 230,
      revenue: 1200000,
    },
    {
      employeeId: "IARC025",
      name: "Kavita",
      status: "Active",
      role: "Employee",
      manager: "Ravi",
      hours: 210,
      revenue: 1100000,
    },
    {
      employeeId: "IARC026",
      name: "Rajesh",
      status: "Inactive",
      role: "Intern",
      manager: "Raju",
      hours: 140,
      revenue: 450000,
    },
    {
      employeeId: "IARC027",
      name: "Suman",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 200,
      revenue: 1000000,
    },
    {
      employeeId: "IARC028",
      name: "Arun",
      status: "Active",
      role: "Manager",
      manager: "Ravi",
      hours: 220,
      revenue: 1150000,
    },
    {
      employeeId: "IARC029",
      name: "Meenal",
      status: "Inactive",
      role: "Employee",
      manager: "Raju",
      hours: 160,
      revenue: 600000,
    },
    {
      employeeId: "IARC030",
      name: "Jaya",
      status: "Active",
      role: "Employee",
      manager: "Nagaraju",
      hours: 200,
      revenue: 1000000,
    },
  ]);
  const [searchText, setSearchText] = useState("");

  const handleDateChange = async (date) => {
    const formattedDate = format(date, "MMMM yyyy");
    setSelectedDate(date);
    const [month, year] = formattedDate.split(" ");
    const monthNumber = monthMap[month];
    await GetRevenue(monthNumber, year);
  };

  const GetRevenue = async (month, year) => {
    console.log(month, "month", year, "year");
    // Fetch your data and update state here
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { name: "ID", selector: (row) => row.employeeId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Role", selector: (row) => row.role, sortable: true },
    { name: "Manager", selector: (row) => row.manager, sortable: true },
    { name: "Hours", selector: (row) => row.hours, sortable: true },
    { name: "Revenue", selector: (row) => row.revenue, sortable: true },
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
