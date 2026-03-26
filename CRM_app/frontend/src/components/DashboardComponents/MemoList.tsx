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

type Memo = {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
};

// Dummy HR memos
const memos: Memo[] = [
//   {
//     id: "1",
//     title: "Policy Update",
//     description: "Review the updated leave policy before Friday.",
//     priority: "HIGH"
//   },
//   {
//     id: "2",
//     title: "Document Submission",
//     description: "Submit PAN card copy to HR.",
//     priority: "MEDIUM"
//   }
];

const MemoList = () => {

  const getPriorityColor = (priority: string) => {
    if (priority === "HIGH") return "error";
    if (priority === "MEDIUM") return "warning";
    return "success";
  };

  return (
    <Card elevation={3}sx={{
        height: "100%",
        minHeight: 260,
        backgroundColor: "#FFF9C4",
        borderRadius: 3
      }}>
      <CardContent>

        <Typography variant="h6" gutterBottom>
          HR Memos
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {memos.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography color="text.secondary">
              Nothing to review
            </Typography>
          </Box>
        ) : (
          <List>
            {memos.map((memo) => (
              <ListItem key={memo.id} sx={{ mb: 1 }}>
                <ListItemText
                  primary={memo.title}
                  secondary={memo.description}
                />

                <Chip
                  label={memo.priority}
                  color={getPriorityColor(memo.priority)}
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

export default MemoList;