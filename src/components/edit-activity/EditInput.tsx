import { Field } from "@/components/common/Fieldset";
import { Input } from "@/components/common/Input";
import { cn } from "lib/utils";
import { EditKeyboardUsage } from "./EditKeyboardUsage";
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";

interface EditInputProps {
  type?: string;
  icon?: JSX.Element;
  className?: string;
  value: string;
  placeholder?: string;
  setValue: (newValue: string) => void;
  onEnter: () => void;
}
export const EditInput = ({
  type = "text",
  icon,
  className,
  value,
  placeholder,
  setValue,
  onEnter,
  ...props
}: EditInputProps) => {
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();

    if (e.shiftKey && e.key === 'Enter') {
      onEnter();

      e.currentTarget.blur();
      return
    }
  }

  const handleHover = (state: boolean) => {
    setOnHover(state);
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    setOnHover(false);
    setOnFocus(true);
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    setOnFocus(false);
    setOnHover(false);
  }

  return (
    <Field className={cn(
      "relative flex grow items-center border border-transparent rounded-none",
      onHover && !onFocus
        && 'bg-gray-200  data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
      onFocus && 'border-gray-200 border-none'
    )}>
      { icon }
      <Input
        type={type}
        wrapperClassName="border-none before:shadow-none before:rounded-none before:bg-transparent sm:after:focus-within:ring-0"
        className={cn(
          "border-none sm:pr-36 hover:bg-none before:bg-none",
          "border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0",
          "sm:pl-0",
          className,
        )}
        value={value}
        placeholder={placeholder || "Type here..."}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        {...props}
      />
      <EditKeyboardUsage
        onHover={onHover} onFocus={onFocus}
      />
    </Field>
  )
}
