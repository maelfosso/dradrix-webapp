import * as React from 'react';
// import { ArrowUpTrayIcon, CalendarDaysIcon, ClockIcon, DocumentTextIcon, HashtagIcon, KeyIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CalendarDays, Clock, FileText, Hash, KeyRound, List, Plus, Upload } from 'lucide-react';

interface AddItemProps {
  place: 'top' | 'bottom',
  position: number;
  onClick: (position: number, type: string) => void;
}
export const AddFieldItem = ({
  place,
  position,
  onClick,
}: AddItemProps) => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [buttonPosition, setButtonPosition] = useState<{left: number; top: number}>({ left: -40, top: 0})
  
  const isLast = React.useMemo(() => place === 'bottom', [ place ]);

  useEffect(() => {
    // if (isLast) return;
    setVisible(menuOpen);
  }, [menuOpen])

  const handleClickOnType = (type: string) => {
    onClick(position, type);
  }

  return (
    <div
      className={cn(
        !isLast && "h-2",
        "relative bg-transparent flex flex-col items-center justify-center cursor-pointer"
      )}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(menuOpen || !visible)}
    >
      { visible && !isLast && <hr className="w-full h-0.5 bg-zinc-950"/> }
      <DropdownMenu onOpenChange={(open) => setMenuOpen(open)}>
        <DropdownMenuTrigger
          asChild
          className='w-full'
        >
          {isLast 
            ? <Button className="w-full mt-2">Add a field</Button>
            : visible && <Button
                size='icon'
                className={`
                  bg-zinc-950 text-white cursor-pointer
                  rounded-full
                  h-10 w-10
                  absolute -left-10
                `}
              >
                <Plus className='h-4 w-4' />
              </Button>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleClickOnType('text')}>
            <FileText className='mr-2 h-4 w-4' />
            <span>Text</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('number')}>
            <Hash className='mr-2 h-4 w-4' />
            <span>Number</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('date')}>
            <CalendarDays className='mr-2 h-4 w-4' />
            <span>Date</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('time')}>
            <Clock className='mr-2 h-4 w-4' />
            <span>Hour</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('multiple-choices')}>
            <List className='mr-2 h-4 w-4' />
            <span>Multiple choices</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('upload')}>
            <Upload className='mr-2 h-4 w-4' />
            <span>Upload files/images</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClickOnType('key')}>
            <KeyRound className='mr-2 h-4 w-4' />
            <span>Activitiy Identifier</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

