import * as React from 'react';
import { Heading, Subheading } from '@/components/ui/heading';
import { useMainContext } from '@/contexts/main.context';
import Spinner from '@/components/ui/spinner';
import { getTeam } from '@/api/team';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronDownIcon, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Member } from '@/models/onboarding';
import { cn } from '@/lib/utils';
import { User } from '@/models/auth';

export const ActivitySettingsPage = () => {

  const { organization } = useMainContext();

  const { isPending: isTeamPending, data: team } = useQuery({
    queryKey: ['organization', organization?.id ?? '' , 'team'],
    queryFn: async () => getTeam(organization?.id ?? '' )
  })

  if (isTeamPending) {
    return <Spinner />
  }

  return (
    <div className='grid grid-cols-2 flex-wrap gap-4'>
      {/* <Subheading>Settings</Subheading> */}
      {/* <div>
        can view
        can add, edit and delete (can not delete something validated)
        can validate
        administrator (can do everything) (can delete even something validated)
      </div>
      <div>
        everybody can left a comment
      </div>
      <div>
        number of validation required on each data (x2) implies the number of validators
      </div> */}
      <div className=''>
        <div className="flex flex-col justify-between gap-4 border rounded-lg p-2">
          <Subheading>Who can do what here?</Subheading>
          { team.members.map((member) => <ActivityMemberRole role={member.role} member={member.user} /> )}
        </div>
      </div>
      <div className=''>
        <div className='flex flex-col justify-between gap-4 border rounded-lg p-2'>
          <Subheading>Number of validation per data</Subheading>
          <div className="flex w-full items-center space-x-2">
            <Input type="type" className='flex-1' placeholder="Number of validation" />
            <Button type="submit">Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const roles = [
  { name: "Viewer", description: "Can view and comment."},
  { name: "Inputter", description: "Can view, add, delete and comment."},
  { name: "Validator", description: "Can validate and comment."},
  { name: "Administrator", description: "Admin-level access to all resources." }
]
const ActivityMemberRole = ({ role, member }: { member: User; role: string }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(role);

  console.log(role, roles.find((role) => role.name === value)?.name)
  return (
    <div className='flex w-full'>
      <div className="flex grow items-center space-x-4">
        <Avatar>
          <AvatarImage src="/avatars/02.png" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{ member.firstName } { member.lastName }</p>
          <p className="text-sm text-muted-foreground">{ member.phoneNumber }</p>
        </div>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            { value
                ? roles.find((role) => role.name === value)?.name
                : "Select role..."
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search role..." />
            <CommandList>
              <CommandEmpty>No role found.</CommandEmpty>
              <CommandGroup>
                {roles.map((role) => (
                  <CommandItem
                    key={role.name}
                    value={role.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                    className='teamaspace-y-1 flex items-start gap-2 px-4 py-2'
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === role.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className='flex flex-col'>
                      <p className='font-semibold'>{ role.name }</p>
                      <p className="text-sm text-muted-foreground">{ role.description }</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}