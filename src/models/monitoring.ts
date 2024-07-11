
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

export interface ActivityField {
  id: string;
  name: string;
  description: string;
  type: string;
  key: boolean;
  code: string;
  options: ActivityFieldOptions;
}

export const DEFAULT_ACTIVITY_FIELD_VALUE: ActivityField = {
  id: '',
  key: false,
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
