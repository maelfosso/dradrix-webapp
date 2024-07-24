import { Fieldset } from "components/common/Fieldset";
import { Subheading } from "components/common/Heading";
import { Text } from "components/common/Text";
import { useEffect, useState } from "react";
import { EditInput } from "./EditInput";
import { Button } from "components/common/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Switch } from "components/common/Switch";
import { ActivityFieldMultipleChoices } from "models/monitoring";
import { EditTextarea } from "./EditTextarea";

interface ActivityFieldMultipleChoicesSettingsProps {
  id: string;
  description: string;
  position: number;
  details: ActivityFieldMultipleChoices;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldMultipleChoicesSettings = ({
  id,
  description,
  position,
  details,
  onUpdate
}: ActivityFieldMultipleChoicesSettingsProps) => {
  const [descriptionValue, setDescription] = useState<string>(description)
  const [value, setValue] = useState<string>('');
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    if (details.choices) {
      setChoices(details.choices);
    }
  }, [details.choices])

  const handleAddChoice = () => {
    onUpdate(
      'details',
      {...details, choices: [...choices, value]},
      position
    );
    setValue('')
  }

  const handleUpdateChoices = () =>
    onUpdate('details', {...details, choices}, position);

  const handleRemoveChoice = (indexToRemove: number) => {
    const nextChoices = choices.filter((_, index) => index !== indexToRemove);
    onUpdate('details', {...details, choices: nextChoices}, position);
  }

  const handleLocalUpdateChoice = (newValue: string, index: number) => {
    const nextChoices = choices.map((c, i) => {
      if (i === index) {
        return newValue
      } else {
        return c;
      }
    });
    setChoices(nextChoices);
  }

  const handleUpdateDescription = () =>
    onUpdate('description', descriptionValue, position);

  return (
    <div className="mt-0">
      {/* <Subheading className="sm:text-lg/6">Multiple choices</Subheading>
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
        <section className="flex flex-col gap-x-8 gap-y-2">
          <div>
            <Subheading>Choices</Subheading>
            <Text>Indicate the different choices that will be presented when entering the data</Text>
          </div>
          <div>
            {choices.map((c, index) => (
              <div key={`field-${id}-choices-${index}`} className="flex w-full">
                <EditInput
                  value={c}
                  setValue={(newValue) => handleLocalUpdateChoice(newValue, index)}
                  onEnter={() => handleUpdateChoices()}
                />
                <Button plain onClick={() => handleRemoveChoice(index)}><TrashIcon /></Button>
              </div>
            ))}
            <div className="flex w-full">
              <EditInput
                value={value}
                setValue={setValue}
                onEnter={handleAddChoice}
                placeholder={`type the choice-${choices.length + 1} here`}
              />
              {/* <Button plain onClick={() => handleRemoveChoice()}><TrashIcon /></Button> */}
            </div>
          </div>
        </section>

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Multiple choice</Subheading>
            <Text>Can we select multiple choices?</Text>
          </div>
          <div className="ml-auto">
            <Switch
              aria-label="Multiple"
              name="multiple"
              checked={details.multiple}
              onChange={(checked) => onUpdate('details', {...details, multiple: checked}, position )}
            />
          </div>
        </section>
      </Fieldset>
    </div>
  )
}
