import * as React from 'react';
import { Heading, Subheading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Check, Clock, FileText, Hash, Image, List, Pencil, Plus, PlusIcon, Settings, Text, Trash, TrashIcon, Upload, X } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { zodResolver } from "@hookform/resolvers/zod"

const AddFamilyItemsPage = () => {
  const [fields, setFields] = React.useState([]);
  const [selectedField, setSelectedField] = React.useState(null);
  const [isAddingFeature, setIsAddingFeature] = React.useState(false);
  const [isAddingGroupOfFeatures, setIsAddingGroupOfFeatures] = React.useState(false);

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
      <Heading>Add a category of product</Heading>
      <Separator />
      <div className="grid grid-cols-2 gap-6">
        <Card className="">
          <CardHeader>
            <CardTitle className='text-base'>General information</CardTitle>
            {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle className='text-base'>Upload image for the collection</CardTitle>
            <CardDescription>Click to upload a file or drag and drop</CardDescription>
          </CardHeader>
          <CardContent>
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
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className={cn()}>
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h3 className="text-lg font-medium">Characteristics of items</h3>
              <p className="text-sm text-muted-foreground">
                What are the differents items that define an item, by group.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="md"
                onClick={() => setIsAddingGroupOfFeatures(true)}
                // variant="outline"
                // className="h-6 rounded-[6px] border bg-transparent px-2 text-xs text-foreground shadow-none hover:bg-muted dark:text-foreground"
              >
                Add a group of characteristics
              </Button>
            </div>
          </div>

          <Card className='w-1/2'>
            <CardHeader className="space-y-0 flex flex-row items-center">
              <div className="flex flex-col">
                <CardTitle className="text-base font-medium leading-none">Variants</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Ex: colors, size, etc...</CardDescription>
              </div>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="ml-auto rounded-full"
                      onClick={() => setIsAddingFeature(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add a characteristic</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={10}>
                    <p>Add a characteristic</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardHeader>
            <CardContent>
              <form className='flex flex-col gap-3'>
                <div>
                  <Label className='flex items-center justify-between mb-1'>
                    Description
                    <div className='flex gap-1'>
                      <Button variant='outline' className='h-6 w-6 p-1'>
                        <Pencil  className='h-4 w-4' />
                      </Button>
                      <Button variant='outline' className='h-6 w-6 p-1'>
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  </Label>
                  <Textarea></Textarea>
                </div>
                <div>
                  <Label className='flex items-center justify-between mb-1'>
                    Size
                    <div className='flex gap-1'>
                      <Button variant='outline' className='h-6 w-6 p-1'>
                        <Pencil  className='h-4 w-4' />
                      </Button>
                      <Button variant='outline' className='h-6 w-6 p-1'>
                        <Trash className='h-4 w-4' />
                      </Button>
                    </div>
                  </Label>
                  <Input />
                </div>
              </form>
            </CardContent>
          </Card>
          <Dialog open={isAddingFeature} onOpenChange={setIsAddingFeature}>
            <DialogContent className="gap-0 p-0 outline-none">
              <DialogHeader className="px-4 pb-4 pt-5">
                <DialogTitle>New Characteristic</DialogTitle>
                <DialogDescription>
                  Named a characteristic with its different options/values
                </DialogDescription>
              </DialogHeader>
              <AddCharacteristicForm />
              <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save property</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingGroupOfFeatures} onOpenChange={setIsAddingGroupOfFeatures}>
            <DialogContent className="gap-0 p-0 outline-none">
              <DialogHeader className="px-4 pb-4 pt-5">
                <DialogTitle>New Group of Characteristics</DialogTitle>
                {/* <DialogDescription>
                  Add a new propery to the group <strong>Variants</strong>
                </DialogDescription> */}
              </DialogHeader>
              <AddNewGroupOfCharacteristicsForm />
              <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save the group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className='flex flex-col gap-3 mt-6'>
            <Input type='text' placeholder='Images of the item' />
            <Input type='text' placeholder='Code of the item' />
            <Input type='text' placeholder='Name/Title of the item' />
            <Input type='text' placeholder='Quantity/Number of item available' />
            <Input type='text' placeholder='Price' />
            {fields.map((field, index) => <FamilyItemsFieldInput key={`new-family-items-fields-${index}`} field={field} />)}
            <AddFieldItem place='bottom' position={fields.length} onClick={(position, type) => handleAddField(position, type)}/>
          </div>
        </div>
        { selectedField && <motion.div
          initial={{opacity: 0, y: 700}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: "easeOut"}}
          className='flex flex-col relative col-start-2 gap-3 border rounded-lg p-4'
        >
          <Button variant='ghost' size='icon' 
            className='absolute top-4 right-4'
            onClick={() => handleCloseSettings()}
          >
            <X className='h-4 w-4' />
          </Button>
          <Subheading>Settings <span></span></Subheading>
          {/* <div
            className='flex flex-col'
          > */}
            <FamilyItemsFieldSettings field={selectedField} />
          {/* </div> */}
        </motion.div>}
      </div>
    </>
  );
}

const addNewGroupOfPropertiesFormSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const AddNewGroupOfCharacteristicsForm = () => {
  const form = useForm<z.infer<typeof addNewGroupOfPropertiesFormSchema>>({
    resolver: zodResolver(addNewGroupOfPropertiesFormSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  })

  const onSubmit = (values: z.infer<typeof addNewGroupOfPropertiesFormSchema>) => {
    console.log(values);
  }

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-4'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='title of the group' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Small description of the group' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

const typesOfProperty = {
  "text": {
    name: "Text",
  },
  "number": {
    name: "Number"
  },
  "single_choice": {
    name: "Single Choice"
  },
  "multiple_choice": {
    name: "Multiple Choice"
  }
}
const addCharacteristicFormSchema = z.object({
  name: z.string(),
  choices: z.array(z.string()),
})

const AddCharacteristicForm = () => {
  const form = useForm<z.infer<typeof addCharacteristicFormSchema>>({
    resolver: zodResolver(addCharacteristicFormSchema),
    defaultValues: {
      name: '',
      choices: []
    }
  })

  const onSubmit = (values: z.infer<typeof addCharacteristicFormSchema>) => {
    console.log(values);
  }

  const handleAddChoice = () => {
    form.setValue('choices', [...form.getValues('choices'), ''])
  }

  const handleUpdateChoice = (index: number, value: string) => {
    const updatedChoices = form.getValues('choices').map((choice, i) =>
      i === index ? value : choice
    );
    form.setValue('choices', updatedChoices);
  }

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = form.getValues('choices').filter((_, i) => i !== index);
    form.setValue('choices', updatedChoices);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='name of the property' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="choices"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex justify-between'>
                Choices/Options/Values

                <Button
                  size='sm' variant='outline' className='rounded-lg'
                  onClick={() => handleAddChoice()}
                >
                  <PlusIcon />
                </Button>
              </FormLabel>
              <FormControl>
                <>
                {field.value.map((choice, index) => ( 
                    <div className='flex gap-2'>
                      <Input className='flex-grow' value={choice} onChange={(event) => handleUpdateChoice(index, event.target.value)} />
                      <Button size='sm' variant='outline' onClick={() => handleDeleteChoice(index)}>
                        <TrashIcon />
                      </Button>
                    </div>
                ))}
                </>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
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

const FIMCSchema = z.object({

})
const FamilyItemsFieldMCSettings = ({ field }) => {
  const form = useForm({
    // resolver: zodResolver()
  });
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

  const [onHover, setOnHover] = React.useState(-1);

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 gap-y-2"
      >
        <FormField
          control={form.control}
          name='choices'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>List of choices</FormLabel>
              <FormControl>
                <div className='flex flex-col gap-2'>
                  { choices.map((choice, index) => (
                      <div
                        key={`fi-fied-mc-settings-${index}`}
                        onMouseEnter={() => setOnHover(index)}
                        onMouseLeave={() => setOnHover(-1)}
                        className={cn(
                          'flex relative'
                        )}
                      >
                        <div
                          className={cn(
                            'gap-1',
                            onHover == index ? 'flex items-center pr-2' : 'hidden'
                          )}
                        >
                          <Button variant='ghost' size='icon'><Pencil className='h-4 w-4' /></Button>
                          <Button variant='ghost' size='icon' onClick={() => handleDeleteChoice(index)}><Trash className='h-4 w-4' /></Button>
                        </div>
                        { choice }
                      </div>
                  ))}
                  {onAddingChoice && (
                    <div className='flex items-center gap-2'>
                      <Input type='text' placeholder='Name of the choice here' value={currentChoiceValue} onChange={(event) => setCurrentChoiceValue(event.target.value)} />
                      <Button variant='ghost' size='icon' onClick={handleSubmitNewChoice}><Check className="h-4 w-4" /></Button>
                      <Button variant='ghost' size='icon' onClick={handleCancelAddingChoice}><Trash className='h-4 w-4' /></Button>
                    </div>
                  )}
                  <Button
                    className='text-xs h-6'
                    onClick={handleAddChoice}
                    variant='default'
                    size='sm'
                    disabled={onAddingChoice}
                  >
                    <Plus className='h-4 w-4 mr-2' />
                    add a choice
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='selection-type'
          render={({ field }) => (
            <FormItem className='space-y-0'>
              <FormLabel>Selecting one or multiple choices?</FormLabel>
              <FormControl>
                  <RadioGroup
                    onValueChange={(value) => setSelectionType(value)}
                    defaultValue={selectionType}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='single-choice' id='single-choice' />
                      </FormControl>
                      <FormLabel className='font-normal'>Single choice</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='multiple-choices' id='multiple-choices' />
                      </FormControl>
                      <FormLabel className='font-normal'>Multiple choices</FormLabel>
                    </FormItem>
                  </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className='mt-auto flex justify-between'>
          <Button size='sm' variant='text' className='px-0'>Cancel</Button>
          <Button className='' size='sm'>Done</Button>
        </div>
      </form>
    </Form>
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

