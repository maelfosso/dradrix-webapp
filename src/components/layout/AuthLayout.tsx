import { Link } from "@/components/common/Link"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/common/Navbar"
import { useAuthContext } from "@/contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {

  const { authenticatedUser } = useAuthContext();

  if (
    authenticatedUser && authenticatedUser.preferences.currentStatus === "registration-complete"
  ) {
    return <Navigate to={`/x`} />;
  }
  return (
    <>
      <Navbar className="px-4 lg:px-6 py-2.5">
        <Link to="/" aria-label="Home" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DaDriX
          </span>
        </Link>

        <NavbarSpacer />

        <NavbarSection>
          <NavbarItem href="/auth/sign-in" aria-label="Sign in">Sign in</NavbarItem>
        </NavbarSection>
      </Navbar>


    <div className="flex flex-col items-center justify-center h-[calc(100vh_-_60px)]">
      <Outlet />
    </div>
    </>
  )
}

export default AuthLayout;
