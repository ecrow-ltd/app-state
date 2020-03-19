export interface IObjectSchemaProperty<T> {
  type: string;
  description: string;
  default: T;
}

export interface IObjectSchema<T> {
  $schema: string;
  $id: string;
  type: string;
  properties: { [P in keyof T]: IObjectSchemaProperty<T[P]> };
  required: (keyof T)[];
}
