import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksCollection: AngularFirestoreCollection<Task>;

  constructor(db: AngularFirestore, private notifier: NotifierService) {
    this.tasksCollection = db.collection<Task>('tasks-test', ref => ref.orderBy('name'));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
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

  private getDoc(taskId: string): AngularFirestoreDocument<Task> {
    return this.tasksCollection.doc(taskId);
  }
}
