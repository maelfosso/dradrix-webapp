import * as React from 'react';
import { useState } from "react";
import { ActivityFieldDate } from "@/models/monitoring";
import { EditTextarea } from "./edit-textarea";
import { Subheading } from "../ui/heading";
import { Fieldset } from '../ui/fieldset';

interface ActivityFieldDateSettingsProps {
  id: string;
  description: string;
  position: number;
  details: ActivityFieldDate;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldDateSettings = ({
  description,
  position,
  onUpdate
}: ActivityFieldDateSettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description)

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

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
      </Fieldset>
    </div>
  )
}
