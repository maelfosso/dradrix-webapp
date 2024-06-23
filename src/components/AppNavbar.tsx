import { useAuthContext } from 'contexts/AuthContext';
import { Link } from './common/Link';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from './common/Navbar';

const AppNavbar = () => {
  const { currentUser } = useAuthContext();

  return (
    <Navbar className="px-4 lg:px-6 py-2.5">
      <Link to="/" aria-label="Home" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Tschwaa &nbsp; {currentUser?.preferences.onboardingStep}
        </span>
      </Link>
      <NavbarSpacer />
      { !currentUser && <NavbarSection>
        <NavbarItem href="/search" aria-label="Search">
          Log in
        </NavbarItem>
      </NavbarSection>}
    </Navbar>
  )
}

export default AppNavbar;
