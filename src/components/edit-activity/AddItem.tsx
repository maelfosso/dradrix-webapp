import { ArrowUpTrayIcon, CalendarDaysIcon, ClockIcon, DocumentTextIcon, HashtagIcon, KeyIcon, ListBulletIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/common/Dropdown";
import { useEffect, useState } from "react";

interface AddItemProps {
  place: 'top' | 'bottom',
  position: number;
  onClick: (position: number, type: string) => void;
}
export const AddItem = ({
  position,
  onClick
}: AddItemProps) => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(menuOpen);
  }, [menuOpen])

  const handleClickOnType = (type: string) => {
    onClick(position, type);
  }

  return (
    <div
      className="relative h-2 bg-transparent flex flex-col items-center justify-center cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(menuOpen || !visible)}
    >
      {visible && (
        <>
          <hr className="w-full h-0.5 bg-indigo-600"/>
          <div className="absolute top-0 -left-8 bottom-0 z-50 flex items-center justify-center">
            <Dropdown>
              {({ open }) => {
                useEffect(() => {
                  setMenuOpen(open);
                }, [open])

                return (
                  <>
                    <DropdownButton
                      aria-label="More options"
                      circle
                      className="bg-indigo-600 text-white cursor-pointer"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <PlusIcon />
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleClickOnType('text')}>
                        <DocumentTextIcon />
                        Text
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('number')}>
                        <HashtagIcon />
                        Number
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('date')}>
                        <CalendarDaysIcon />
                        Date
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('time')}>
                        <ClockIcon />
                        Hour
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('multiple-choices')}>
                        <ListBulletIcon />
                        Multiple choices
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('upload')}>
                        <ArrowUpTrayIcon />
                        Upload files/images
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('key')}>
                        <KeyIcon />
                        Activitiy Identifier
                      </DropdownItem>
                    </DropdownMenu>
                  </>
                )
              }}
            </Dropdown>
          </div>
        </>
      )}
    </div>
  )
}
