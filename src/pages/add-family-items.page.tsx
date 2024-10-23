import * as React from 'react';
import { Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Check, Clock, Delete, FileText, Hash, Image, List, Pencil, Plus, Settings, Text, Trash, Upload, X } from "lucide-react";
import { AddFieldItem } from '@/components/edit-activity/add-field-item';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';
import { usePathUtils } from '@/lib/path';
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ToggleButtons, ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { DotsVerticalIcon } from '@radix-ui/react-icons';


const AddFamilyItemsPage = () => {
  const [fields, setFields] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState(null);

  const { findParameter, removeParameter } = usePathUtils();
  React.useEffect(() => {
    const fieldToSettings = Number(findParameter("settings"));

    if (fieldToSettings) {
      setSelectedField(fields[fieldToSettings - 1]);
    } else {
      setSelectedField(null);
    }
  }, [findParameter])


  const handleAddField = (position: number, type: string) => {
    setFields([
      ...fields,
      { type, position: position + 1 }
    ]);
  }

  const handleCloseSettings = () => {
    removeParameter('settings');
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid row-start-1 gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            className="w-full"
            defaultValue="Gamer Gear Pro Controller"
          />
        </div>
        <div className="grid row-start-2 gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            className="min-h-32"
          />
        </div>
        <div className='flex flex-col row-span-2 gap-3'>
          <Label htmlFor='image'>Image of the family of items</Label>
          <div className="h-full flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <Image aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 text-sm leading-6 text-gray-600">
                  <Label
                    htmlFor="image-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Click to upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </Label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
        </div>
        <div className={cn(
          'grid col-start-1 gap-3 border rounded-lg p-4',
          selectedField ? 'col-start-1' : 'col-span-2'
        )}>
          <Subheading>What define your item?</Subheading>
          <div className='flex flex-col gap-3'>
            <Input type='text' placeholder='Images of the item' /> {/* option number of images to be upload - at least 1 by default */}
            <Input type='text' placeholder='Code of the item' />
            <Input type='text' placeholder='Name/Title of the item' />
            <Input type='text' placeholder='Quantity/Number of item available' />
            <Input type='text' placeholder='Price' /> {/* add a button to make it unavailable */}
            {/* <EditInput type='text' placeholder='Code of the item' /> */}
            {fields.map((field, index) => <FamilyItemsFieldInput key={`new-family-items-fields-${index}`} field={field} />)}
            <AddFieldItem place='bottom' position={fields.length} onClick={(position, type) => handleAddField(position, type)}/>
          </div>
        </div>
        { selectedField && <motion.div
          initial={{opacity: 0, y: 700}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: "easeOut"}}
          className='col-start-2 gap-3 border rounded-lg p-4'
        >
          <Button variant='ghost' size='icon' className='float-right' onClick={() => handleCloseSettings()}>
            <X className='h-4 w-4' />
          </Button>
          <Subheading>Settings <span></span></Subheading>
          <div
            className='flex flex-col'
          >
            <FamilyItemsFieldSettings field={selectedField} />
          </div>
        </motion.div>}
      </div>
    </>
  );
}

export default AddFamilyItemsPage;

