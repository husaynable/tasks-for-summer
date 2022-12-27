import { Timestamp } from '@angular/fire/firestore';
import { ListModel } from './list.model';

export interface Task {
  id?: string;
  name: string;
  isFinished: boolean;
  drunkDrinks?: number;
  watchedMovies?: number;
  countOfFedCats?: number;
  list?: ListModel;
  timestamp: Timestamp;
  userId?: string;
  counterCount?: number;
  plannedDate?: Timestamp;
}
