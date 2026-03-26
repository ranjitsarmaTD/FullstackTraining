import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Paper,
  Container,
} from "@mui/material";

type DailyAttendance = {
  date: string;
  signIn: string | null;
  signOut: string | null;
  duration: string;
  status: "PRESENT" | "HALF_DAY" | "ABSENT";
};

type MonthlySummary = {
  month: string;
  totalDays: number;
  weekends: number;
  holidays: number;
  workingDays: number;
  presentDays: number;
  absentDays: number;
};

const AttendancePage = () => {
  const [today, setToday] = useState<DailyAttendance | null>(null);
  const [weeklyRecords, setWeeklyRecords] = useState<DailyAttendance[]>([]);
  const [monthlySummary, setMonthlySummary] =
    useState<MonthlySummary | null>(null);

  useEffect(() => {
    setToday({
      date: "2026-02-13",
      signIn: "09:42",
      signOut: "18:21",
      duration: "8h 39m",
      status: "PRESENT",
    });

    setWeeklyRecords([
      {
        date: "Mon",
        signIn: "09:45",
        signOut: "18:10",
        duration: "8h 25m",
        status: "PRESENT",
      },
      {
        date: "Tue",
        signIn: "10:30",
        signOut: "17:00",
        duration: "6h 30m",
        status: "HALF_DAY",
      },
      {
        date: "Wed",
        signIn: null,
        signOut: null,
        duration: "0h",
        status: "ABSENT",
      },
    ]);

    setMonthlySummary({
      month: "January 2026",
      totalDays: 31,
      weekends: 8,
      holidays: 2,
      workingDays: 21,
      presentDays: 19,
      absentDays: 2,
    });
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "PRESENT") return "success";
    if (status === "HALF_DAY") return "warning";
    return "error";
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ mb: 5, textAlign: "center" }}
        >
          Your Attendance Records
        </Typography>

        <Grid container spacing={5} justifyContent="center">
          {/* Today Attendance */}
          {today && (
            <Grid item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  minHeight: 320,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Today's Attendance
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography color="text.secondary" fontSize={18}>
                        Sign In
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={18}>
                        {today.signIn ?? "--"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography color="text.secondary" fontSize={18}>
                        Sign Out
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={18}>
                        {today.signOut ?? "--"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography color="text.secondary" fontSize={18}>
                        Duration
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography fontSize={18}>{today.duration}</Typography>
                    </Grid>
                  </Grid>

                  <Box mt={4}>
                    <Chip
                      label={today.status}
                      color={getStatusColor(today.status)}
                      sx={{ fontSize: 16, padding: "8px 12px" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Monthly Summary */}
          {monthlySummary && (
            <Grid item xs={12} md={6}>
              <Card
                elevation={4}
                sx={{
                  minHeight: 320,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {monthlySummary.month}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={3}>
                    {[
                      { label: "Total Days", value: monthlySummary.totalDays },
                      {
                        label: "Working Days",
                        value: monthlySummary.workingDays,
                      },
                      { label: "Present", value: monthlySummary.presentDays },
                      { label: "Absent", value: monthlySummary.absentDays },
                      { label: "Weekends", value: monthlySummary.weekends },
                      { label: "Holidays", value: monthlySummary.holidays },
                    ].map((item) => (
                      <Grid item xs={6} key={item.label}>
                        <Paper
                          elevation={2}
                          sx={{
                            padding: 3,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="text.secondary"
                          >
                            {item.label}
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {item.value}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default AttendancePage;