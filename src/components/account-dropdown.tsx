import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CaretUpIcon } from '@radix-ui/react-icons';
import { useAuthContext } from '@/contexts/auth.context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export function AccountDropdownMenu({
  anchor, className, small
}: { anchor: 'top start' | 'bottom end'; className?: string; small?: boolean }) {

  const [open, setOpen] = React.useState(false);

  const { authenticatedUser } = useAuthContext();
  const userInitials = React.useMemo(() => {
    return `${authenticatedUser?.firstName[0]}${authenticatedUser?.lastName[0]}`
  }, [authenticatedUser]);

  const fullName = React.useMemo(() => {
    return `${authenticatedUser?.firstName} ${authenticatedUser?.lastName}`;
  }, [authenticatedUser]);

  return (
    <div
      className={cn(
        "flex h-[52px] items-center justify-center",
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-auto w-full p-1 text-left">
            <div className="flex items-center justify-center w-full gap-2">
              <Avatar className="size-10">
                <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                <AvatarFallback className='bg-black text-white'>{userInitials}</AvatarFallback>
              </Avatar>
              { !small && (
                <>
                <span className="grow">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{fullName}</span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {authenticatedUser?.email}
                  </span>
                </span>
                <CaretUpIcon />
                </>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">shadcn</p>
              <p className="text-xs leading-none text-muted-foreground">
                {authenticatedUser.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
