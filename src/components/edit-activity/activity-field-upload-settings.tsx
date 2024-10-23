import * as React from 'react';
import { useEffect, useState } from "react";
import { EditTextarea } from "./edit-textarea";
import { ActivityFieldUpload } from "@/models/monitoring";
import { EditInput } from "./edit-input";
import { Subheading } from "../ui/heading";
import { Text } from '../ui/text';
import { Fieldset } from '../ui/fieldset';

const TYPE_OF_FILES = ['Image', 'PDF', 'Video', 'Audio'];

interface ActivityFieldUploadSettingsProps {
  id: string;
  description: string;
  position: number;
  details: ActivityFieldUpload;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldUploadSettings = ({
  description,
  position,
  details,
  onUpdate
}: ActivityFieldUploadSettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description)
  const [maxNumberOfItems, setMaxNumberOfItems] = useState<number>(details.maxNumberOfItems ?? 0)
  const [typeOfFiles, setTypeOfFiles] = useState<string[]>(details.typeOfFiles ?? [])

  useEffect(() => {
    onUpdate(
      "details",
      {...details, typeOfFiles},
      position
    );
  }, [typeOfFiles])

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

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Type of files</Subheading>
            <Text>Do you restrict the type of files to be uploaded?</Text>
          </div>
          <div className="ml-auto w-full">
            {/* <Listbox
              aria-label="Type of files"
              name="typeOfFiles"
              placeholder="What to upload?"
              value={typeOfFiles}
              onChange={(items) => setTypeOfFiles(items)}
              className="col-span-2"
              textInMultiple="Selected type of files"
              multiple
            >
              {TYPE_OF_FILES.map((type) => (
                <ListboxOption key={type} value={type}>
                  <ListboxLabel>{type}</ListboxLabel>
                </ListboxOption>
              ))}
            </Listbox> */}
          </div>
        </section>

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Maximum number of items</Subheading>
            <Text>Indicate the maximum number of items that can be uploaded</Text>
          </div>
          <div className="ml-auto">
            <EditInput
              type="number"
              value={maxNumberOfItems.toString()}
              setValue={(newValue) => setMaxNumberOfItems(parseInt(newValue))}
              onEnter={() => onUpdate("details", {...details, maxNumberOfItems }, position)}
            />
          </div>
        </section>
      </Fieldset>
    </div>
  )
}
