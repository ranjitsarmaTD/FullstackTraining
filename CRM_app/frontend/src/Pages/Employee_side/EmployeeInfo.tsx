import { TextField, List, ListItem, ListItemButton } from "@mui/material";
import styles from "../../styles/EmployeeInfo.module.css"
import { useState } from "react";


//dummydata
const EMPLOYEES: Employee[] = [
  {
    id: "TD01",
    name: "Saranga Bora",
    dob: "25-11-2001",
    joiningDate: "8-09-2025",
    location: "Guwahati",
  },
  {
    id: "TD02",
    name: "Dip Saha",
    dob: "25-11-2001",
    joiningDate: "8-09-2025",
    location: "West Bengal",
  },
  {
    id: "EMP003",
    name: "Karan Mehta",
    dob: "1993-06-19",
    joiningDate: "2020-05-10",
    location: "Pune",
  },
];

type Employee = {
  id: string;
  name: string;
  dob: string;
  joiningDate: string;
  location: string;
};




const EmployeeInfo =() => {
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  /* ---------- FILTER LOGIC ---------- */
  const filteredEmployees = EMPLOYEES.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      
      <div className={styles.searchBar}>
        <TextField
          
          label="Search by Employee Name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     
      <div className={styles.content}>
        
        <div className={styles.employeeList}>
          <List>
            {filteredEmployees.map((emp) => (
              <ListItem key={emp.id} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedEmployee(emp)}
                >
                  {emp.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>

        
        <div className={styles.employeeDetails}>
          {selectedEmployee ? (
            <>
              <h3>{selectedEmployee.name}</h3>
              <p><strong>Employee ID:</strong> {selectedEmployee.id}</p>
              <p><strong>Date of Birth:</strong> {selectedEmployee.dob}</p>
              <p><strong>Joining Date:</strong> {selectedEmployee.joiningDate}</p>
              <p><strong>Location:</strong> {selectedEmployee.location}</p>
            </>
          ) : (
            <p>Select an employee to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmployeeInfo