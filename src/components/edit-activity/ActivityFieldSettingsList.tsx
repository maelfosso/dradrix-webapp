import { Divider } from "components/common/Divider";
import { Fieldset } from "components/common/Fieldset";
import { Subheading } from "components/common/Heading";
import { Text } from "components/common/Text";
import { useState } from "react";
import { EditInput } from "./EditInput";
import { Button } from "components/common/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Switch } from "components/common/Switch";

export const ActivityFieldSettingsList = () => {
  const [value, setValue] = useState<string>('');
  const [choices, setChoices] = useState<string[]>([]);

  const handleAddChoice = () => {
    setChoices([...choices, value]);
    setValue('')
  }

  const handleUpdateChoice = (newValue: string, index: number) => {
    const nextChoices = choices.map((c, i) => {
      if (i === index) {
        return newValue
      } else {
        return c;
      }
    });
    setChoices(nextChoices);
  }

  const handleRemoveChoice = () => {

  }

  return (
    <div className="mt-0">
      <Subheading className="sm:text-lg/6">Multiple choices</Subheading>
      <Divider className="my-2" />
      <Fieldset className="flex flex-col gap-y-4 mb-4">
        <section className="flex flex-col gap-x-8 gap-y-2">
          <div>
            <Subheading>Choices</Subheading>
            <Text>Indicate the different choices that will be presented when entering the data</Text>
          </div>
          <div>
            {choices.map((c, index) => (
              <div key={`field-choice-${c}-${index}`} className="flex w-full">
                <EditInput
                  value={c}
                  setValue={(newValue) => handleUpdateChoice(newValue, index)}
                  onEnter={handleAddChoice}
                />
                <Button plain onClick={() => handleRemoveChoice()}><TrashIcon /></Button>
              </div>
            ))}
            <div className="flex w-full">
              <EditInput
                value={value}
                setValue={setValue}
                onEnter={handleAddChoice}
                placeholder={`enter choice-${choices.length}`}
              />
              <Button plain onClick={() => handleRemoveChoice()}><TrashIcon /></Button>
            </div>
          </div>
        </section>

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <Subheading>Multiple choice</Subheading>
            <Text>Can we select multiple choices?</Text>
          </div>
          <div>
            <Switch
              aria-label="Multiple"
              name="multiple"
              // checked={options.multiple}
              // onChange={(checked) => handleUpdate('options.multiple', checked, position )}
            />
          </div>
        </section>
      </Fieldset>
    </div>
  )
}
