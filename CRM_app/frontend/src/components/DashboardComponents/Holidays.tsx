import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Box
} from "@mui/material";

type Holiday = {
  id: string;
  name: string;
  date: string;
};

const holidays: Holiday[] = [
  {
    id: "1",
    name: "Independence Day",
    date: "15 Aug 2026"
  },
  {
    id: "2",
    name: "Gandhi Jayanti",
    date: "2 Oct 2026"
  },
  {
    id: "3",
    name: "Diwali",
    date: "8 Nov 2026"
  }
];

const Holidays = () => {

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        minHeight: 260,
        borderRadius: 3,
        backgroundColor: "#E3F2FD"
      }}
    >
      <CardContent>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Upcoming Holidays
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {holidays.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 150
            }}
          >
            <Typography color="text.secondary">
              No upcoming holidays
            </Typography>
          </Box>
        ) : (
          <List>
            {holidays.map((holiday) => (
              <ListItem
                key={holiday.id}
                sx={{
                  mb: 1,
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: 2,
                  px: 2
                }}
              >
                <ListItemText
                  primary={holiday.name}
                  secondary={holiday.date}
                />

                <Chip
                  label="Holiday"
                  color="primary"
                  size="small"
                />
              </ListItem>
            ))}
          </List>
        )}

      </CardContent>
    </Card>
  );
};

export default Holidays;