const types = [
  {
    label: 'Text',
    value: 'text',
    icon: Text,
  },
  {
    label: 'Number',
    value: 'number',
    icon: Hash,
  },
  {
    label: 'Date',
    value: 'date',
    icon: CalendarDays,
  },
  {
    label: 'Time',
    value: 'time',
    icon: Clock,
  }
]
const FamilyItemsFieldInput = ({ field }) => {
  const { addParameters, findParameter, removeParameter } = usePathUtils();
  // const [onInput, setOnInput] = React.useState(false);
  const [onSettings, setOnSettings] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [name, setName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState(field.type);
  const [visible, setVisible] = React.useState(false);

  const handleOpenSettings = (position: number) => {
    if (!findParameter('settings')) {
      addParameters({ 'settings': position.toString() });
      setOnSettings(true);
    } else {
      removeParameter('settings');
      setOnSettings(false);
    }
  }

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!updated) setUpdated(true);
    setName(event.target.value);
  }

  const handleInputUpdated = (event: React.MouseEvent<HTMLButtonElement>) => {

  }

  const handleDeleteField = (field) => {

  }

  return (
    <div className='flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <ItemsFieldIcon type={selectedType} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change type..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {types.map((type) => (
                  <CommandItem
                    key={type.value}
                    value={type.value}
                    onSelect={(value) => {
                      setSelectedType(
                        types.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    <type.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        type.value === selectedType
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{type.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input
        className='border-none'
        placeholder='Name of the property'
        value={name}
        onFocus={() => setVisible(true)}
        onChange={handleInputChanged}
      />
      <div className={cn(
        'flex items-center gap-1',
        !visible && 'hidden'
      )}>
        <Button variant='ghost' size='icon' onClick={() => setVisible(false)}>
          <X className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='icon' disabled={!updated} onClick={handleInputUpdated}>
          <Check className='h-4 w-4' />
        </Button>
        <Button variant='ghost' size='icon' onClick={() => handleOpenSettings(field.position)}>
          <Settings className={cn(
            'h-4 w-4',
            onSettings && '!stroke-2'
          )} />
        </Button>
        <Button variant='ghost' size='icon' onClick={() => handleDeleteField(field)}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

const ItemsFieldIcon = ({ type }) => {
  switch(type) {
    case 'multiple-choices': 
      return <List className='h-4 w-4' />
    case 'upload':
      return <Upload className='h-4 w-4' />
    case 'number':
      return <Hash className='h-4 w-4' />
    case 'date':
      return <CalendarDays className='h-4 w-4' />
    case 'time':
      return <Clock className='h-4 w-4' />
    case 'text':
      return <FileText className='h-4 w-4' />
  }
}

const FamilyItemsFieldSettings = ({ field }) => {
  switch (field.type) {
    case 'multiple-choices': 
      return <FamilyItemsFieldMCSettings field={field} />
    case 'upload':
      return <FamilyItemsFieldUploadSettings field={field} />
    case 'number':
      return <FamilyItemsFieldNumberSettings field={field} />
    case 'date':
      return <FamilyItemsFieldDateSettings field={field} />
    case 'time':
      return <FamilyItemsFieldTimeSettings field={field} />
  }  
}

const FamilyItemsFieldMCSettings = ({ field }) => {
  const [choices, setChoices] = React.useState([]);
  const [selectionType, setSelectionType] = React.useState('single');
  const [onAddingChoice, setOnAddingChoice] = React.useState(false);
  const [currentChoiceValue, setCurrentChoiceValue] = React.useState('');

  const handleAddChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOnAddingChoice(true);
  }

  const handleSubmitNewChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setChoices([
      ...choices,
      currentChoiceValue,
    ]);
    setOnAddingChoice(false);
    setCurrentChoiceValue('')
  }

  const handleCancelAddingChoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentChoiceValue('');
    setOnAddingChoice(false);
  }

  const handleUpdateChoice = (event: React.ChangeEvent<HTMLInputElement>, position: number) => {
    event.preventDefault();
  }

  const handleDeleteChoice = (position: number) => {}

  return (
    <>
    <div className='flex flex-col gap-1'>
      <Label>Choices</Label>
      <div className='grid auto-cols-fr grid-cols-3 gap-1'>
        { choices.map((choice, index) => (
          <div key={`fi-fied-mc-settings-${index}`} className='flex items-center justify-center border p-4 rounded-lg relative [&>*:first-child]:hidden [&>*:first-child]:hover:flex'> {/*  [&>*:first-child]:hidden [&>*:first-child]:hover:flex */}
            <div className='flex gap-1 absolute right-0 top-0'>
              <Button variant='ghost' size='icon'><Pencil className='h-4 w-4' /></Button>
              <Button variant='ghost' size='icon' onClick={() => handleDeleteChoice(index)}><Trash className='h-4 w-4' /></Button>
            </div>
            <div className='text-center'>{ choice }</div>
          </div>
        ))}
        <Button className='h-auto flex items-center justify-center border p-4 rounded-lg relative' onClick={handleAddChoice} variant='default' size='sm' disabled={onAddingChoice}><Plus className='h-4 w-4 mr-2' /> add a choice</Button> 
      </div>
      {onAddingChoice && (
        <div className='flex items-center gap-2'>
          <Input type='text' placeholder='Name of the choice here' value={currentChoiceValue} onChange={(event) => setCurrentChoiceValue(event.target.value)} />
          <Button variant='ghost' size='icon' onClick={handleSubmitNewChoice}><Check className="h-4 w-4" /></Button>
          <Button variant='ghost' size='icon' onClick={handleCancelAddingChoice}><Trash className='h-4 w-4' /></Button>
        </div>
      )}
    </div>
    <div>
      <Label>Selecting one or multiple choices</Label>
      <ToggleButtons
        type='single'
        value={selectionType}
        onValueChange={(value) => setSelectionType(value)}
        values={['One choice', 'Many choices']}
        className="flex gap-1"
      />
    </div>
    <div>
      Number maximum of selection
    </div>
    <div>
      How to display them?
      - List of selection
      - Group buttons
      - Table
    </div>
    </>
  )
}

const FamilyItemsFieldUploadSettings = ({ field }) => {
  return (
    <>
    <div>
      <Label>Type of file to upload</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Files</SelectLabel>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label>Maximum number of items to upload</Label>
      <Input type='number' defaultValue={0} />
    </div>
    </>
  )
}

const FamilyItemsFieldNumberSettings = ({ field }) => {
  return (
    <>
      <div>
        <Label>Higher than</Label>
        <Input type='number' placeholder='-1 for -infinity' />
      </div>
      <div>
        <Label>Lower than</Label>
        <Input type='number' placeholder='-1 for infinity' />
      </div>
    </>
  )
}

const FamilyItemsFieldDateSettings = ({ field }) => {
  return (
    <>
      <div>
        <Label>Higher than</Label>
        <Input type='number' placeholder='-1 for -infinity' />
      </div>
      <div>
        <Label>Lower than</Label>
        <Input type='number' placeholder='-1 for infinity' />
      </div>
    </>
  )
}

const FamilyItemsFieldTimeSettings = ({ field }) => {
  return (
    <>
      <div>
        <Label>Higher than</Label>
        <Input type='time' placeholder='-1 for -infinity' />
      </div>
      <div>
        <Label>Lower than</Label>
        <Input type='time' placeholder='-1 for infinity' />
      </div>
    </>
  )
}

