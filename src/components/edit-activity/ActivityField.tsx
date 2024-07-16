import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "components/common/Button";
import { ActivityFieldSettings } from "./ActivityFieldSettings";
import { ActivityFieldType } from "./ActivityFieldType";
import { EditInput } from "./EditInput";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { ActivityField as IActivityField } from "models/monitoring";
import { useActivityContext } from "contexts/ActivityContext";

interface ActivityFieldProps {
  field: IActivityField;
  position: number;
}
export const ActivityField = ({ field, position }: ActivityFieldProps) => {
  const { handleRemoveUpdate, handleSetUpdate } = useActivityContext();

  const { type, name, id, key } = field;
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
        className="flex"
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

        <div className="flex">
          <>
            <Button plain type="button" onClick={() => setIsOpen(true)}>
              <Cog6ToothIcon />
            </Button>
            <ActivityFieldSettings
              open={isOpen}
              onClose={setIsOpen}
              field={field}
              type={type}
              name={name}
              position={position}
              onUpdate={handleSetUpdate}
            />
          </>
          <Button plain onClick={() => handleRemoveUpdate(position)}><TrashIcon /></Button>
        </div>
      </div>
      )}
    </Draggable>
  )
}
