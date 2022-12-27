import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  orderBy,
  Query,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from 'src/app/services/login.service';

import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { FilterType, SortModel } from '../components/order-by/order-by.component';
import { Counts } from './../models/counts.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksCollection: CollectionReference<Task>;
  private tasks$: Subject<Task[]> = new Subject();
  private tasksSub?: Subscription;
  private currentSort: SortModel = {
    value: 'timestamp',
    direction: 'desc',
  };
  private currentFilter: FilterType = 'all';

  constructor(private db: Firestore, private loginService: LoginService) {
    this.tasksCollection = collection(db, environment.collectionName) as CollectionReference<Task>;

    this.updateObservable();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  getCounts(): Observable<Counts> {
    return collectionData<Task>(this.getUpdatedQuery(true)).pipe(
      map((tasks) => {
        return {
          all: tasks.length,
          finished: tasks.filter((t) => t.isFinished).length,
          notFinished: tasks.filter((t) => !t.isFinished).length,
        };
      })
    );
  }

  addTask(task: Task): Promise<DocumentReference> {
    task.userId = this.loginService.getUserId();
    return addDoc(this.tasksCollection, task).then((res) => {
      // TODO notify
      // this.notifier.notify('success', 'New Task for Summer is added!');
      return res;
    });
  }

  updateTask(task: Task): Promise<void> {
    const taskDoc = this.getDoc(task.id!);
    return updateDoc(taskDoc, task).then((res) => {
      // TODO notify
      // this.notifier.notify('success', 'Task for Summer is updated!');
      return res;
    });
  }

  delete(taskId: string): Promise<void> {
    const taskDoc = this.getDoc(taskId);
    return deleteDoc(taskDoc).then(() => {
      // TODO notify
      // this.notifier.notify('success', 'Task for Summer is deleted!');
    });
  }

  applySort(sort: SortModel) {
    this.currentSort = sort;
    this.updateObservable();
  }

  applyFilter(filter: FilterType) {
    this.currentFilter = filter;
    this.updateObservable();
  }

  private getUpdatedQuery(ignoreExtendedFilters?: boolean): Query<Task> {
    const queryArr = [
      orderBy(this.currentSort.value, this.currentSort.direction),
      where('userId', '==', this.loginService.getUserId()),
    ];

    if (!ignoreExtendedFilters) {
      if (this.currentFilter === 'finished') {
        queryArr.push(where('isFinished', '==', true));
      } else if (this.currentFilter === 'notFinished') {
        queryArr.push(where('isFinished', '==', false));
      }
    }

    return query(this.tasksCollection, ...queryArr);
  }

  private updateObservable() {
    if (this.tasksSub) {
      this.tasksSub.unsubscribe();
    }
    this.tasksSub = collectionData<Task>(this.getUpdatedQuery(), { idField: 'id' }).subscribe((data) =>
      this.tasks$.next(data)
    );
  }

  private getDoc(taskId: string): DocumentReference<Task> {
    return doc(this.tasksCollection, taskId);
  }
}
