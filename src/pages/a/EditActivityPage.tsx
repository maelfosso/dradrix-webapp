import { Description, Field, FieldGroup, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading"
import { Input } from "components/common/Input";
import { Strong } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "utils/css";

const EditActivityPage = () => {
  return (
    <>
      <Heading>Edit activity</Heading>
      <form  onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          {/* <Legend>Shipping details</Legend>
          <Text>Without this your odds of getting your order are low.</Text> */}

            <EditInput name="title" placeholder="Title" />
            <EditTextarea name="description" placeholder="Description" />
            {/* <Field>
            <Input name="description" />
              <Description>We currently only ship to North America.</Description>
            </Field> */}
        </Fieldset>
      </form>
    </>
  )
}

export default EditActivityPage;


interface EditInputProps {
  name: string;
  placeholder: string;
}
const EditInput = (props: EditInputProps) => {
  const [value, setValue] = useState<string>("");
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();

    if (e.shiftKey && e.key === 'Enter') {

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
    <Field>
      <Input
        wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0"
        className={cn(
          "sm:text-4xl",
          onHover && !onFocus && "bg-gray-200",
          onFocus
            ? 'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20'
            : 'border-none'
        )}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        {...props}
      />
      <div className={cn(
        "flex items-center justify-between",
        onHover || onFocus ? 'visible' : 'invisible'
      )}>
        <Description
          className={cn(
            onHover && !onFocus
              ? 'visible'
              : 'invisible'
          )}
        >Click to edit</Description>
        <Description
          className={cn(
            "space-x-4",
            !onHover && onFocus
              ? 'visible'
              : 'invisible'
          )}
        >
          <span><Strong>Shift+Enter</Strong> to save.</span>
          <span><Strong>Esc</Strong> to cancel.</span>
        </Description>
      </div>
    </Field>
  )
}

interface EditTextareaProps {
  name: string;
  placeholder: string;
}
const EditTextarea = (props: EditTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>("");
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  useAutosizeTextArea(ref.current, value);


  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // e.preventDefault();

    if (e.shiftKey && e.key === 'Enter') {

      e.currentTarget.blur();
      return
    }
  }

  const handleHover = (state: boolean) => {
    setOnHover(state);
  }

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setOnHover(false);
    setOnFocus(true);
  }

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setOnFocus(false);
    setOnHover(false);
  }

  return (
    <Field>
      <Textarea
        ref={ref}
        wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0"
        className={cn(
          "sm:text-xl",
          onHover && !onFocus && "bg-gray-200",
          onFocus
            ? 'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20'
            : 'border-none'
        )}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        {...props}
      />
      <div className={cn(
        "flex items-center justify-between",
        onHover || onFocus ? 'visible' : 'invisible'
      )}>
        <Description
          className={cn(
            onHover && !onFocus
              ? 'visible'
              : 'invisible'
          )}
        >Click to edit</Description>
        <Description
          className={cn(
            "space-x-4",
            !onHover && onFocus
              ? 'visible'
              : 'invisible'
          )}
        >
          <span><Strong>Shift+Enter</Strong> to save.</span>
          <span><Strong>Esc</Strong> to cancel.</span>
        </Description>
      </div>
    </Field>
  )
}
