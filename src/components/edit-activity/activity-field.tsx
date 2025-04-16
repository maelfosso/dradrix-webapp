import * as React from 'react';
import { ActivityFieldType } from "./activity-field-type";
import { EditInput } from "./edit-input";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { ActivityField as IActivityField } from "@/models/monitoring";
import { useActivityContext } from "@/contexts/activity.context";
import { Button } from '../ui/button';
import { Settings, Trash } from 'lucide-react';
import { ActivityFieldSettings } from './activity-field-settings';

interface ActivityFieldProps {
  field: IActivityField;
  position: number;
}
export const ActivityField = ({ field, position }: ActivityFieldProps) => {
  const { handleRemoveUpdate, handleSetUpdate } = useActivityContext();

  const { type, name, id, primaryKey: key } = field;
  const [value, setValue] = useState<string>(name)
  const [onHover, setOnHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Draggable key={id} draggableId={id} index={position}>
      {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="flex items-center"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <EditInput
          className="grow-1"
          placeholder="Enter the name of the field"
          icon={<ActivityFieldType primaryKey={key} type={type} position={position} onUpdate={handleSetUpdate} />}
          value={value}
          setValue={setValue}
          onEnter={() => handleSetUpdate('name', value, position)}
        />

        <div className="flex gap-1">
          <ActivityFieldSettings
            open={isOpen}
            onClose={setIsOpen}
            field={field}
            type={type}
            name={name}
            position={position}
            onUpdate={handleSetUpdate}
          />
          <Button variant='ghost' size="icon" onClick={() => handleRemoveUpdate(position)}>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      </div>
      )}
    </Draggable>
  )
}
