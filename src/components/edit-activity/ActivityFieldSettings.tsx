import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from "components/common/Drawer";
import { ActivityFieldSettingsList } from "./ActivityFieldSettingsList";
import { Text } from "components/common/Text";
import { Subheading } from "components/common/Heading";
import { Divider } from "components/common/Divider";
import { Fieldset } from "components/common/Fieldset";
import { Input } from "components/common/Input";
import { Switch } from "components/common/Switch";
import { Button } from "components/common/Button";
import { ActivityField, ActivityFieldList } from "models/monitoring";

interface ActivityFieldSettingsProps {
  open: boolean;
  onClose: (value: boolean) => void;
  field: ActivityField;
  type: string;
  name: string;
  position: number;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldSettings = ({
  open,
  onClose,
  field,
  type,
  name,
  position,
  onUpdate
}: ActivityFieldSettingsProps) => {
  const { options, key } = field;
  console

  // const [defaultValue, setDefaultValue] = useState<string | null >(options.defaultValue)
  // const [reference, setReference] = useState<string | null>(options.reference);

  const handleUpdate = (field: string, value: any, position: number) => {
    onUpdate(field, value, position);
  }

  const renderActivityFieldDetails = () => {
    switch (type) {
      case "multiple-choice":
        return (
          <ActivityFieldSettingsList
            id={field.id}
            description={field.description}
            position={position}
            details={field.details as ActivityFieldList}
            onUpdate={onUpdate}
          />
        )

      default:
        return (<></>)
    }
  }
  return (
    <Drawer wide open={open} onClose={onClose}>
      <DrawerTitle onClose={() => onClose(false)}>
        Settings
        <Text>{ name }</Text>
      </DrawerTitle>
      <DrawerContent>
        <form onSubmit={() => {}} className="mx-auto max-w-4xl">
          { renderActivityFieldDetails() }
          
          <div className="mt-12">
            <Subheading className="sm:text-lg/6">Options</Subheading>
            <Divider className="my-2" />
            <Fieldset className="flex flex-col gap-y-4">
              <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <Subheading>References</Subheading>
                  <Text>Its value is the primary key from another activity. Kindly select the referencing activity.</Text>
                </div>
                <div>
                  <Input aria-label="Reference activity" name="reference" />
                </div>
              </section>

              <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <Subheading>Default value</Subheading>
                </div>
                <div>
                  <Input aria-label="Default value" name="defaultValue" />
                </div>
              </section>

              <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <Subheading>Multiple</Subheading>
                  <Text>Can have multiple values. They will be separated by ``;`</Text>
                </div>
                <div>
                  <Switch
                    aria-label="Multiple"
                    name="multiple"
                    checked={options.multiple}
                    onChange={(checked) => handleUpdate('options.multiple', checked, position )}
                  />
                </div>
              </section>

              <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <Subheading>Key</Subheading>
                  <Text>The primary key. The unique identifier.</Text>
                </div>
                <div>
                  <Switch aria-label="Key" name="key" checked={key}
                    onChange={(checked) => handleUpdate('key', checked, position )}
                  />
                  {/* <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" /> */}
                </div>
              </section>
            </Fieldset>
          </div>
        </form>
      </DrawerContent>
      <DrawerFooter>
        <Button color="dark/white" onClick={() => onClose(false)}>Done</Button>
      </DrawerFooter>
    </Drawer>
  )
}