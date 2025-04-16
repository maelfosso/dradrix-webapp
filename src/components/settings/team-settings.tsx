import * as React from 'react';
import { CheckCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "@/api/team";
import { useMainContext } from "@/contexts/main.context";
import { useState } from "react";
import Spinner from "../ui/spinner";
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { Fieldset, Legend } from '../ui/fieldset';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Subheading } from '../ui/heading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { cn } from '@/lib/utils';
import { Member } from '@/models/onboarding';

const roles = [
  { name: "Owner", description: "" },
  { name: "Member", description: "" },
]

const TeamSettings = () => {
  const { organization } = useMainContext();
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

  const { isPending: isTeamPending, data: team } = useQuery({
    queryKey: ['organization', organization?.id ?? '' , 'team'],
    queryFn: async () => getTeam(organization?.id ?? '' )
  })


  const handleCopyLinkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const link = `${document.location.origin}/join/${organization?.invitationToken}`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
  };

  const handleSetRole = (member: Member, role: string) => {
    // event.preventDefault();
  }

  if (isTeamPending) {
    return <Spinner />
  }

  return (
    <form method="post" className="my-10 mt-6">
      <Fieldset>
        <section className="">
          <Text className="mt-3">Share this link with your team to give them access to your organization.</Text>
          <div className="mt-3 flex items-center gap-3 whitespace-nowrap">
            <div className="grow w-full">
              <Input
                type="url"
                name="url"
                value={`${document.location.origin}/join/${organization?.invitationToken}`}
                onChange={() => {}}
              />
            </div>
            <Button size='default' className="h-full" color={isLinkCopied ? 'green' : 'dark/white'} onClick={handleCopyLinkClick}>
              { isLinkCopied ? <CheckCircleIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" /> }
              &nbsp;
              Copy invitation Link
            </Button>
          </div>
          <div className="mt-3">
            <Button variant='text' className='p-0'>Reset your invite link</Button>
          </div>
        </section>
      </Fieldset>

      <Separator className="my-10" />

      <section>
        <Subheading className="">Members ({team?.members.length ?? 1})</Subheading>
        <div className='grid gap-4'>
          {team?.members.map((person) => (
            <div key={person.user.phoneNumber} className="flex items-center py-4 gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{person.user.firstName[0]}{person.user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {person.user.firstName} {person.user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {person.user.phoneNumber}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      {person.role}{" "}
                      <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="end">
                    <Command value={person.role} onChange={(value) => console.log(value.target)}>
                      <CommandInput placeholder="Assign role..." />
                      <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value='Guest' className={cn(
                            "teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100",
                            person.role === 'Guest' && 'bg-zinc-400'
                          )} onClick={() => handleSetRole(person, 'Guest')}>
                            <p className='font-semibold'>Guest</p>
                            <p className="text-sm text-muted-foreground">
                              No access to any resources except unless you are given. Partial access to some resources.
                            </p>
                          </CommandItem>
                          <CommandItem value='Developer' className={cn(
                            "teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100",
                            person.role === 'Member' && 'bg-zinc-400'
                          )} onClick={() => handleSetRole(person, 'Member')}>
                            <p className='font-semibold'>Member</p>
                            <p className="text-sm text-muted-foreground">
                              Access to all the resources but only as a viewer if not right given by the owner
                            </p>
                          </CommandItem>
                          <CommandItem value='Owner' className={cn(
                            "teamaspace-y-1 flex flex-col items-start px-4 py-2 hover:bg-gray-100",
                            person.role === 'Owner' && 'bg-zinc-400'
                          )} onClick={() => handleSetRole(person, 'Owner')}>
                            <p className='font-semibold'>Owner</p>
                            <p className="text-sm text-muted-foreground">
                              Admin-level access to all resources.
                            </p>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </section>
    </form>
  )
}

export default TeamSettings;
