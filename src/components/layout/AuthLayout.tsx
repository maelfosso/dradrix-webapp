import { AuthContextProvider } from "contexts/AuthContext";
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <AuthContextProvider><Outlet /></AuthContextProvider>
  )
}

export default AuthLayout;
