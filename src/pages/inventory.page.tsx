import * as React from 'react';
import { Heading } from "@/components/ui/heading"
import { Button } from '@/components/ui/button';
import AddFamilyItems from '@/components/inventory/add-family-items';
import { PlusCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InventoryPage = () => {
  return (
    <>
      <div className="flex items-center">
        {/* <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1> */}
        <Heading>Inventory</Heading>
      </div>
      <InventoryNoFamilyItems />
      {/* <Button className="mt-4"><PlusCircleIcon className='mr-2 h-4 w-4' /> Add a family of  items</Button> */}
    </>
  )
}

export default InventoryPage;

const InventoryNoFamilyItems = () => {
  const navigate = useNavigate();

  const handleAddFamilyItems = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("add");
  }

  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no items
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start monitoring/selling as soon as you add a family of items.
        </p>
        {/* <AddFamilyItems /> */}
        <Button className="mt-4" onClick={handleAddFamilyItems}><PlusCircleIcon className='mr-2 h-4 w-4' /> Add a family of  items</Button>
      </div>
    </div>
  )
}


// -- Family of items: title of the family; description of the family of items; Items => id; name; quantity; images;