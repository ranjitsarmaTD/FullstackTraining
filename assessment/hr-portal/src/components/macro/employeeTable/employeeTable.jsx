import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {fetchEmployees} from '../../../store/thunks/employeeThunks'
import { Box } from "@mui/material";

function EmployeeTable({handleEdit, handleDelete}){
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.employees)

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 250 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "designation", headerName: "Designation", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "hiringDate", headerName: "Hiring Date", width: 150},
        { field: "actions", type: 'actions', headerName: "Actions", width: 250, getActions: (params) => [
            <GridActionsCellItem
                icon={<EditIcon sx={{ color: '#1E3A8A'}}/>}
                label="Edit"
                onClick={() => handleEdit(params.row)}
                showInMenu={false}
            />,
            <GridActionsCellItem
                icon={<DeleteIcon sx={{color: '#DC2626'}} />}
                label="Edit"
                onClick={() => handleDelete(params.row)}
                showInMenu={false}
            />
        ]}
    ];

    if(loading){
        <Box>
            Loading
        </Box>
    }

    return (
        <DataGrid
            sx={{width: '100%'}}
            rows={data}
            columns={columns}
            pageSizeOptions={[3]}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 3,
                        page: 0
                    }
                }
            }}
        ></DataGrid>
    )
}

export default EmployeeTable;