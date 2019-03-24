import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksCollection: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.tasksCollection = db.collection<Task>('tasks');
  }

  getTasks(): Observable<Task[]> {
    return this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  updateTask(task: Task): Promise<void> {
    console.log(task);
    const taskDoc = this.db.doc<Task>(`tasks/${task.id}`);
    return taskDoc.update(task);
  }
}
