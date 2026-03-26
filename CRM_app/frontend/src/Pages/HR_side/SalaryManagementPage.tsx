import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  getAllSalaryService,
  addSalaryService,
} from "../../features/salary/salaryService";
import {
  setSalaryStart,
  setAllSalarySuccess,
  setSalaryFailure,
  addSalary,
} from "../../features/salary/salarySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const SalaryManagementPage = () => {
  const dispatch = useAppDispatch();
  const { allSalaries } = useAppSelector((state) => state.salaryReducer);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    baseSalary: "",
    bonus: "",
    deductions: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    const load = async () => {
      dispatch(setSalaryStart());
      try {
        const data = await getAllSalaryService();
        dispatch(setAllSalarySuccess(data));
      } catch {
        dispatch(setSalaryFailure("Failed to load salaries"));
      }
    };

    load();
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
        
      const payload = {
        employeeId: formData.employeeId,
        baseSalary: Number(formData.baseSalary),
        bonus: Number(formData.bonus),
        deductions: Number(formData.deductions),
        month: formData.month,
        year: Number(formData.year),
      };

      const newSalary = await addSalaryService(payload);
      dispatch(addSalary(newSalary));

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "netSalary",
      headerName: "Net Salary",
      flex: 1,
      renderCell: (params) => `₹${params.value}`,
    },
  ];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          Salary Management
        </Typography>

        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Salary
        </Button>
      </Box>

      <Box sx={{ height: 500, backgroundColor: "white", borderRadius: 3 }}>
        <DataGrid
          rows={allSalaries}
          getRowId={(row) => row.salaryId}
          columns={columns}
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add Salary</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            {Object.keys(formData).map((key) => (
              <TextField
                key={key}
                name={key}
                label={key}
                value={(formData as any)[key]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalaryManagementPage;