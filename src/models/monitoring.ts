
export interface ActivityFieldOptions {
  multiple: boolean;
}

export const DEFAULT_ACTIVITY_FIELD_OPTIONS_VALUE = {
  multiple: false
}

export interface ActivityField {
  name: string;
  description: string;
  type: string;
  id: boolean;
  code: string;
  options: ActivityFieldOptions;
}

export const DEFAULT_ACTIVITY_FIELD_VALUE: ActivityField = {
  id: false,
  code: '',
  name: '',
  description: '',
  type: 'text',
  options: DEFAULT_ACTIVITY_FIELD_OPTIONS_VALUE,
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
