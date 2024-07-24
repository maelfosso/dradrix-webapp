import { Drawer, DrawerContent, DrawerFooter, DrawerTitle } from "components/common/Drawer";
import { ActivityFieldMultipleChoicesSettings } from "./ActivityFieldMultipleChoicesSettings";
import { Text } from "components/common/Text";
import { Button } from "components/common/Button";
import { ActivityField, ActivityFieldReference, ActivityFieldMultipleChoices, ActivityFieldNumber, ActivityFieldUpload } from "models/monitoring";
import { ActivityFieldTextSettings } from "./ActivityFieldTextSettings";
import { ActivityFieldNumberSettings } from "./ActivityFieldNumberSettings";
import { ActivityFieldDateSettings } from "./ActivityFieldDateSettings";
import { ActivityFieldTimeSettings } from "./ActivityFieldTimeSettings";
import { ActivityFieldUploadSettings } from "./ActivityFieldUploadSettings";
import { ActivityFieldKeySettings } from "./ActivityFieldKeySettings";

interface ActivityFieldSettingsProps {
  open: boolean;
  onClose: (value: boolean) => void;
  field: ActivityField;
  type: string;
  name: string;
  position: number;
  onUpdate: (field: string, value: any, position?: number) => void;
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
  const { primaryKey, id, description, details } = field;

  const renderActivityFieldDetails = (type: string) => {
    switch (type) {
      case "number":
        return (
          <ActivityFieldNumberSettings
            id={id}
            primaryKey={primaryKey}
            description={description}
            position={position}
            details={details as ActivityFieldNumber}
            onUpdate={onUpdate}
          />
        )

      case "text":
        return (
          <ActivityFieldTextSettings
            id={id}
            primaryKey={primaryKey}
            description={description}
            position={position}
            details={details as ActivityFieldNumber}
            onUpdate={onUpdate}
          />
        )

      case "time":
        return (
          <ActivityFieldTimeSettings
            id={id}
            description={description}
            position={position}
            details={details as ActivityFieldNumber}
            onUpdate={onUpdate}
          />
        )

      case "date":
        return (
          <ActivityFieldDateSettings
            id={id}
            description={description}
            position={position}
            details={details as ActivityFieldNumber}
            onUpdate={onUpdate}
          />
        )

      case "upload":
        return (
          <ActivityFieldUploadSettings
            id={id}
            description={description}
            position={position}
            details={details as ActivityFieldUpload}
            onUpdate={onUpdate}
          />
        )

      case "multiple-choices":
        return (
          <ActivityFieldMultipleChoicesSettings
            id={field.id}
            description={field.description}
            position={position}
            details={field.details as ActivityFieldMultipleChoices}
            onUpdate={onUpdate}
          />
        )

      case "key":
        return (
          <ActivityFieldKeySettings
            id={field.id}
            description={field.description}
            position={position}
            details={field.details as ActivityFieldReference}
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
          { renderActivityFieldDetails(type) }
        </form>
      </DrawerContent>
      <DrawerFooter>
        <Button color="dark/white" onClick={() => onClose(false)}>Done</Button>
      </DrawerFooter>
    </Drawer>
  )
}