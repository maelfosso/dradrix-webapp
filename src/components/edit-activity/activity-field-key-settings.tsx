import * as React from 'react';
import { useEffect, useState } from "react";
import { ActivityField, ActivityFieldReference } from "@/models/monitoring";
import { EditTextarea } from "./edit-textarea";
import { useMainContext } from "@/contexts/main.context";
import { Subheading } from '../ui/heading';
import { Text } from '../ui/text';
import { Fieldset } from '../ui/fieldset';

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
  const [fields, setFields] = useState<ActivityField[]>([]);

  const { activities } = useMainContext();

  useEffect(() => {
    const selectedActivity = activities.find((a) => a.id === details.activityId)
    if (!selectedActivity) return;

    setFields(selectedActivity.fields);

  }, [details.activityId]);

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

  const handleUpdateReference = (reference: string) => {
    const [activityId, fieldId] = reference.split("-");
    onUpdate(
      'details', {
        activityId,
        fieldId,
        fieldToUseId: fieldId
      },
      position
    )
  }

  const handleUpdateFieldToUse = (fieldId: string) => {
    onUpdate(
      'details', {
        ...details,
        fieldToUseId: fieldId
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
            {/* <Listbox
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
            </Listbox> */}
          </div>
        </section>

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Field to use</Subheading>
            <Text>Select the field to use</Text>
          </div>
          <div className="ml-auto w-full">
            {fields.length > 0 && (
              <></>
              // <Listbox
              //   placeholder="Select the activity/identifier"
              //   value={details.fieldToUseId}
              //   onChange={(newValue) => handleUpdateFieldToUse(newValue as string)}
              // >
              //   { fields.map((field) => (
              //       <ListboxOption key={`activity-${details.activityId}-field-${field.id}`} value={field.id}>
              //         <ListboxLabel>{ field.name }</ListboxLabel>
              //       </ListboxOption>
              //     ))}
              // </Listbox>
            )}
          </div>
        </section>

      </Fieldset>
    </div>
  )
}
