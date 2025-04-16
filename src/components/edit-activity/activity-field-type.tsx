import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CalendarDays, Clock, FileText, Hash, KeyRound, List, Upload } from 'lucide-react';

interface ActivityFieldTypeProps {
  primaryKey: boolean;
  type: string;
  position: number;
  onUpdate: (field: string, value: any, position: number) => void;
}
export const ActivityFieldType = ({ primaryKey, type, position, onUpdate: onUpdate }: ActivityFieldTypeProps) => {

  return (
    <div className="relative inline-block">
      <Select onValueChange={(value: string) => onUpdate('type', value, position)} defaultValue={type}>
        <SelectTrigger className='[&>svg]:hidden border-0 h-auto p-0 mr-2 cursor-pointer'>
          <SelectValue placeholder="Select the type to change it" className='focus:ring-0 bg-black'/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='text'><FileText className='h-4 w-4' /></SelectItem>
          <SelectItem value='number'><Hash className='h-4 w-4' /></SelectItem>
          <SelectItem value='date'><CalendarDays className='h-4 w-4' /></SelectItem>
          <SelectItem value='hour'><Clock className='h-4 w-4' /></SelectItem>
          <SelectItem value='multiple-choices'><List className='h-4 w-4' /></SelectItem>
          <SelectItem value='upload'><Upload className='h-4 w-4' /></SelectItem>
          <SelectItem value='key'><KeyRound className='h-4 w-4' /></SelectItem>
        </SelectContent>
      </Select>
      {primaryKey && (
        <KeyRound className="absolute right-0 bottom-0 w-2 h-2 fill-green-400 stroke-green-400"/>
      )}
    </div>
  )
}
