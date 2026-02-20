import { Box, Skeleton } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import leaveBalance from '../../../mock/leaveBalance.json';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import './balanceLeave.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBalance } from "../../../store/thunks/leaveThunk";

ChartJS.register(ArcElement, Tooltip, Legend);

function BalanceLeave(){
    const { balance, loading } = useSelector(state => state.leave);
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);
    const [ myBalance, setMyBalance ] = useState([])

    useEffect(() => {
        dispatch(fetchBalance())
    }, [dispatch])

    useEffect(() => {
        console.log(balance);
        
        const tempBalance = balance.filter((leave) => {
            if(leave.employeeId == user.id){
                return leave;
            }
        })
        
        if(tempBalance){
            setMyBalance(tempBalance);
        }
    }, [balance])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
                marginTop: '0.5rem'
            }}
        >
            {
                myBalance.map((leave, index) => {
                    if(loading){
                        return <Skeleton
                            variant="circular"
                            width={250}
                            height={250}
                            animation='wave'
                        >
                        </Skeleton>
                    }
                    return (
                        <Doughnut
                            key={`chart-${index}`}
                            data={{
                                labels: ['Used', 'Remaining'],
                                datasets: [
                                    {
                                        data: [leave.used, leave.remaining],
                                        backgroundColor: ['#f0f3f5', '#f8a62c']
                                    },
                                    {
                                        data: [leave.used, leave.remaining],
                                        backgroundColor: ['#a9d3f5', '#f0f3f5']
                                    }
                                ]
                            }}
                        ></Doughnut>
                    )
                })
            }
        </Box>
    )
}

export default BalanceLeave;