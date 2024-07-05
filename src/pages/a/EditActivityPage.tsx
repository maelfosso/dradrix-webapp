import { CalendarDaysIcon, ClockIcon, Cog6ToothIcon, DocumentTextIcon, HashtagIcon, ListBulletIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getActivity, updateActivityMutation } from "api/activities";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";
import { Description, Field, FieldGroup, Fieldset, Legend } from "components/common/Fieldset";
import { Heading } from "components/common/Heading"
import { Input } from "components/common/Input";
import Spinner from "components/common/Spinner";
import { Strong } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { ActivityField } from "models/monitoring";
import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "utils/css";

const DEFAULT_ACTIVITY_FIELD_VALUE: ActivityField = {
  id: false,
  code: '',
  name: '',
  description: '',
  type: 'text'
}
const EditActivityPage = () => {
  let { organizationId, activityId } = useParams();


  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [fields, setFields] = useState<ActivityField[]>([]);

  const {isPending, data} = useQuery(getActivity(organizationId!, activityId!));
  useEffect(() => {
    if (data?.activity) {
      setName(data.activity.name)
      setDescription(data.activity.description)
      setFields(data.activity.fields)
    }
  }, [data?.activity]);
  const {mutateAsync: mutateUpdateActivity} = useMutation(
    updateActivityMutation(
      organizationId!,
      activityId!
    )
  );

  const handleSetUpdate = async (field: string, value: any, position?: number) => {
    try {
      const data = await mutateUpdateActivity({
        op: 'set',
        field: position ? `fields.${position}.${field}` : field,
        value: value,
      });

      console.log(data);
      setName(data.activity.name)
    } catch (error) {}
  }

  const handleAddUpdate = async (position: number, type: string) => {
    try {
      const data = await mutateUpdateActivity({
        op: "add",
        field: "fields",
        value: {
          type
        },
        position
      })
      console.log(data.activity);
      setFields((oldFields) => [
        ...oldFields.slice(0, position),
        { ...DEFAULT_ACTIVITY_FIELD_VALUE, type },
        ...oldFields.slice(position)
      ])
    } catch (error) {}
  }

  const handleRemoveUpdate = async (position: number) => {
    try {
      const data = await mutateUpdateActivity({
        op: "remove",
        field: "fields",
        position
      })
      console.log(data.activity);
      setFields((oldFields) => [
        ...oldFields.slice(0, position).concat(oldFields.slice(position + 1))
      ])
    } catch (error) {}
  }

  const handleChangeName = async (newName: string) => {
    try {
      const data = await mutateUpdateActivity({
        op: 'set',
        field: 'name',
        value: newName,
      });

      console.log(data);
      setName(data.activity.name)
    } catch (error) {}
  }

  const handleChangeDescription = async (newDescription: string) => {
    try {
      const data = await mutateUpdateActivity({
        op: 'set',
        field: 'description',
        value: newDescription,
      });

      console.log(data);
      setDescription(data.activity.description)
    } catch (error) {}
  }

  const handleChangeFieldName = async (position: number, newName: string) => {
    const fieldAtPosition = fields[position];

    try {
      const data = await mutateUpdateActivity({
        op: "set",
        field: `fields.${position}.name`, // "fields",
        value: newName,
      })
      console.log(data.activity);
      setFields((oldFields) => [
        ...oldFields.slice(0, position),
        { ...fieldAtPosition, name: newName },
        ...oldFields.slice(position + 1)
      ])
    } catch (error) {}

  }

  if (isPending) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <Heading>Edit activity</Heading>
      <form  onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          <FieldGroup className="space-y-0">
            <EditInput
              value={name}
              setValue={(newValue) => setName(newValue)}
              onEnter={() => handleChangeName(name)}
              className="sm:text-4xl" name="name" placeholder="Name"
            />
            <EditTextarea
              name="description" placeholder="Description"
              value={description}
              setValue={(newValue) => setDescription(newValue)}
              onEnter={() => handleChangeDescription(description)}
            />
          </FieldGroup>
        </Fieldset>
        <Divider className="my-4" />
        <Fieldset>
          <Legend>Fields</Legend>
          <FieldGroup className="space-y-0 ">
            <AddItem key='add-item-0' place={'bottom'} position={0} onClick={(position, type) => handleAddUpdate(position, type)} />
            { fields.map((field, index) => (
              <>
                <ActivityFieldContent
                  key={`field-${field.type}-${index}`}

                  field={field}
                  onEnter={(newValue) => handleSetUpdate('name', newValue, index)}
                  onDelete={() => handleRemoveUpdate(index)}
                />
                <AddItem
                  key={`add-item-${index + 1}`}
                  place={'bottom'}
                  position={index + 1}
                  onClick={(position, type) => handleAddUpdate(position, type)}
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

interface ActivityFieldContentProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldContent = ({ field, onEnter, onDelete }: ActivityFieldContentProps) => {
  const { type } = field;

  switch(type) {
    case 'text':
      return <ActivityFieldText field={field} onEnter={onEnter} onDelete={onDelete} />

    case 'number':
      return <ActivityFieldNumber field={field} onEnter={onEnter} onDelete={onDelete} />

    case 'date':
      return <ActivityFieldDate field={field} onEnter={onEnter} onDelete={onDelete} />

    case 'time':
      return <ActivityFieldTime field={field} onEnter={onEnter} onDelete={onDelete} />

    case 'multiple-choice':
      return <ActivityFieldMC field={field} onEnter={onEnter} onDelete={onDelete} />

    default:
      return <></>
  }
}

interface ActivityFieldTextProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldText = ({field, onEnter, onDelete}: ActivityFieldTextProps) => {
  const [value, setValue] = useState<string>(field.name)

  return (
    <EditInput
      icon={<DocumentTextIcon />}
      value={value}
      setValue={setValue}
      onEnter={() => onEnter(value)}
      onDelete={() => onDelete()}
    />
  )
}

interface ActivityFieldNumberProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldNumber = ({field, onEnter, onDelete}: ActivityFieldNumberProps) => {
  const [value, setValue] = useState<string>(field.name);

  return (
    <EditInput
      icon={<HashtagIcon />}
      value={value}
      setValue={setValue}
      onEnter={() => onEnter(value)}
      onDelete={onDelete}
      placeholder="Enter the name of the field"
    />
  )
}

interface ActivityFieldDateProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldDate = ({field, onEnter, onDelete}: ActivityFieldDateProps) => {
  const [value, setValue] = useState<string>(field.name);

  return (
    <EditInput
      icon={<CalendarDaysIcon />}
      value={value}
      setValue={setValue}
      onEnter={() => onEnter(value)}
      onDelete={() => onDelete()}
    />
  )
}

interface ActivityFieldTimeProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldTime = ({field, onEnter, onDelete}: ActivityFieldTimeProps) => {
  const [value, setValue] = useState<string>(field.name)

  return (
    <EditInput
      icon={<ClockIcon />}
      value={value}
      setValue={setValue}
      onEnter={() => onEnter(value)}
      onDelete={() => onDelete()}
    />
  )
}

interface ActivityFieldMCProps {
  field: ActivityField;
  onEnter: (newValue: string) => void;
  onDelete: () => void;
}
const ActivityFieldMC = ({field, onEnter, onDelete}: ActivityFieldMCProps) => {
  const [value, setValue] = useState<string>(field.name)

  return (
    <EditInput
      icon={<ListBulletIcon />}
      value={value}
      setValue={setValue}
      onEnter={() => onEnter(value)}
      onDelete={() => onDelete()}
    />
  )
}

interface EditKeyboardUsageProps {
  onHover: boolean,
  onFocus: boolean,

  onDelete: () => void;
}
const EditKeyboardUsage = ({
  onHover,
  onFocus,

  onDelete
}: EditKeyboardUsageProps) => {
  return (
    <div className={cn(
      "m-0 p-0 absolute right-0 top-0 bottom-0 items-center justify-center",
      onHover || onFocus ? 'flex' : 'hidden'
    )}>
      <div className="flex-col">
        <Description
          className={cn(
            "sm:text-xs",
            onHover && !onFocus
              ? 'block'
              : 'hidden'
          )}
        >Click to edit</Description>
        <Description
          className={cn(
            "flex-col items-start justify-center sm:text-xs",
            !onHover && onFocus
              ? 'flex'
              : 'hidden'
          )}
        >
          <span><Strong>Shift+Enter</Strong> to save.</span>
          <span><Strong>Esc</Strong> to cancel.</span>
        </Description>
      </div>
      <span className="isolate inline-flex">
        <Button plain><Cog6ToothIcon /></Button>
        <Button plain onClick={() => onDelete()}><TrashIcon /></Button>
      </span>
    </div>
  )
}

interface EditInputProps {
  icon?: JSX.Element;
  className?: string;
  value: string;
  placeholder?: string;
  setValue: (newValue: string) => void;
  onEnter: () => void;
  onDelete?: () => void;
}
const EditInput = ({
  icon,
  className,
  value,
  placeholder,
  setValue,
  onEnter,
  onDelete,
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
      "relative flex items-center border border-transparent rounded-lg",
      onHover && !onFocus
        && 'bg-gray-200 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
      onFocus && 'border-gray-200'
    )}>
      { icon && <span className="w-5 h-5">{ icon }</span>}
      <Input
        wrapperClassName="border-none before:shadow-none before:rounded-none before:bg-transparent sm:after:focus-within:ring-0"
        className={cn(
          "border-none sm:pr-36 hover:bg-none before:bg-none",
          "border-none before:shadow-none before:rounded-none sm:after:focus-within:ring-0",
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
        onDelete={() => onDelete()}
      />
    </Field>
  )
}

interface EditTextareaProps {
  className?: string;
  value: string;
  setValue: (newValue: string) => void;
  onEnter: () => void;
  name: string;
  placeholder: string;
}
const EditTextarea = ({
  value,
  setValue,
  onEnter,
  ...props
}: EditTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
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
      onEnter()
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
  position,
  onClick
}: AddItemProps) => {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setVisible(menuOpen);
  }, [menuOpen])

  const handleClickOnType = (type: string) => {
    onClick(position, type);
  }

  return (
    <div
      className="relative h-3 bg-transparent flex flex-col items-center justify-center cursor-pointer"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(menuOpen || !visible)}
    >
      {visible && (
        <>
          <hr className="w-full h-0.5 bg-indigo-600"/>
          <div className="absolute top-0 -left-8 bottom-0 z-50 flex items-center justify-center">
            <Dropdown>
              {({ open }) => {
                useEffect(() => {
                  setMenuOpen(open);
                }, [open])

                return (
                  <>
                    <DropdownButton
                      aria-label="More options"
                      circle
                      className="bg-indigo-600 text-white cursor-pointer"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <PlusIcon />
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleClickOnType('text')}>Text</DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('number')}>Number</DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('date')}>Date</DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('time')}>Hour</DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('multiple-choice')}>Multiple choices</DropdownItem>
                    </DropdownMenu>
                  </>
                )
              }}
            </Dropdown>
          </div>
        </>
      )}
    </div>
  )
}
