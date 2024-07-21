import { Fieldset } from "components/common/Fieldset";
import { Subheading } from "components/common/Heading";
import { useState } from "react";
import { ActivityFieldReference } from "models/monitoring";
import { EditTextarea } from "./EditTextarea";
import { Text } from "components/common/Text";
import { useMainContext } from "contexts/MainContext";
import { Listbox, ListboxDescription, ListboxLabel, ListboxOption } from "components/common/Listbox";

interface ActivityFieldKeySettingsProps {
  id: string;
  description: string;
  position: number;
  details: ActivityFieldReference;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldKeySettings = ({
  description,
  position,
  details,
  onUpdate
}: ActivityFieldKeySettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description);

  const { activities } = useMainContext();

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

  const handleUpdateReference = (reference: string) => {
    const [activityId, fieldId] = reference.split("-");
    onUpdate(
      'details', {
        activityId,
        fieldId
      },
      position
    )
  }

  return (
    <div className="mt-0">
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
            <Subheading>Activity</Subheading>
            <Text>Select the activity you are referencing</Text>
          </div>
          <div className="ml-auto w-full">
            <Listbox
              placeholder="Select the activity/identifier"
              value={`${details.activityId}-${details.fieldId}`}
              onChange={(newValue) => handleUpdateReference(newValue as string)}
            >
              { activities.map((activity) => activity.fields
                .filter((field) => field.primaryKey)
                .map((field) => (
                  <ListboxOption key={`activity-${activity.id}-key`} value={`${activity.id}-${field.id}`}>
                    <ListboxLabel>{ activity.name }</ListboxLabel>
                    <ListboxDescription>{ field.name }</ListboxDescription>
                  </ListboxOption>
                )))}
            </Listbox>
          </div>
        </section>

      </Fieldset>
    </div>
  )
}
