import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.tasksCollection = db.collection<Task>('tasks', ref => ref.orderBy('name'));
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
    return this.tasksCollection.add(task);
  }

  updateTask(task: Task): Promise<void> {
    const taskDoc = this.getDoc(task.id);
    return taskDoc.update(task);
  }

  delete(taskId: string): Promise<void> {
    const taskDoc = this.getDoc(taskId);
    return taskDoc.delete();
  }

  private getDoc(taskId: string) {
    return this.tasksCollection.doc(taskId);
  }
}
