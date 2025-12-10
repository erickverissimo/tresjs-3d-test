import { EntityProps, Entity } from '../../shared';

export interface FileUploadProps extends EntityProps {
  id?: string | null;
  name: string;
  key: string;
  resource: string;
  resourceId: string;
  mimeType: string;
  temporary: boolean;
}

export class FileUpload extends Entity<FileUploadProps> {
  readonly name: string;
  readonly key: string;
  readonly resource: string;
  readonly resourceId: string;
  readonly mimeType: string;
  readonly temporary: boolean;

  constructor(props: FileUploadProps) {
    super(props);
    this.name = props.name;
    this.key = props.key;
    this.resource = props.resource;
    this.resourceId = props.resourceId;
    this.mimeType = props.mimeType;
    this.temporary = props.temporary;
  }
}
