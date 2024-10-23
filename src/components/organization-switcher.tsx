import * as React from "react"
import {
  CaretDownIcon,
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useMainContext } from "@/contexts/main.context";
import { CogIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { useNavigate } from "react-router-dom"
import { Organization } from "@/models/onboarding"
// const groups = [
//   {
//     label: "Personal Account",
//     organizations: [
//       {
//         label: "Alicia Koch",
//         value: "personal",
//       },
//     ],
//   },
//   {
//     label: "Organizations",
//     organizations: [
//       {
//         label: "DDX Inc.",
//         value: "acme-inc",
//       },
//       {
//         label: "Monsters Inc.",
//         value: "monsters",
//       },
//     ],
//   },
// ]

// type Organization = (typeof groups)[number]["organizations"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface OrganizationSwitcherProps extends PopoverTriggerProps {}

const OrganizationSwitcher = ({
  className,
}: OrganizationSwitcherProps) => {
  const { organization } = useMainContext();

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false)
  const [showNewOrganizationDialog, setShowNewOrganizationDialog] = React.useState(false)
  const [selectedOrganization, setSelectedOrganization] = React.useState<Organization>(organization)

  return (
    <div
      className={cn(
        "flex h-[52px] items-center justify-center",
      )}
    >
      <Dialog open={showNewOrganizationDialog} onOpenChange={setShowNewOrganizationDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a organization"
              className={cn(
                "h-auto w-full p-1",
                "justify-between",
                className
              )}
            >
              <Avatar className="size-10">
                {/* <AvatarImage
                  // src={`https://avatar.vercel.sh/${selectedOrganization.value}.png`}
                  alt={organization?.name}
                  className="grayscale"
                /> */}
                <AvatarFallback className="bg-black text-white">{organization?.name[0]}</AvatarFallback>
              </Avatar>
              <span className="ml-2">{organization?.name}</span>
              <CaretDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-0 bg-yellow-400">
            <Command>
              {/* <CommandInput placeholder="Search organization..." /> */}
              <CommandList>
                <CommandEmpty>No organization found.</CommandEmpty>
                {/* {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.organizations.map((organization) => (
                      <CommandItem
                        key={organization.value}
                        onSelect={() => {
                          setSelectedOrganization(organization)
                          setOpen(false)
                        }}
                        className="text-sm"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${organization.value}.png`}
                            alt={organization.label}
                            className="grayscale"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {organization.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedOrganization.value === organization.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))} */}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false)
                        setShowNewOrganizationDialog(true)
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Create Organization
                    </CommandItem>
                  </DialogTrigger>
                  <CommandItem
                    onSelect={() => {
                      setSelectedOrganization(organization)
                      setOpen(false);
                      navigate('settings');
                    }}
                    className="text-sm"
                  >
                    <CogIcon className="mr-2 h-5 w-5" />
                    Settings
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create organization</DialogTitle>
            <DialogDescription>
              Add a new organization to manage products and customers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Organization name</Label>
                <Input id="name" placeholder="DDX Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Subscription plan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">
                      <span className="font-medium">Free</span> -{" "}
                      <span className="text-muted-foreground">
                        Trial for two weeks
                      </span>
                    </SelectItem>
                    <SelectItem value="pro">
                      <span className="font-medium">Pro</span> -{" "}
                      <span className="text-muted-foreground">
                        $9/month per user
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewOrganizationDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default OrganizationSwitcher;
