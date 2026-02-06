import { StackTab } from './stack-tab.alias';

export interface StackItem {
  name: string;
  icon: string;
  meta: {
    tab: StackTab;
  };
}
