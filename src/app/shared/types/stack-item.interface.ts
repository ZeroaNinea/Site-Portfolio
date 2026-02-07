import { StackTab } from './stack-tab.alias';

export interface StackItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  meta: {
    tab: StackTab;
  };
}
