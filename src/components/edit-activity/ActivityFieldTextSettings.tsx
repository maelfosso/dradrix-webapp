import { Fieldset } from "components/common/Fieldset"
import { Subheading } from "components/common/Heading"
import { EditTextarea } from "./EditTextarea"
import { useState } from "react"
import { ActivityFieldText } from "models/monitoring"
import { Text } from "components/common/Text"
import { Switch } from "components/common/Switch"


interface ActivityFieldTextSettingsProps {
  id: string;
  primaryKey: boolean;
  description: string;
  position: number;
  details: ActivityFieldText;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldTextSettings = ({
  primaryKey,
  description,
  position,
  onUpdate
}: ActivityFieldTextSettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description)

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

  return (
    <div className="mt-0">
      {/* <Subheading className="sm:text-lg/6">Text</Subheading>
      <Divider className="my-2" /> */}
      <Fieldset className="flex flex-col gap-y-4 mb-4">
        <section>
          <div>
            <Subheading>Description</Subheading>
            {/* <Text>Indicate the different choices that will be presented when entering the data</Text> */}
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
            <Text>Is it a primary key or an identifier?</Text>
          </div>
          <div className="ml-auto">
            <Switch
              aria-label="Primary Key"
              name="key"
              checked={primaryKey}
              onChange={(checked) => onUpdate('primaryKey', checked, position)}
            />
          </div>
        </section>
      </Fieldset>
    </div>
  )
}
