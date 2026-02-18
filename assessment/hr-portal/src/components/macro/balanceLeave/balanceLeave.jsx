import { Box } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import leaveBalance from '../../../mock/leaveBalance.json';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import './balanceLeave.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function BalanceLeave(){
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
                leaveBalance.map((leave, index) => {
                    return (
                        <Doughnut
                            key={`chart-${index}`}
                            data={{
                                labels: ['Used', 'Remaining'],
                                datasets: [
                                    {
                                        data: [leave.used, leave.remaining],
                                        backgroundColor: ['#f0f3f5', '#f8338f']
                                    },
                                    {
                                        data: [leave.remaining, leave.used],
                                        backgroundColor: ['#f8338f', '#f0f3f5']
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