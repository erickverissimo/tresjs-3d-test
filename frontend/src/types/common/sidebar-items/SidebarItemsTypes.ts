export interface ISidebarItemsTypes {
  name: string;
  subtitle?: string;
  to: string;
  icon: string;
  resource: string;
  action: string;
  module?: string;
  children?: ISidebarItemsTypes[];
}
