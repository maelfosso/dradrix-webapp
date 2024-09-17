import { Fieldset } from "@/components/common/Fieldset";
import { Subheading } from "@/components/common/Heading";
import { Text } from "@/components/common/Text";
import { useState } from "react";
import { Switch } from "@/components/common/Switch";
import { ActivityFieldNumber } from "models/monitoring";
import { EditTextarea } from "./EditTextarea";

interface ActivityFieldNumberSettingsProps {
  id: string;
  primaryKey: boolean;
  description: string;
  position: number;
  details: ActivityFieldNumber;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldNumberSettings = ({
  primaryKey,
  description,
  position,
  onUpdate
}: ActivityFieldNumberSettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description)

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

  return (
    <div className="mt-0">
      {/* <Subheading className="sm:text-lg/6">Number</Subheading>
      <Divider className="my-2" /> */}
      <Fieldset className="flex flex-col gap-y-4 mb-4">
        <section>
          <div>
            <Subheading>Description</Subheading>
          </div>
          <div>
            <EditTextarea
              name="description"
              placeholder="Enter a description or a comment about this field if available"
              className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400"
              value={descriptionValue}
              setValue={(newValue) => setDescription(newValue)}
              onEnter={() => handleUpdateDescription()}
            />
          </div>
        </section>

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Key</Subheading>
            <Text>Is it a primary primaryKey or an identifier?</Text>
          </div>
          <div className="ml-auto">
            <Switch
              aria-label="Primary Key"
              name="primaryKey"
              checked={primaryKey}
              onChange={(checked) => onUpdate('primaryKey', checked, position)}
            />
          </div>
        </section>
      </Fieldset>
    </div>
  )
}
