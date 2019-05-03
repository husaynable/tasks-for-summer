import { ItemModel } from './item.model';

export interface Task {
  id?: string;
  name: string;
  isFinished: boolean;
  drunkDrinks?: ItemModel[];
}
