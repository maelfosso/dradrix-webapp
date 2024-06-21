import { Outlet } from "react-router-dom"
import AppNavbar from "./AppNavbar"

const AppContent = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  )
}

export default AppContent;
