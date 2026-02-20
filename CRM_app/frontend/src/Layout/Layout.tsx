import NavBar from "../components/Layout/NavBar"
import SideBar from "../components/Layout/SideBar"
import { Outlet } from "react-router-dom"
import "../styles/Layout.css"

const Layout=() => {
    return (
        <div className="layout">
            <NavBar />
            <SideBar />
            <main className='outlet'>
                <Outlet/>
            </main>


        </div>
    )
}

export default Layout