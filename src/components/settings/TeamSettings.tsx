import { CheckCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "api/team";
import { BadgeButton } from "components/common/Badge";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Fieldset, Legend } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import Spinner from "components/common/Spinner";
import { useState } from "react";
import { useParams } from "react-router-dom";

const roles = [
  { name: "Owner", description: "" },
  { name: "Team member", description: "" },
]

const TeamSettings = () => {
  const { organizationId = "" } = useParams();
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

  const { isPending, data: team } = useQuery({
    queryKey: [],
    queryFn: async () => getTeam(organizationId)
  })

  const handleCopyLink = () => {
    const link = `${document.location.origin}/t/${organizationId}?invite-code=`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
  };

  if (isPending) {
    return <Spinner />
  }

  return (
    <form method="post" className="my-10 mt-6">
      <Fieldset>
        <Legend className="mb-4 flex items-center gap-10 font-normal text-zinc-500 dark:text-zinc-400">
          Invite

          <BadgeButton color={isLinkCopied ? 'green' : 'zinc'} onClick={handleCopyLink}>
            { isLinkCopied ? <CheckCircleIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" /> }
            Copy invitation Link
          </BadgeButton>
        </Legend>
        <section className="flex">
          <div className="flex-grow">
            <Input
              id="add-team-members"
              name="add-team-members"
              type="text"
              placeholder="Phone number"
              aria-describedby="add-team-members-helper"
            />
          </div>
          <span className="ml-3">
            <Button color="dark/zinc">
              Send invite
            </Button>
          </span>
        </section>
      </Fieldset>

      <Divider className="my-10" soft />

      <Fieldset>
        <Legend className="mb-4 font-normal text-zinc-500 dark:text-zinc-400">Members (3)</Legend>
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
