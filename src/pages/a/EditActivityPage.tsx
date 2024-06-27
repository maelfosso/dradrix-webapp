import { Description, Field, FieldGroup, Fieldset } from "components/common/Fieldset";
import { Heading } from "components/common/Heading"
import { Input } from "components/common/Input";
import { Strong } from "components/common/Text";
import { ChangeEvent, FocusEvent, KeyboardEvent, useState } from "react";
import { cn } from "utils/css";

const EditInput = () => {
  const [value, setValue] = useState<string>("");
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault();

    if (e.key === 'Enter') {

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
        name="title"
        wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0"
        className={cn(
          "sm:text-4xl",
          onHover && !onFocus && "bg-gray-200",
          onFocus
            ? 'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20'
            : 'border-none'
        )}
        placeholder="Title"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
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
          <span><Strong>Enter</Strong> to save.</span>
          <span><Strong>Esc</Strong> to cancel.</span>
        </Description>
      </div>
    </Field>
  )
}

const EditActivityPage = () => {
  return (
    <>
      <Heading>Edit activity</Heading>
      <form  onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          {/* <Legend>Shipping details</Legend>
          <Text>Without this your odds of getting your order are low.</Text> */}
          <FieldGroup>
            <EditInput />
            {/* <Field>
            <Input name="description" />
              <Description>We currently only ship to North America.</Description>
            </Field> */}
          </FieldGroup>
        </Fieldset>
      </form>
    </>
  )
}

export default EditActivityPage;
