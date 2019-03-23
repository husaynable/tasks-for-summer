import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private db: AngularFirestore) { }

  getTasks(): Observable<Task[]> {
    return this.db.collection<Task>('tasks').valueChanges();
  }
}
