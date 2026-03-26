import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Grid,
  Skeleton,
  Alert,
  Chip,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setSalaryStart,
  setMySalarySuccess,
  setSalaryFailure,
} from "../../features/salary/salarySlice";
import { getMySalaryService } from "../../features/salary/salaryService";

const SalaryInfo = () => {
  const dispatch = useAppDispatch();
  const { mySalaries, loading, error } = useAppSelector(
    (state) => state.salaryReducer
  );

  const latestSalary = mySalaries


  useEffect(() => {
    const loadSalary = async () => {
      dispatch(setSalaryStart());
      try {
        const data = await getMySalaryService();
        console.log(data)
        dispatch(setMySalarySuccess(data));
      } catch {
        dispatch(setSalaryFailure("Failed to fetch salary"));
      }
    };

    loadSalary();
  }, [dispatch]);


  return (
    <Box display="flex" justifyContent="center" mt={5} px={2}>
      <Card sx={{ width: "100%", maxWidth: 900, borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" fontWeight={600}>
              Salary Details
            </Typography>

            {latestSalary && (
              <Chip
                label={`${latestSalary.month} ${latestSalary.year}`}
                color="primary"
                variant="outlined"
              />
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {loading && (
            <>
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={200} />
            </>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && latestSalary && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Base Salary</Typography>
                  <Typography variant="h6">
                    ₹{latestSalary.baseSalary}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Net Salary</Typography>
                  <Typography variant="h6" fontWeight={600}>
                    ₹{latestSalary.netSalary}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight={600}>Breakdown</Typography>

              <Grid container spacing={1}>
                <Grid item xs={6}>Bonus</Grid>
                <Grid item xs={6}>₹{latestSalary.bonus}</Grid>

                <Grid item xs={6}>Deductions</Grid>
                <Grid item xs={6}>₹{latestSalary.deductions}</Grid>
              </Grid>
            </>
          )}

          {!loading && !error && mySalaries === null && (
            <Alert severity="info">No salary records found</Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default SalaryInfo;