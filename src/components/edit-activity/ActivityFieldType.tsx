import { ArrowUpTrayIcon, CalendarDaysIcon, ClockIcon, DocumentTextIcon, HashtagIcon, KeyIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { Listbox, ListboxOption } from "components/common/Listbox";

interface ActivityFieldTypeProps {
  primaryKey: boolean;
  type: string;
  position: number;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldType = ({ primaryKey, type, position, onUpdate: onUpdate }: ActivityFieldTypeProps) => {

  return (
    <div className="relative inline-block">
      <Listbox showIndicator={false} name="type" value={type} onChange={(newValue) => onUpdate('type', newValue, position)}
        className="!w-auto p-0 m-0 min-h-0 before:shadow-none"
        selectedOptionClassName="sm:min-h-fit sm:!p-0 sm:!mr-1 sm:border-none"
      >
        <ListboxOption value="text">
          <DocumentTextIcon />
        </ListboxOption>
        <ListboxOption value="number">
          <HashtagIcon />
        </ListboxOption>
        <ListboxOption value="date">
          <CalendarDaysIcon />
        </ListboxOption>
        <ListboxOption value="time">
          <ClockIcon />
        </ListboxOption>
        <ListboxOption value="multiple-choices">
          <ListBulletIcon />
        </ListboxOption>
        <ListboxOption value="upload">
          <ArrowUpTrayIcon />
        </ListboxOption>
        <ListboxOption value="key">
          <KeyIcon />
        </ListboxOption>
      </Listbox>
      {primaryKey && (
        <KeyIcon className="absolute right-0 bottom-0 w-2 h-2 fill-green-400 stroke-green-400"/>
      )}
    </div>
  )
}
