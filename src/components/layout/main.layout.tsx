import * as React from "react"
import { Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/auth.context";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { cn } from "@/lib/utils";
import OrganizationSwitcher from "../organization-switcher";
import { Separator } from "../ui/separator";
import { buttonVariants } from "../ui/button";
import { CircleHelp, Factory, Home, House, Layers2, ListCheck, LucideIcon, Package, Percent, Settings, ShoppingBasket, Sparkles } from "lucide-react";
import { AccountDropdownMenu } from "../account-dropdown";
import { Link } from "../ui/link";
import { SidebarLayout } from "../ui/sidebar-layout";
import { Navbar, NavbarSpacer } from "../ui/navbar";

import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from "../ui/sidebar";


const MainLayout = () => {
  const { pathname } = useLocation();
  const { authenticatedUser } = useAuthContext();

  const userInitials = useMemo(() => {
    return `${authenticatedUser?.firstName[0]}${authenticatedUser?.lastName[0]}`
  }, [authenticatedUser]);


  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const isLinkActive = React.useCallback((link: string) => {
    const parts = pathname.split("/");

    if (!link) return parts.length == 2;

    return parts[2] === link;
  }, [pathname])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <AccountDropdownMenu small anchor="top start" />
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <OrganizationSwitcher />
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                href=""
                current={pathname === '/x'}
                // className="sm:data-[slot=icon]:*:fill-none"
              >
                <House className="h-5 w-5" />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="activities"
                current={pathname.startsWith('/x/activities')}
                // className="sm:data-[slot=icon]:*:fill-none"
              >
                <Layers2 className="h-5 w-5" />
                <SidebarLabel>Activities</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="inventory"
                current={pathname.startsWith('/x/inventory')}
              >
                <Package className="h-5 w-5" />
                <SidebarLabel>Inventory</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="settings"
                current={pathname.startsWith('/x/settings')}
              >
                <Settings className="h-5 w-5" />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            {/* <SidebarSection className="max-lg:hidden">
              <SidebarHeading>
                <div className="flex items-center justify-between">
                  <span>YOUR ACTIVITIES</span>

                  <Button plain className="cursor-pointer" onClick={() => handleCreateActivity()}>
                    <PlusIcon />
                  </Button>
                </div>
              </SidebarHeading>
              {activities.map((activity) => (
                <SidebarItem key={activity.id} href={`activities/${activity.id}`}>
                  {activity.name}
                </SidebarItem>
              ))}
            </SidebarSection> */}

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <CircleHelp className="h-5 w-5" />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <Sparkles className="h-5 w-5" />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <AccountDropdownMenu anchor="top start" />
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Outlet/>
    </SidebarLayout>
  )
}

export default MainLayout;


interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost",
    href: string
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}


  // return (
  //   <SidebarLayout
  //     navbar={
  //       <Navbar>
  //         <NavbarSpacer />
  //         <NavbarSection>
  //           <Dropdown>
  //             <DropdownButton as={NavbarItem}>
  //               <Avatar square initials={userInitials} className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black" />
  //             </DropdownButton>
  //             <AccountDropdownMenu anchor="bottom end" />
  //           </Dropdown>
  //         </NavbarSection>
  //       </Navbar>
  //     }
  //     sidebar={
  //       <Sidebar>
  //         <SidebarHeader>
  //           <Dropdown>
  //             <DropdownButton as={SidebarItem}>
  //               <Avatar initials={`${organization?.name[0]}`} className="size-8 bg-zinc-900 text-white dark:bg-white dark:text-black" />
  //               <SidebarLabel>{organization?.name}</SidebarLabel>
  //               <ChevronDownIcon />
  //             </DropdownButton>
  //             <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
  //               <DropdownItem href="settings">
  //                 <Cog8ToothIcon />
  //                 <DropdownLabel>Settings</DropdownLabel>
  //               </DropdownItem>
  //               <DropdownDivider />
  //               {/* <DropdownItem href="#">
  //                 <Avatar slot="icon" src="/teams/catalyst.svg" />
  //                 <DropdownLabel>Catalyst</DropdownLabel>
  //               </DropdownItem>
  //               <DropdownItem href="#">
  //                 <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
  //                 <DropdownLabel>Big Events</DropdownLabel>
  //               </DropdownItem>
  //               <DropdownDivider /> */}
  //               <DropdownItem href="#">
  //                 <PlusIcon />
  //                 <DropdownLabel>New organization&hellip;</DropdownLabel>
  //               </DropdownItem>
  //             </DropdownMenu>
  //           </Dropdown>
  //         </SidebarHeader>

  //         <SidebarBody>
  //           <SidebarSection>
  //             <SidebarItem
  //               href=""
  //               current={pathname === '/'}
  //               className="sm:data-[slot=icon]:*:fill-none"
  //             >
  //               <HomeIcon />
  //               <SidebarLabel>Home</SidebarLabel>
  //             </SidebarItem>
  //             <SidebarItem
  //               href="activities"
  //               current={pathname.indexOf('activities') !== -1}
  //               className="sm:data-[slot=icon]:*:fill-none"
  //             >
  //               <Square2StackIcon />
  //               <SidebarLabel>Activities</SidebarLabel>
  //             </SidebarItem>
  //             <SidebarItem
  //               href="settings"
  //               current={pathname.indexOf('settings') !== -1}
  //               className="sm:data-[slot=icon]:*:fill-none"
  //             >
  //               <Cog6ToothIcon />
  //               <SidebarLabel>Settings</SidebarLabel>
  //             </SidebarItem>
  //           </SidebarSection>

  //           <SidebarSection className="max-lg:hidden">
  //             <SidebarHeading>
  //               <div className="flex items-center justify-between">
  //                 <span>YOUR ACTIVITIES</span>

  //                 <Button plain className="cursor-pointer" onClick={() => handleCreateActivity()}>
  //                   <PlusIcon />
  //                 </Button>
  //               </div>
  //             </SidebarHeading>
  //             {activities.map((activity) => (
  //               <SidebarItem key={activity.id} href={`activities/${activity.id}`}>
  //                 {activity.name}
  //               </SidebarItem>
  //             ))}
  //           </SidebarSection>

  //           <SidebarSpacer />

  //           <SidebarSection>
  //             <SidebarItem href="#" className="sm:data-[slot=icon]:*:fill-none">
  //               <QuestionMarkCircleIcon />
  //               <SidebarLabel>Support</SidebarLabel>
  //             </SidebarItem>
  //             <SidebarItem href="#" className="sm:data-[slot=icon]:*:fill-none">
  //               <SparklesIcon />
  //               <SidebarLabel>Changelog</SidebarLabel>
  //             </SidebarItem>
  //           </SidebarSection>
  //         </SidebarBody>

  //         <SidebarFooter className="max-lg:hidden">
  //           <Dropdown>
  //             <DropdownButton as={SidebarItem}>
  //               <span className="flex min-w-0 items-center gap-3">
  //                 <Avatar square initials={userInitials} className="size-10 bg-zinc-900 text-white dark:bg-white dark:text-black" alt="" />
  //                 <span className="min-w-0">
  //                   <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{`${authenticatedUser?.firstName} ${authenticatedUser?.lastName}`}</span>
  //                   <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
  //                     {authenticatedUser?.email}
  //                   </span>
  //                 </span>
  //               </span>
  //               <ChevronUpIcon />
  //             </DropdownButton>
  //             <AccountDropdownMenu anchor="top start" />
  //           </Dropdown>
  //         </SidebarFooter>
  //       </Sidebar>
  //     }
  //   >
  //     <Outlet />
  //   </SidebarLayout>
  // )