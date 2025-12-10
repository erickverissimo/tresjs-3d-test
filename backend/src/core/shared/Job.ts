export interface Job {
  process(): Promise<void>;
  prepare(): Promise<void>;
  getName(): string;
}
