import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const AppContent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default AppContent;
