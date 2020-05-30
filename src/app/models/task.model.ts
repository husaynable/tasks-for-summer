import { ListModel } from './list.model';

export interface Task {
  id?: string;
  name: string;
  isFinished: boolean;
  drunkDrinks?: number;
  watchedMovies?: number;
  countOfFedCats?: number;
  list?: ListModel;
}
