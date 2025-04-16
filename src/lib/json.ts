import objectTransformer from 'object-key-transformer';
import { snakeCase } from "snake-case";
import { camelCase } from "camel-case";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toJson(json: any) {
  if (Array.isArray(json)) {
    return JSON.stringify(json.map(j => objectTransformer(
      j,
      snakeCase,
      true
    )))
  }

  return JSON.stringify(objectTransformer(
    json,
    snakeCase,
    true
  ))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromJson<T>(json: any) {
  if (Array.isArray(json)) {
    return json.map(j => objectTransformer(
      j,
      camelCase,
      true
    ) as T)
  }

  return objectTransformer(
    json,
    camelCase,
    true
  ) as T
}
