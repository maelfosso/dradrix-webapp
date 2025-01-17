import * as React from 'react';
import { useQuery } from "@tanstack/react-query";
import { getOrganizationFromInviteToken } from "@/api/organization";
import { Organization } from "@/models/onboarding";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Spinner from '../ui/spinner';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Navbar } from '../ui/navbar';

const JoinLayout = () => {
  const { invitationToken } = useParams() as { invitationToken: string };
  const [organization, setOrganization] = useState<Organization | null>(null)
  const { isPending, data } = useQuery({
    queryKey: ['join', 'organization', invitationToken],
    queryFn: async () => getOrganizationFromInviteToken(invitationToken),
    enabled: !!invitationToken
  })
  useEffect(() => {
    if (!data) return;
    setOrganization(data.organization);
  }, [data])
  
  if (isPending) {
    return <Spinner />
  }
  

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-col justify-center w-2/5">
        <Navbar className="px-4 lg:px-6 py-2.5">
          <Link to="/" aria-label="Home" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DaDriX
            </span>
          </Link>
        </Navbar>
        <main className="mx-auto w-full max-w-xl lg:w-96">
          <div className="flex flex-col items-center justify-center h-[calc(100vh_-_60px)] gap-10">
            <div>
              <Heading>Welcome to {organization?.name}</Heading>

              <Text>
                You've been invited to join {organization?.name} in DaDriX. <br />
                Create your account to get started.
              </Text>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
      <div className="relative hidden w-3/5 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default JoinLayout;
