import * as React from 'react';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Image, Loader2 } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Subheading } from '../ui/heading';
import { EditInput } from '../edit-activity/edit-input';
import { AddFieldItem } from '../edit-activity/add-field-item';

const AddFamilyItems = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button size='sm'>
          <PlusCircle className='h-4 w-4 mr-2' /> Add data
        </Button> */}
        <Button className="mt-4">Add a family of  items</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>New family of items</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="grid row-start-1 col-start-1 gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue="Gamer Gear Pro Controller"
            />
          </div>
          <div className="grid row-start-2 col-start-1 gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
              className="min-h-32"
            />
          </div>
          <div className='grid row-span-2 col-start-2 gap-3'>
            <Label htmlFor='image'>Image of the family of items</Label>
            <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
          <div className='grid row-start-3 col-span-2 gap-3'>
            <Subheading>Fields</Subheading>
            <div className='flex flex-col gap-3'>
              <Input type='text' placeholder='Images of the item' /> {/* option number of images to be upload - at least 1 by default */}
              <Input type='text' placeholder='Code of the item' />
              <Input type='text' placeholder='Name/Title of the item' />
              <Input type='text' placeholder='Quantity/Number of item available' />
              <Input type='text' placeholder='Price' /> {/* add a button to make it unavailable */}
              {/* <EditInput type='text' placeholder='Code of the item' /> */}
              <AddFieldItem place='bottom' position={5} onClick={(position, type) => console.log(position, type)}/>
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button
            disabled={isSubmitting}
            type="submit"
            onClick={() => {}}
          >
            { isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Done
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default AddFamilyItems;
