import {
  Container,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Employee } from "../../features/employees/employeesType";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  addEmployeeService,
  deleteEmployee,
  getEmployees,
} from "../../features/employees/employeesService";
import {
  removeEmployee,
  setEmployees,
  setSelectedEmployee,
} from "../../features/employees/employeesSlice";
import { useUser } from "../../context/useUser";

// type Employee = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
//   role: "hr" | "admin" | "employee";
//   dob: string;
//   joiningDate: string;
//   location: string;
// };
// const EMPLOYEES: Employee[] = [
//   {
//     employeeId: "TD01025",
//     name: "Saranga Bora",
//     email: "saranga@test.com",
//     password: "123456",
//     role: "employee",
//     dob: "2001-11-25",
//     joiningDate: "2025-09-08",
//     location: "Guwahati",
//   },
//   {
//     employeeId: "TD02025",
//     name: "Dip Saha",
//     email: "dip@test.com",
//     password: "123456",
//     role: "employee",
//     dob: "2001-11-25",
//     joiningDate: "2025-09-08",
//     location: "West Bengal",
//   },
// ];

const EmployeeInfo = () => {
  // const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);

  const { user } = useUser();
  const currentRole = user?.role;

  const dispatch = useAppDispatch();

  const employees = useAppSelector(
    (state) => state.employeesReducer.filteredEmployees,
  );

  const selectedEmployee = useAppSelector(
    (state) => state.employeesReducer.selectedEmployee,
  );

  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "employee",
    dob: "",
    joiningDate: "",
    location: "",
  });
  const [search, setSearch] = useState("");
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
  //   null,
  // );

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getEmployees();
      dispatch(setEmployees(data));
    };

    loadEmployees();
  }, [dispatch]);

  //to make changes here
  // const handleRemoveEmployee = () => {
  //   if (!selectedEmployee) return;

  //   const updated = employees.filter((emp) => emp.id !== selectedEmployee.id);

  //   setEmployees(updated);
  //   setSelectedEmployee(null);
  // };
  const handleRemoveEmployee = async () => {
    if (!selectedEmployee) return;

    try {
      await deleteEmployee(selectedEmployee!.id);

      dispatch(removeEmployee(selectedEmployee.id));
      const data = await getEmployees();
      dispatch(setEmployees(data));
    } catch (error) {
      console.error("Failed to delete employee", error);
    }
  };

  const handleAddEmployee = async () => {
    // setEmployees([...employees, newEmployee]);
    try {
      const res = await addEmployeeService(newEmployee);
      toast.success(res.message + " with EmpID:" + res.employeeId);

      setNewEmployee({
        id: "",
        employeeId: "",
        name: "",
        email: "",
        password: "",
        role: "employee",
        dob: "",
        joiningDate: "",
        location: "",
      });
      const data = await getEmployees();
      dispatch(setEmployees(data));
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error(message);
    }
  };

  const handleSelectedEmployee = (employee: Employee) => {
    dispatch(setSelectedEmployee(employee));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 6 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          Employee Directory
        </Typography>

        {currentRole==="hr" &&( <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Employee
        </Button>)}
      </Box>

      <TextField
        fullWidth
        label="Search by Employee Name or ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid
        container
        spacing={4}
        sx={{ minHeight: "75vh" }}
        alignItems="stretch"
      >
        <Grid item xs={12} md={5} width="40%">
          <Card
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" mb={2}>
                Employees
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <List sx={{ maxHeight: "65vh", overflow: "auto" }}>
                {filteredEmployees.map((emp) => (
                  <ListItem key={emp.id} disablePadding>
                    <ListItemButton
                      selected={selectedEmployee?.id === emp.id}
                      onClick={() => {
                        handleSelectedEmployee(emp);
                      }}
                    >
                      <ListItemText
                        primary={emp.name}
                        secondary={`ID: ${emp.employeeId}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7} width="50%">
          <Card
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardContent
              sx={{
                width: "100%",
                maxWidth: 500,
                margin: "auto",
              }}
            >
              {selectedEmployee ? (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    mb={3}
                    justifyContent="center"
                  >
                    <Avatar sx={{ width: 70, height: 70 }}>
                      {selectedEmployee.name[0]}
                    </Avatar>

                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {selectedEmployee.name}
                      </Typography>
                      <Typography color="text.secondary">
                        Employee ID: {selectedEmployee.employeeId}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography color="text.secondary">
                        Date of Birth
                      </Typography>
                      <Typography>{selectedEmployee.dob}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography color="text.secondary">
                        Joining Date
                      </Typography>
                      <Typography>{selectedEmployee.joiningDate}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography color="text.secondary">Location</Typography>
                      <Typography>{selectedEmployee.location}</Typography>
                    </Grid>
                  </Grid>
                  <Box mt={4} display="flex" justifyContent="center">
                    {currentRole === "hr" && selectedEmployee && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleRemoveEmployee}
                      >
                        Remove Employee
                      </Button>
                    )}
                  </Box>
                </>
              ) : (
                <Typography color="text.secondary" textAlign="center" mt={10}>
                  Select an employee from the list to view details
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Add Employee</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 400,
            gap: 3,
            mt: 1,
          }}
        >
          <TextField
            label="ID"
            value={newEmployee.employeeId}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, employeeId: e.target.value })
            }
          />

          <TextField
            label="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />

          <TextField
            label="Email"
            type="email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newEmployee.role}
              label="Role"
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  role: e.target.value as Employee["role"],
                })
              }
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="DOB"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newEmployee.dob}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, dob: e.target.value })
            }
          />

          <TextField
            label="Joining Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newEmployee.joiningDate}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                joiningDate: e.target.value,
              })
            }
          />

          <TextField
            label="Location"
            value={newEmployee.location}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                location: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleAddEmployee}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeInfo;
