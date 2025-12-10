export abstract class CryptoProvider {
  abstract compare(entry: string, hash: string): boolean;
  abstract hash(entry: string): string;
}
