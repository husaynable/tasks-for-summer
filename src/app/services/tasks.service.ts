import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  AngularFirestoreDocument,
  CollectionReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../environments/environment';
import { FilterType, SortModel } from '../components/order-by/order-by.component';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksCollection: AngularFirestoreCollection<Task>;
  currentSort: SortModel = {
    value: 'timestamp',
    direction: 'desc'
  };
  currentFilter: FilterType = 'all';
  initRef: CollectionReference<firebase.firestore.DocumentData>;

  constructor(private db: AngularFirestore, private notifier: NotifierService) {
    this.tasksCollection = db.collection<Task>(environment.collectionName, ref => ref.orderBy('timestamp', 'desc'));
    this.initRef = this.tasksCollection.ref;
  }

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.valueChanges({ idField: 'id' });
  }

  addTask(task: Task): Promise<DocumentReference> {
    this.notifier.notify('success', 'New Task for Summer is added!');
    return this.tasksCollection.add(task);
  }

  updateTask(task: Task): Promise<void> {
    this.notifier.notify('success', 'Task for Summer is updated!');
    const taskDoc = this.getDoc(task.id);
    return taskDoc.update(task);
  }

  delete(taskId: string): Promise<void> {
    this.notifier.notify('success', 'Task for Summer is deleted!');
    const taskDoc = this.getDoc(taskId);
    return taskDoc.delete();
  }

  applySort(sort: SortModel) {
    this.currentSort = sort;
    this.tasksCollection = this.db.collection<Task>(environment.collectionName, this.getUpdatedRef.bind(this));
  }

  applyFilter(filter: FilterType) {
    this.currentFilter = filter;
    this.tasksCollection = this.db.collection<Task>(environment.collectionName, this.getUpdatedRef.bind(this));
  }

  private getUpdatedRef() {
    let ref = this.initRef.orderBy(this.currentSort.value, this.currentSort.direction);
    if (this.currentFilter === 'finished') {
      ref = ref.where('isFinished', '==', true);
    } else if (this.currentFilter === 'notFinished') {
      ref = ref.where('isFinished', '==', false);
    }

    return ref;
  }

  private getDoc(taskId: string): AngularFirestoreDocument<Task> {
    return this.tasksCollection.doc(taskId);
  }
}
