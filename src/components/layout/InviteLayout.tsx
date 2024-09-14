import { useQuery } from "@tanstack/react-query";
import { getOrganizationFromInviteToken } from "api/organization";
import { Heading } from "components/common/Heading";
import { Navbar } from "components/common/Navbar";
import Spinner from "components/common/Spinner";
import { Text } from "components/common/Text";
import { Link, Outlet, useParams } from "react-router-dom";

const InviteLayout = () => {
  const { inviteToken } = useParams() as { inviteToken: string };

  const { isPending, data } = useQuery({
    queryKey: ['join', 'organization', inviteToken],
    queryFn: async () => getOrganizationFromInviteToken(inviteToken)
  })
  
  if (isPending) {
    return <Spinner />
  }
  
  const { organization } = data!;
  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-col justify-center w-1/3">
        <Navbar className="px-4 lg:px-6 py-2.5">
          <Link to="/" aria-label="Home" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DaDriX
            </span>
          </Link>
        </Navbar>
        <main className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Heading>Welcome to {organization.name}</Heading>

            <Text>
              You've been invited to join {organization.name} in DaDriX. <br />
              Create your account to get started.
            </Text>
          </div>
          <Outlet />
        </main>
      </div>
      <div className="relative hidden w-2/3 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default InviteLayout;
