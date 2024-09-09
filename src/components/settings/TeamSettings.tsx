import { CheckCircleIcon, LinkIcon } from "@heroicons/react/24/outline";
import { BadgeButton } from "components/common/Badge";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Fieldset, Legend } from "components/common/Fieldset";
import { Subheading } from "components/common/Heading";
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import { Text } from "components/common/Text";
import { useState } from "react";
import { useParams } from "react-router-dom";

const team = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Bessie Richards',
    email: 'bessie.richards@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Black',
    email: 'floyd.black@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

const roles = [
  { name: "Owner", description: "" },
  { name: "Team member", description: "" },
  // { name: "Supervisor", description: "" },
  // { name: "Data clerk", description: "" },
  // { name: "Guest", description: "" }
]

const TeamSettings = () => {
  const { organizationId } = useParams();
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    const link = `${document.location.origin}/t/${organizationId}?invite-code=`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
  };

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
          {team.map((person) => (
            <li key={person.email} className="flex py-4">
              <img alt="" src={person.imageUrl} className="h-10 w-10 rounded-full" />
              <div className="ml-3 flex flex-col">
                <span className="text-sm font-medium text-gray-900">{person.name}</span>
                <span className="text-sm text-gray-500">{person.email}</span>
              </div>
              <div className="ml-auto">
                <Listbox
                  value={"Team member"}
                >
                  {roles.map((role) => (
                    <ListboxOption key={`member-role-${role.name}`} value={role.name}>
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
