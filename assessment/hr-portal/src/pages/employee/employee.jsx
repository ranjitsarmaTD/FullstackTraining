import { Box, Typography } from "@mui/material";
import TablePreHeader from "../../components/micro/tablePreHeader/tablePreHeader";
import './employee.css';
import { useState } from "react";
import NewEmployeeForm from "../../components/macro/form/newEmpForm";
import EmployeeTable from "../../components/macro/employeeTable/employeeTable";
import DeleteDialog from "../../components/micro/dialog/deleteDialog";

function Employee(){
    const [ isEmpFormOpen, setEmpFormOpen ] = useState(false)
    const [ isEditFormOpen, setEditFormOpen ] = useState(false)
    const [ isDeleteDialogOpen, setDeleteDialogOpen ] = useState(false)
    const [ editRowData, setEditRowData ] = useState({})
    const [ deleteRowData, setDeleteRowData ] = useState({})

    const closeEmpForm = () => {
        setEmpFormOpen(false)
    }

    const closeEditForm = () => {
        setEditFormOpen(false)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
    }

    const openEmpForm = () => {
        setEmpFormOpen(true)
    }

    const handleEdit = (row) => {
        setEditFormOpen(true);
        setEditRowData(row);
    }

    const handleDelete = (row) => {
        setDeleteDialogOpen(true)
        setDeleteRowData(row)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box sx={{marginY: '4rem', display: 'flex', flexDirection: 'column', paddingY: '4rem', paddingX: '1.5rem', marginX: '1.5rem'}}>
                <Box sx={{marginBottom: '4rem'}}>
                    <h2>Employees</h2>
                    <Typography component={'h4'} className="sub-title">View and Manage Employees</Typography>
                </Box>
                <TablePreHeader total={5} openEmpForm={openEmpForm}/>
                <EmployeeTable 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}
                />
                {
                    isEmpFormOpen && <NewEmployeeForm 
                        closeEmpForm={closeEmpForm} 
                        isEmpFormOpen={isEmpFormOpen} 
                        editRowData={{}} 
                        edit={false}
                    />
                }
                {
                    isEditFormOpen && <NewEmployeeForm 
                        closeEmpForm={closeEditForm} 
                        isEmpFormOpen={isEditFormOpen} 
                        editRowData={editRowData} 
                        edit={true}
                    />
                }
                {
                    isDeleteDialogOpen && <DeleteDialog 
                        deleteRowData={deleteRowData} 
                        closeDeleteDialog={closeDeleteDialog} 
                        isDeleteDialogOpen={isDeleteDialogOpen}
                    />
                }
            </Box>
        </Box>
    )
}

export default Employee;