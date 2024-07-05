export type ActivityField = {
  name: string;
  description: string;
  type: string;
  id: boolean;
  code: string;
  // options: ActivityFieldOptions;
}

export type Activity = {
  id: string;
  name: string;
  description: string
  fields: ActivityField[];
};
