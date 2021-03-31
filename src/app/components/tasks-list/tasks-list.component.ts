import { Component, OnInit, HostBinding } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { SortModel } from '../order-by/order-by.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':leave',
          [stagger(100, [animate('0.3s ease-out', style({ opacity: 0, transform: 'translateX(50%)' }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-50%)' }),
            stagger(100, [animate('0.3s ease-in', style({ opacity: 1, transform: 'translateX(0)' }))])
          ],
          { optional: true }
        )
      ])
    ])
  ],
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  @HostBinding('class') class = 'app-tasks-list container';
  tasks: Task[] = [];
  tasksSub: Subscription;
  tasksLength = 0;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksSub = this.tasksService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.tasksLength = tasks.length;
    });
  }

  trackTask(index: number, task: Task) {
    return task ? task.id : undefined;
  }

  onSortChanged(sort: SortModel) {
    this.tasksService.applySort(sort);
    this.tasksSub.unsubscribe();
    this.ngOnInit();
  }
}
