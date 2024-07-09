import { CalendarDaysIcon, ClockIcon, Cog6ToothIcon, DocumentTextIcon, HashtagIcon, KeyIcon, ListBulletIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getActivity, updateActivityMutation } from "api/activities";
import { Button } from "components/common/Button";
import { Divider } from "components/common/Divider";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "components/common/Dropdown";
import { Description, Field, FieldGroup, Fieldset, Legend } from "components/common/Fieldset";
import { Heading, Subheading } from "components/common/Heading"
import { Input } from "components/common/Input";
import { Listbox, ListboxLabel, ListboxOption } from "components/common/Listbox";
import { Popover, PopoverButton, PopoverPanel } from "components/common/Popover";
import Spinner from "components/common/Spinner";
import { Switch } from "components/common/Switch";
import { Strong, Text } from "components/common/Text";
import { Textarea } from "components/common/Textarea";
import useAutosizeTextArea from "hooks/useAutosizeTextArea";
import { Activity as IActivity, ActivityField as IActivityField, DEFAULT_ACTIVITY_VALUE, ActivityFieldOptions as IActivityFieldOptions } from "models/monitoring";
import { ChangeEvent, createContext, FocusEvent, KeyboardEvent, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "utils/css";


interface ActivityContextProps {
  activity: IActivity,
  setActivity: (activity: IActivity) => void,
  handleSetUpdate: (field: string, value: any, position?: number) => void,
  handleAddUpdate: (position: number, type: string) => void,
  handleRemoveUpdate: (position: number) => void
}
const ActivityContext = createContext<ActivityContextProps>({
  activity: DEFAULT_ACTIVITY_VALUE,
  setActivity: () => {},
  handleSetUpdate: () => {},
  handleAddUpdate: () => {},
  handleRemoveUpdate: () => {}
})

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useAuth must be used within an ActivityProvider');
  }
  return context;
}


