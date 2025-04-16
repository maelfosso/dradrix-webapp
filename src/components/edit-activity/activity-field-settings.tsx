import * as React from 'react'
import { ActivityFieldMultipleChoicesSettings } from "./activity-field-mc-settings";
import { ActivityField, ActivityFieldReference, ActivityFieldMultipleChoices, ActivityFieldNumber, ActivityFieldUpload } from "@/models/monitoring";
import { ActivityFieldTextSettings } from "./activity-field-text-settings";
import { ActivityFieldNumberSettings } from "./activity-field-number-settings";
import { ActivityFieldDateSettings } from "./activity-field-date-settings";
import { ActivityFieldTimeSettings } from "./activity-field-time-settings";
import { ActivityFieldUploadSettings } from "./activity-field-upload-settings";
import { ActivityFieldKeySettings } from "./activity-field-key-settings";
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Settings } from 'lucide-react';

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
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant='outline'>Open</Button> */}
        <Button variant='ghost' size='icon'>
          <Settings className='h-4 w-4' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>{name}</SheetDescription>
        </SheetHeader>
        <div>
          <form onSubmit={() => {}} className="mx-auto max-w-4xl">
            { renderActivityFieldDetails(type) }
          </form>
        </div>
        <SheetFooter>
          <Button onClick={() => onClose(false)}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    // <Drawer wide open={open} onClose={onClose}>
    //   <DrawerTitle onClose={() => onClose(false)}>
    //     Settings
    //     <Text>{ name }</Text>
    //   </DrawerTitle>
    //   <DrawerContent>
    //     <form onSubmit={() => {}} className="mx-auto max-w-4xl">
    //       { renderActivityFieldDetails(type) }
    //     </form>
    //   </DrawerContent>
    //   <DrawerFooter>
    //     <Button onClick={() => onClose(false)}>Done</Button>
    //   </DrawerFooter>
    // </Drawer>
  )
}