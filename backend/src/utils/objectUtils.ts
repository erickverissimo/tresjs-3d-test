import { pick, assignInWith, partialRight, isUndefined, Many } from 'lodash';
import { Types } from 'mongoose';

export function filterPropsByType<Type>(
  obj: any,
  values: Many<keyof Type>
): Partial<Type> {
  const value = pick<Type>(obj, values);
  return value;
}

export function copyWithNotUndefined<Target, Source>(
  targetValue: Target,
  sourceValue: Source
): Target | Source {
  return isUndefined(sourceValue) ? targetValue : sourceValue;
}

export function copyProps<Target, Source>(
  obj: Target,
  source: Source,
  props?: Many<keyof Source>
): Target {
  const filterProps = props ? filterPropsByType(source, props) : source;

  let apply: any = partialRight<any, any>(assignInWith, copyWithNotUndefined);
  return apply(obj, filterProps);
}

export function compare(obj1: any, obj2: any) {
  if (obj1 && !obj2) {
    return false;
  } else if (!obj1 && obj2) {
    return false;
  } else if (!obj1 && !obj2) {
    return true;
  } else {
    return obj1.toString() === obj2.toString();
  }
}

export function extractObjectId(obj: any): string | null {
  if (!obj) {
    return null;
  }

  if (obj._id) {
    return obj._id.toString();
  }

  return obj.id ?? obj.toString();
}

export function isObjectId(obj: any): boolean {
  return typeof obj === 'string' || obj instanceof Types.ObjectId;
}

export function isNull(value: any) {
  return value === undefined || value === null;
}

export function isEmpty(value: any): boolean {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return true;
    }
    return value.every(isEmpty);
  }
  return isNull(value) || value.trim() === '';
}

export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

export function isNotNull(value: any) {
  return value !== undefined && value !== null;
}

export function isNullOrStrNull(value: any) {
  return value === null || value === 'null';
}

export function isStringOrBooleanTrue(value: any) {
  return value?.toString() === 'true';
}

export function isStringOrBooleanFalse(value: any) {
  return value?.toString() === 'false';
}
