import * as React from 'react';
import { useAuthContext } from "@/contexts/auth.context";
import { Outlet } from "react-router-dom"
import { Link } from '../ui/link';
import { Navbar, NavbarSpacer } from '../ui/navbar';

const NotReadyUserLayout = () => {
  const { authenticatedUser } = useAuthContext();

  return (
    <>
      <Navbar className="px-4 lg:px-6 py-2.5">
        <Link to="/" aria-label="Home" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DaDriX
          </span>
        </Link>
        <NavbarSpacer />
      </Navbar>

      <Outlet />
    </>
  )
}

export default NotReadyUserLayout;
