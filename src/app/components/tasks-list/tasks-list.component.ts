import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';

import { FilterType, SortModel } from '../order-by/order-by.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':leave',
          [stagger(30, [animate('0.2s ease-out', style({ opacity: 0, transform: 'translateX(50%)' }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-50%)' }),
            stagger(30, [animate('0.2s ease-in', style({ opacity: 1, transform: 'translateX(0)' }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'app-tasks-list container';
  tasks: Task[] = [];
  tasksSub!: Subscription;
  tasksLength = 0;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksSub = this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksLength = tasks.length;
    });
  }

  trackTask(index: number, task: Task) {
    return task ? task.id : undefined;
  }

  onSortChanged(sort: SortModel) {
    this.tasksService.applySort(sort);
  }

  onFilterChanged(filter: FilterType) {
    this.tasksService.applyFilter(filter);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
