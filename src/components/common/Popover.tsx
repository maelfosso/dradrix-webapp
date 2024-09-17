import * as Headless from '@headlessui/react'
import { cn } from 'lib/utils'
import type React from 'react'
import { Button } from './Button'

export function Popover({ className, ...props}: { className?: string } & Headless.PopoverProps) {
  return <Headless.Popover className={cn('relative', className)} {...props} />
}

export function PopoverButton<T extends React.ElementType = typeof Button>({
  as = Button,
  ...props
}: { className?: string } & Omit<Headless.PopoverButtonProps<T>, 'className'>) {
  return <Headless.PopoverButton as={as} {...props} />
}

export function PopoverPanel({
  anchor = 'bottom',
  className,
  ...props
}: { className?: string } & Omit<Headless.PopoverPanelProps, 'className'>) {
  return (
    <Headless.Transition leave="duration-100 ease-in" leaveTo="opacity-0">
      <Headless.PopoverPanel
        transition
        {...props}
        anchor={anchor}
        className={cn(
          // Anchor positioning
          '[--anchor-gap:theme(spacing.2)] [--anchor-padding:theme(spacing.1)] data-[anchor~=start]:[--anchor-offset:-6px] data-[anchor~=end]:[--anchor-offset:6px] sm:data-[anchor~=start]:[--anchor-offset:-4px] sm:data-[anchor~=end]:[--anchor-offset:4px]',
          // Base styles
          'isolate w-max rounded-xl p-1',
          // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
          'outline outline-1 outline-transparent focus:outline-none',
          // Handle scrolling when menu won't fit in viewport
          'overflow-y-auto',
          // Popover background
          'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
          // Shadows
          'shadow-lg ring-1 ring-zinc-950/10 dark:ring-inset dark:ring-white/10',
          className,
        )}
      />
    </Headless.Transition>
  )
}
