import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
import { Button } from "./button"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

interface ToggleButtonsSingleProps {
	type: "single";
	value: string;
	onValueChange: (value: string) => void;
}

interface ToggleButtonsMultipleProps {
	type: "multiple";
	value: string[];
	onValueChange: (value: string[]) => void;
}

interface ToggleButtonsCommonProps {
	tabIndex?: number;
	values: string[];
	children?: (value: string) => React.ReactNode;
  className?: string;
}

type ToggleGroupRootElement = React.ElementRef<typeof ToggleGroup>;

type ToggleButtonsProps = (
	| ToggleButtonsSingleProps
	| ToggleButtonsMultipleProps
) &
	ToggleButtonsCommonProps;

const ToggleButtons = React.forwardRef<
	ToggleGroupRootElement,
	ToggleButtonsProps
>(({ children, tabIndex, values, ...props }, forwardedRef) => {
	const isActive = (value: string) =>
		props.type === "single"
			? props.value === value
			: props.value.includes(value);

	return (
		<ToggleGroupPrimitive.Root
			ref={forwardedRef}
			{...props}
			{...(tabIndex !== undefined && { tabIndex })}
			onValueChange={(value: any) => {
				if (value) {
					props.onValueChange(value);
				}
			}}
		>
			{values.map((value) => (
				<ToggleGroupPrimitive.Item asChild key={value} value={value}>
					<Button
						// highContrast
						variant={isActive(value)? "default" : "secondary"}
            className={cn(!isActive(value) && 'border')}
						style={{ fontWeight: 400 }}
						{...(tabIndex !== undefined && { tabIndex })}
					>
						{children ? children(value) : value}
					</Button>
				</ToggleGroupPrimitive.Item>
			))}
		</ToggleGroupPrimitive.Root>
	);
});

export { ToggleGroup, ToggleGroupItem, ToggleButtons }
