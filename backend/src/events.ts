import { EventEmitter } from 'events';
import logger from './logger';

type Listener = (args: any) => void;
type ListenerAll = (
  eventName: string,
  companyId: string,
  ...args: any[]
) => void;

export const events = new EventEmitter();
const listersAll: ListenerAll[] = [];

export function emit(eventName: string, companyId: string, eventData: any) {
  logger.info(`Emitindo evento ${eventName} para empresa: ${companyId}`);
  events.emit(eventName, eventData);
  emitForAll(eventName, companyId, eventData);
}

export function on(eventName: string, fn: Listener) {
  events.on(eventName, fn);
}

export function onAll(fn: ListenerAll) {
  if (fn) {
    listersAll.push(fn);
  }
}

function emitForAll(eventName: string, companyId: string, eventData: any) {
  for (const listener of listersAll) {
    listener(eventName, companyId, eventData);
  }
}
