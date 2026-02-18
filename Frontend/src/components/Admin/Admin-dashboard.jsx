import { IoIosPeople } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { MdPendingActions } from "react-icons/md";
import { HiDocumentRemove } from "react-icons/hi";
import Admin_Navbar from "./Admin-Navbar";
import Admin_Sidebar from "./Admin-Sidebar";
import { useContext, useEffect } from "react";
import { userContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admin_dashboard = () => {
    const {verifyUser} = useContext(userContext);
    const navigate = useNavigate();

    let user = null;
    useEffect(() => {
        const getUser = async () => {
            user = await verifyUser();
            // console.log(user)
            if (!user?.success) {
                navigate("/login");
            }
        };
        getUser();
    }, []);
    return (
        <div className="">
            <Admin_Navbar />
            <div className="flex w-full h-screen">
                <div className="w-1/6 h-full">
                    <Admin_Sidebar />
                </div>
                <div className="w-5/6 h-full bg-amber-50">
                    <p className="font-bold text-xl m-5">Dashboard Overview</p>
                    <div className="m-5 flex justify-between gap-10">
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <IoIosPeople className="m-1 rounded-sm" size={35} />
                            <div>
                                <p className="text-lg">Total Employees</p>
                                <p className="font-bold">4</p>
                            </div>
                        </div>
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <FaRegBuilding className="m-1 rounded-sm" size={35} />
                            <div>
                                <p className="text-lg">Total Departments</p>
                                <p className="font-bold">3</p>
                            </div>
                        </div>
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <BsCashCoin className="m-1 rounded-sm" size={35} />
                            <div>
                                <p className="text-lg">Monthly Pay</p>
                                <p className="font-bold">$25000</p>
                            </div>
                        </div>
                    </div>
                    <p className="w-full text-center font-bold text-xl m-5 mt-10">Leave Details</p>
                    <div className="m-5 flex justify-between gap-10 flex-wrap">
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <IoDocumentText className="m-1 rounded-sm" size={35} />
                            <p className="text-lg">Leave Applied</p>
                            <p className="font-bold">2</p>
                        </div>
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <SiTicktick className="m-1 rounded-sm" size={35} />
                            <p className="text-lg">Leave Approved</p>
                            <p className="font-bold">2</p>
                        </div>
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <MdPendingActions className="m-1 rounded-sm" size={35} />
                            <p className="text-lg">leave Pending</p>
                            <p className="font-bold">1</p>
                        </div>
                        <div className="flex bg-white gap-3 items-center p-3 rounded-md w-72">
                            <HiDocumentRemove className="m-1 rounded-sm" size={35} />
                            <p className="text-lg">Leave Rejected</p>
                            <p className="font-bold">3</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Admin_dashboard