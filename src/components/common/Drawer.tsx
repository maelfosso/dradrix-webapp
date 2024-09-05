import * as Headless from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from 'utils/css';
import { Heading } from './Heading';

export function Drawer({
  open,
  onClose,
  wide = false,
  className,
  children,
  // ...props
}: { open?: boolean; onClose(value: boolean): void; wide?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Headless.Dialog open={open} onClose={onClose} className={cn("relative z-10", className)}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Headless.DialogPanel
              transition
              className={cn(
                "pointer-events-auto w-screen transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700",
                wide ? 'max-w-2xl' : 'max-w-md'
              )}
            >
              <div className="flex h-full flex-col overflow-y-scroll divide-y divide-gray-200 bg-white shadow-xl">
                { children }
              </div>
            </Headless.DialogPanel>
          </div>
        </div>
      </div>
    </Headless.Dialog>
  )
}

export function DrawerTitle({
  onClose = () => {},
  children
}: {onClose?(): void; children: React.ReactNode}) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex items-start justify-between">
        <Heading className="text-base font-semibold leading-6 text-gray-900">{ children }</Heading>
        <div className="ml-3 flex h-7 items-center">
          <button
            type="button"
            onClick={() => onClose()}
            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute -inset-2.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function DrawerContent({
  children,
  className
}: {className?: string; children: React.ReactNode}) {
  return (
    <div className={cn("relative flex-1 py-4 px-4 sm:px-6", className)}>{children}</div>
  )
}

export function DrawerFooter({
  children
}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-shrink-0 justify-end px-4 py-4">
      { children }
    </div>
  )
}