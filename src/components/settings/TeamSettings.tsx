import { CheckCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "api/team";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Fieldset, Legend } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import Spinner from "components/common/Spinner";
import { Text } from "components/common/Text";
import { useMainContext } from "contexts/MainContext";
import { useState } from "react";

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

  if (isTeamPending) {
    return <Spinner />
  }

  return (
    <form method="post" className="my-10 mt-6">
      <Fieldset>
        <section className="">
          <Text className="mt-3">Share this link with your team to give them access to your organization.</Text>
          <div className="mt-3 flex max-w-lg items-center gap-3 whitespace-nowrap">
            <div className="grow w-full">
              <Input
                type="url"
                name="url"
                value={`${document.location.origin}/join/${organization?.invitationToken}`}
                onChange={() => {}}
              />
            </div>
            <Button className="h-full" color={isLinkCopied ? 'green' : 'dark/white'} onClick={handleCopyLinkClick}>
              { isLinkCopied ? <CheckCircleIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" /> }
              Copy invitation Link
            </Button>
          </div>
          <div className="mt-3">
            <Button text className="">Reset your invite link</Button>
          </div>
        </section>
      </Fieldset>

      <Divider className="my-10" soft />

      <Fieldset>
        <Legend className="mb-4 font-normal text-zinc-500 dark:text-zinc-400">Members ({team?.members.length ?? 1})</Legend>
        <ul role="list" className="divide-y divide-gray-200">
          {team?.members.map((person) => (
            <li key={person.user.phoneNumber} className="flex items-center py-4">
              {/* <img alt="" src={person.imageUrl} className="h-10 w-10 rounded-full" /> */}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                <span className="text-sm font-medium leading-none text-white">
                {`${person.user.firstName[0]}${person.user.lastName[0]}`}
                </span>
              </span>
              <div className="ml-3 flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {`${person.user.firstName} ${person.user.lastName}`}</span>
                <span className="text-sm text-gray-500">{person.user.phoneNumber}</span>
              </div>
              <div className="ml-auto">
                <Listbox
                  value={person.role.toLocaleLowerCase()}
                >
                  {roles.map((role) => (
                    <ListboxOption key={`member-role-${role.name}`} value={role.name.toLocaleLowerCase()}>
                      <ListboxLabel>{role.name}</ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
              </div>
            </li>
          ))}
        </ul>
      </Fieldset>
    </form>
  )
}

export default TeamSettings;
