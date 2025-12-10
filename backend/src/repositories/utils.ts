import { Types } from 'mongoose';

export type FilterRegExp = { $regex: RegExp };
export type FilterNotEquals<T = string> = { $ne: T };
export type FilterNotEqualsIgnoreCase = { $not: { $regex: RegExp } };
export type FilterIn = { $in: string[] };
export type FilterNotIn = { $nin: string[] };

export function like(str: string): FilterRegExp {
  return {
    $regex: new RegExp(str),
  };
}

export function likeIgnoreCase(str: string): FilterRegExp {
  const escapedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    $regex: new RegExp(escapedStr, 'i'),
  };
}

export function equasIgnoreCase(str: string): FilterRegExp {
  const escapedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    $regex: new RegExp(`^${escapedStr}$`, 'i'),
  };
}

export function notEquals<T = string>(value: T): FilterNotEquals<T> {
  return {
    $ne: value,
  };
}

export function notEqualsIgnoreCase(value: string): FilterNotEqualsIgnoreCase {
  const escapedStr = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return {
    $not: {
      $regex: new RegExp(`^${escapedStr}$`, 'i'),
    },
  };
}

export function filterIn(value: string[]): FilterIn {
  return {
    $in: value,
  };
}

export function filterNotIn(value: string[]): FilterNotIn {
  return {
    $nin: value,
  };
}

export function equalsId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}

export function notEqualsId(id: string): FilterNotEquals<Types.ObjectId> {
  return {
    $ne: new Types.ObjectId(id),
  };
}
