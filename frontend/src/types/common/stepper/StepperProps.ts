export interface IStepperProps {
  title: string;
  component: any;
  props: any;
  isLoading?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  prevFunction?: () => boolean | Promise<boolean>;
  nextFunction?: () => boolean | Promise<boolean>;
  redirect?: () => void;
}
