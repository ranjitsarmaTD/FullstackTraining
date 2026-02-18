import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import './deleteDialog.css';
import { useDispatch } from "react-redux";
import { deleteEmployees } from "../../../store/thunks/employeeThunks";

function DeleteDialog({deleteRowData, closeDeleteDialog, isDeleteDialogOpen}){
    const dispatch = useDispatch()
    const deleteRow = () => {
        dispatch(deleteEmployees(deleteRowData));
        closeDeleteDialog()
    }
    return (
        <Dialog
            open={isDeleteDialogOpen}
            onClose={closeDeleteDialog}
        >
            <DialogTitle 
                sx={{textAlign: 'center'}}
            >Are your sure?</DialogTitle>
            <DialogContent>
                <DialogContentText 
                    sx={{textAlign: 'center'}}
                >You want to delete {deleteRowData?.name}?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={deleteRow}
                >Yes, Delete</Button>
                <Button
                    onClick={closeDeleteDialog}
                >No, Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;