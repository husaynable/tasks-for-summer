import { Drink } from './drink.model';

export interface Task {
  id?: string;
  name: string;
  isFinished: boolean;
  drunkDrinks?: Drink[];
}
