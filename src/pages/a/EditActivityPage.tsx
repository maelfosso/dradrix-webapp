import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";
import { Description, Field, FieldGroup, Fieldset, Legend } from "components/common/Fieldset";
import { Heading } from "components/common/Heading"
import { Input } from "components/common/Input";
import { Strong } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { cn } from "utils/css";

interface ActivityField {
  type: string
  title: string
}

const EditActivityPage = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [fields, setFields] = useState<ActivityField[]>([]);

  useEffect(() => {
    console.log('Fields: ', fields);
  }, [fields])

  const handleAddItem = (position: number, type: string) => {
    setFields((oldFields) => [
      ...oldFields.slice(0, position),
      { type, title: `Field-${position}` },
      ...oldFields.slice(position)
    ])
  }

  const handleChangeTitle = (position: number, newTitle: string) => {
    const fieldAtPosition = fields[position];

    setFields((oldFields) => [
      ...oldFields.slice(0, position),
      { ...fieldAtPosition, title: newTitle },
      ...oldFields.slice(position + 1)
    ])
  }

  return (
    <>
      <Heading>Edit activity</Heading>
      <form  onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          <FieldGroup className="space-y-0">
            <EditInput
              value={title}
              setValue={(newValue) => setTitle(newValue)}
              className="sm:text-4xl" name="title" placeholder="Title"
            />
            <EditTextarea name="description" placeholder="Description" />
          </FieldGroup>
        </Fieldset>
        <Divider className="my-4" />
        <Fieldset>
          <Legend>Fields</Legend>
          <FieldGroup className="space-y-0">
            <AddItem key='add-item-0' place={'top'} position={0} onClick={(position, type) => handleAddItem(position, type)} />
            { fields.map((field, index) => (
              <>
                <ActivityField
                  key={`field-${index}`}
                  {...field}
                  onChangeTitle={(newTitle) => handleChangeTitle(index, newTitle)}
                />
                <AddItem
                  key={`add-item-${index + 1}`}
                  place={'bottom'}
                  position={index + 1}
                  onClick={(position, type) => handleAddItem(position, type)}
                />
              </>
            ))}
          </FieldGroup>
        </Fieldset>
      </form>
    </>
  )
}

export default EditActivityPage;

interface ActivityFieldProps {
  type: string,
  title: string,
  onChangeTitle: (newTitle: string) => void
}
const ActivityField = ({ type, title, onChangeTitle }: ActivityFieldProps) => {

  switch(type) {
    case 'text':
      return <ActivityFieldText title={title} setTitle={onChangeTitle} />

    default:
      return <></>
  }
}

interface ActivityFieldTextProps {
  title: string
  setTitle: (newValue: string) => void;
}
const ActivityFieldText = ({title, setTitle}: ActivityFieldTextProps) => {

  return (
    <EditInput
      value={title}
      setValue={setTitle}
      name="" placeholder="Enter the name of the field" />
  )
}

interface EditKeyboardUsageProps {
  onHover: boolean,
  onFocus: boolean
}
const EditKeyboardUsage = ({
  onHover,
  onFocus
}: EditKeyboardUsageProps) => {
  return (
    <div className={cn(
      "flex m-0 p-0 absolute right-0 top-0 bottom-0 flex-col items-center justify-center",
      onHover || onFocus ? 'flex' : 'hidden'
    )}>
      <Description
        className={cn(
          onHover && !onFocus
            ? 'block'
            : 'hidden'
        )}
      >Click to edit</Description>
      <Description
        className={cn(
          "flex-col items-start justify-center",
          !onHover && onFocus
            ? 'flex'
            : 'hidden'
        )}
      >
        <span><Strong>Shift+Enter</Strong> to save.</span>
        <span><Strong>Esc</Strong> to cancel.</span>
      </Description>
    </div>
  )
}

interface EditInputProps {
  className?: string;
  value: string;
  setValue: (newValue: string) => void;
  name: string;
  placeholder: string;
}
const EditInput = ({
  className,
  value,
  setValue,
  ...props
}: EditInputProps) => {
  // const [value, setValue] = useState<string>("");
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
    <Field className="relative">
      <Input
        wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0"
        className={cn(
          "sm:pr-36",
          onHover && !onFocus && "bg-gray-200",
          onFocus
          ? 'border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20'
          : 'border-none',
          className,
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
      <EditKeyboardUsage onHover={onHover} onFocus={onFocus} />
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
    <Field className="relative">
      <Textarea
        ref={ref}
        wrapperClassName="border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0"
        className={cn(
          "sm:pr-36 sm:text-xl",
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
      <EditKeyboardUsage onHover={onHover} onFocus={onFocus} />
    </Field>
  )
}

interface AddItemProps {
  place: 'top' | 'bottom',
  position: number;
  onClick: (position: number, type: string) => void;
}
const AddItem = ({
  place,
  position,
  onClick
}: AddItemProps) => {
  const handleClickOnType = (type: string) => {
    onClick(position, type);
  }

  const [visible, setVisible] = useState(false);
  return (
    <div
      className={cn(
        "-ml-10",
        place === 'top'
          ? "-mb-2"
          : "-mt-8"
      )}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        className={cn(
          "flex items-center",
          visible
            ? "visible"
            : "invisible"
        )}
      >
        <Dropdown>
          <DropdownButton aria-label="More options">
            <EllipsisHorizontalIcon />
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => handleClickOnType('text')}>Text</DropdownItem>
            <DropdownItem>Number</DropdownItem>
            <DropdownItem>Date</DropdownItem>
            <DropdownItem>Hour</DropdownItem>
            <DropdownItem>Multiple choices</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <hr className="bg-black w-full h-1" />
      </div>
    </div>
  )
}
