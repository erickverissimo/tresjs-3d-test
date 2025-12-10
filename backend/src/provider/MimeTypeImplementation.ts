import { injectable } from "inversify";
import { MimeTypeResolver } from "../core";

@injectable()
export class MimeTypeImplementation implements MimeTypeResolver {
  extension(type: string): string | false {
    throw new Error("Method not implemented.");
  }
}