interface ActivityContextProviderProps {
  children: JSX.Element
}
export const ActivityContextProvider = ({ children }: ActivityContextProviderProps) => {
  let { organizationId, activityId } = useParams();

  const [activity, setActivity] = useState<IActivity>(DEFAULT_ACTIVITY_VALUE);

  const {isPending, data} = useQuery(getActivity(organizationId!, activityId!));
  useEffect(() => {
    if (data?.activity) {
      setActivity(data.activity);
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
      console.log('handleSetUpdate: ', position, position !== undefined ? `fields.${position}.${field}` : field)
      const data = await mutateUpdateActivity({
        op: 'set',
        field: position !== undefined ? `fields.${position}.${field}` : field,
        value: value,
      });

      console.log(data);
      // setName(data.activity.name)
      setActivity(data.activity);
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
      // setFields((oldFields) => [
      //   ...oldFields.slice(0, position),
      //   { ...DEFAULT_ACTIVITY_FIELD_VALUE, type },
      //   ...oldFields.slice(position)
      // ])
      setActivity(data.activity);
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
      setActivity(data.activity);
      // setFields((oldFields) => [
      //   ...oldFields.slice(0, position).concat(oldFields.slice(position + 1))
      // ])
    } catch (error) {}
  }

  const value = useMemo(
    () => ({
      activity,
      setActivity,
      handleSetUpdate,
      handleAddUpdate,
      handleRemoveUpdate,
    }), [
      activity,
      setActivity,
      handleSetUpdate,
      handleAddUpdate,
      handleRemoveUpdate
    ]
  );

  if (isPending) {
    return (
      <Spinner />
    )
  }

  return (
    <ActivityContext.Provider value={value}>
      { children }
    </ActivityContext.Provider>
  )
}

const EditActivityPage = () => {
  const { activity, setActivity, handleSetUpdate, handleAddUpdate } = useActivityContext();

  return (
    <>
      <Heading>Edit activity</Heading>
      <form  onSubmit={e => { e.preventDefault(); }}>
        <Fieldset>
          <FieldGroup className="space-y-0">
            <EditInput
              value={activity.name}
              setValue={(newValue) => setActivity({ ...activity, name: newValue })}
              onEnter={() => handleSetUpdate('name', activity.name)}
              className="sm:text-4xl" placeholder="Name of the activity"
            />
            <EditTextarea
              name="description" placeholder="Describe your activity"
              value={activity.description}
              setValue={(newValue) => setActivity({ ...activity, description: newValue })}
              onEnter={() => handleSetUpdate('description', activity.description)}
            />
          </FieldGroup>
        </Fieldset>
        <Divider className="my-4" />
        <Fieldset>
          <Legend>Fields</Legend>
          <FieldGroup className="space-y-0 ">
            <AddItem key='add-item-0' place={'bottom'} position={0} onClick={(position, type) => handleAddUpdate(position, type)} />
            { activity.fields.map((field, index) => (
              <>
                <ActivityField
                  key={`field-${field.type}-${index}`}
                  position={index}
                  field={field}
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

interface ActivityFieldTypeProps {
  id: boolean;
  type: string;
  position: number;
  onChange: (field: string, value: any, position: number) => void;
}
const ActivityFieldType = ({ id, type, position, onChange }: ActivityFieldTypeProps) => {

  return (
    <div className="relative inline-block">
      <Listbox showIndicator={false} name="type" value={type} onChange={(newValue) => onChange('type', newValue, position)}
        className="!w-auto p-0 m-0 min-h-0 before:shadow-none"
        selectedOptionClassName="sm:min-h-fit sm:!p-1 sm:border-none"
      >
        <ListboxOption value="text">
          <DocumentTextIcon />
        </ListboxOption>
        <ListboxOption value="number">
          <HashtagIcon />
        </ListboxOption>
        <ListboxOption value="date">
          <CalendarDaysIcon />
        </ListboxOption>
        <ListboxOption value="time">
          <ClockIcon />
        </ListboxOption>
        <ListboxOption value="multiple-choice">
          <ListBulletIcon />
        </ListboxOption>
      </Listbox>
      {id && (
        <KeyIcon className="absolute right-0 bottom-0 w-2 h-2 fill-green-400 stroke-green-400"/>
      )}
    </div>
  )
}
interface ActivityFieldProps {
  field: IActivityField;
  position: number;
}
const ActivityField = ({ field, position }: ActivityFieldProps) => {
  const { handleRemoveUpdate, handleSetUpdate } = useActivityContext();

  const { type, name, id, options } = field;
  const [value, setValue] = useState<string>(name)
  const [onHover, setOnHover] = useState<boolean>(false);

  return (
    <div className="flex"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <EditInput
        className="grow-1"
        placeholder="Enter the name of the field"
        icon={<ActivityFieldType id={id} type={type} position={position} onChange={handleSetUpdate} />}
        value={value}
        setValue={setValue}
        onEnter={() => handleSetUpdate('name', value, position)}
      />

      <div className="flex">
        <Popover className="relative">
          <PopoverButton plain><Cog6ToothIcon /></PopoverButton>
          <PopoverPanel anchor="bottom" className="flex flex-col">
            <ActivityFieldOptions field={field} type={type} name={name} position={position} onUpdate={handleSetUpdate} />
          </PopoverPanel>
        </Popover>
        <Button plain onClick={() => handleRemoveUpdate(position)}><TrashIcon /></Button>
      </div>
    </div>
  )
}

interface ActivityFieldOptionsProps {
  field: IActivityField;
  type: string;
  name: string;
  position: number;
  onUpdate: (field: string, value: any, position: number) => void;
}
const ActivityFieldOptions = ({
  field,
  type,
  name,
  position,
  onUpdate
}: ActivityFieldOptionsProps) => {
  const { options, id } = field;

  const [defaultValue, setDefaultValue] = useState<string | null >(options.defaultValue)
  const [reference, setReference] = useState<string | null>(options.reference);

  const handleUpdate = (field: string, value: any, position: number) => {
    onUpdate(field, value, position);
  }


  return (
    <form onSubmit={() => {}} className="p-2 mx-auto max-w-4xl">
      <Heading>Options <Text>{ name }</Text></Heading>
      <Divider className="my-4" />

      <Fieldset className="flex flex-col gap-y-4">
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <Subheading>References</Subheading>
          <Text>Its value is the primary key from another activity. Kindly select the referencing activity.</Text>
        </div>
        <div>
          <Input aria-label="Reference activity" name="reference" />
        </div>
      </section>

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <Subheading>Default value</Subheading>
        </div>
        <div>
          <Input aria-label="Default value" name="defaultValue" />
        </div>
      </section>

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <Subheading>Multiple</Subheading>
          <Text>Can have multiple values. They will be separated by ``;`</Text>
        </div>
        <div>
          <Switch
            aria-label="Multiple"
            name="multiple"
            checked={options.multiple}
            onChange={(checked) => handleUpdate('options.multiple', checked, position )}
          />
        </div>
      </section>

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <Subheading>Key</Subheading>
          <Text>The primary key. The unique identifier.</Text>
        </div>
        <div>
          <Switch aria-label="Key" name="key" checked={id}
            onChange={(checked) => handleUpdate('id', checked, position )}
          />
          {/* <Input aria-label="Organization Name" name="name" defaultValue="Catalyst" /> */}
        </div>
      </section>
      </Fieldset>
    </form>
  )
}
interface EditKeyboardUsageProps {
  onHover: boolean,
  onFocus: boolean,

  onDelete?: () => void;
}
const EditKeyboardUsage = ({
  onHover,
  onFocus
}: EditKeyboardUsageProps) => {
  return (
    <div className={cn(
      "flex m-0 p-0 absolute right-0 top-0 bottom-0 items-center justify-center",
      onHover || onFocus ? 'flex' : 'hidden'
    )}>
      <Description
        className={cn(
          "w-max sm:text-xs",
          onHover && !onFocus
            ? 'block'
            : 'hidden'
        )}
      >Click to edit</Description>
      <Description
        className={cn(
          "w-max flex-col items-start justify-center sm:text-xs",
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
  icon?: JSX.Element;
  className?: string;
  value: string;
  placeholder?: string;
  setValue: (newValue: string) => void;
  onEnter: () => void;
}
const EditInput = ({
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
      "relative flex grow items-center border border-transparent rounded-lg",
      onHover && !onFocus
        && 'bg-gray-200 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
      onFocus && 'border-gray-200'
    )}>
      { icon }
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
      className="relative h-2 bg-transparent flex flex-col items-center justify-center cursor-pointer"
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
                      <DropdownItem onClick={() => handleClickOnType('text')}>
                        <DocumentTextIcon />
                        Text
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('number')}>
                        <HashtagIcon />
                        Number
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('date')}>
                        <CalendarDaysIcon />
                        Date
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('time')}>
                        <ClockIcon />
                        Hour
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClickOnType('multiple-choice')}>
                        <ListBulletIcon />
                        Multiple choices
                      </DropdownItem>
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
