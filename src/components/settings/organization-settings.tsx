import * as React from "react";
import { useMainContext } from "@/contexts/main.context"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Subheading } from "../ui/heading";
import { Text } from "../ui/text";
import { Separator } from "../ui/separator";

const OrganizationSettings = () => {
  const { organization } = useMainContext();

  return (
    <form method="post" className="my-10 mt-6">

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Organization Name</Subheading>
          <Text>This will be displayed on your public profile.</Text>
        </div>
        <div>
          <Input aria-label="Organization Name" name="name" value={organization?.name} />
        </div>
      </section>

      <Separator className="my-10" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Organization Bio</Subheading>
          <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
        </div>
        <div>
          <Textarea aria-label="Organization Bio" name="bio" value={organization?.bio} />
        </div>
      </section>

      <Separator className="my-10" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Organization Email</Subheading>
          <Text>This is how customers can contact you for support.</Text>
        </div>
        <div className="space-y-4">
          <Input type="email" aria-label="Organization Email" name="email" value={organization?.email} />
          <div className="flex items-center space-x-2">
            <Checkbox id="email_is_public" name="email_is_public" defaultChecked />
            <Label
              htmlFor="email_is_public"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show email on public profile
            </Label>
          </div>
        </div>
      </section>

      <Separator className="my-10" />

      <div className="flex justify-end gap-4">
        <Button type="reset" variant="ghost">Reset</Button>
        <Button type="submit" color="dark">Save changes</Button>
      </div>
    </form>
  )
}

export default OrganizationSettings;
