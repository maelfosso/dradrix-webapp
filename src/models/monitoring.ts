
export interface ActivityFieldOptions {
  defaultValue: string | null;
  reference: string | null;
  multiple: boolean;
}

export const DEFAULT_ACTIVITY_FIELD_OPTIONS_VALUE = {
  multiple: false,
  reference: null,
  defaultValue: null
}

export interface ActivityFieldTime {}

export interface ActivityFieldDate {}

export interface ActivityFieldNumber {}

export interface ActivityFieldText {}

export interface ActivityFieldMultipleChoices {
  multiple: boolean;
  choices: string[];
}

export interface ActivityFieldUpload {
  typeOfFiles: string[];
  maxNumberOfItems: number;
}

export type ActivityFieldType = ActivityFieldMultipleChoices | ActivityFieldText | ActivityFieldNumber | ActivityFieldTime | ActivityFieldDate | ActivityFieldUpload

export interface ActivityField {
  id: string;
  name: string;
  description: string;
  type: string;
  primaryKey: boolean;
  code: string;
  options: ActivityFieldOptions;
  details: ActivityFieldType;
}

export const DEFAULT_ACTIVITY_FIELD_VALUE: ActivityField = {
  id: '',
  primaryKey: false,
  code: '',
  name: '',
  description: '',
  type: 'text',
  options: DEFAULT_ACTIVITY_FIELD_OPTIONS_VALUE,
  details: {}
}

export interface Activity {
  id: string;
  name: string;
  description: string
  fields: ActivityField[];
}

export const DEFAULT_ACTIVITY_VALUE: Activity = {
  name: '',
  description: '',
  fields: [],
  id: ''
};
