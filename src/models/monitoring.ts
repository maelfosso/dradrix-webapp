
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

export interface ActivityFieldDate {

}

export interface ActivityFieldList {
  multiple: boolean;
  choices: string[];
}

export type ActivityFieldType = ActivityFieldList | ActivityFieldDate

export interface ActivityField {
  id: string;
  name: string;
  description: string;
  type: string;
  key: boolean;
  code: string;
  options: ActivityFieldOptions;
  details: ActivityFieldType;
}

export const DEFAULT_ACTIVITY_FIELD_VALUE: ActivityField = {
  id: '',
  key: false,
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
