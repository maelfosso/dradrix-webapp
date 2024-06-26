import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarLayout } from "../common/SidebarLayout";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "../common/Navbar";
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../common/Dropdown";
import { Avatar } from "../common/Avatar";
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarHeading, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from "../common/Sidebar";
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon, Cog8ToothIcon, HomeIcon, LightBulbIcon, PlusIcon, QuestionMarkCircleIcon, ShieldCheckIcon, SparklesIcon, Square2StackIcon, TicketIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useAuthContext } from "contexts/AuthContext";
import { useMemo } from "react";
import { Button } from "components/common/Button";

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

const MainLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { authenticatedUser } = useAuthContext();
  const userInitials = useMemo(() => {
    return `${authenticatedUser?.firstName[0]}${authenticatedUser?.lastName[0]}`
  }, [authenticatedUser]);

  const handleCreateActivity = () => {
    const activityId = '67b6e3e7632b38b71ef0c419';
    navigate(`a/${activityId}/edit`)
  }

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar square initials={userInitials} className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black" />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar initials={`${authenticatedUser?.preferences.organization.name[0]}`} className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black" />
                <SidebarLabel>{authenticatedUser?.preferences.organization.name}</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                {/* <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider /> */}
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New organization&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/activities" current={pathname.startsWith('/activities')}>
                <Square2StackIcon />
                <SidebarLabel>Activities</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>
                <div className="flex items-center justify-between">
                  <span>YOUR ACTIVITIES</span>

                  <Button plain className="cursor-pointer" onClick={() => handleCreateActivity()}>
                    <PlusIcon />
                  </Button>
                </div>
              </SidebarHeading>
              {/* {activities.map((activity) => (
                <SidebarItem key={activity.id} href={activity.url}>
                  {activity.name}
                </SidebarItem>
              ))} */}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar square initials={userInitials} className="size-10 bg-zinc-900 text-white dark:bg-white dark:text-black" alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{`${authenticatedUser?.firstName} ${authenticatedUser?.lastName}`}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {authenticatedUser?.email}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  )
}

export default MainLayout;
