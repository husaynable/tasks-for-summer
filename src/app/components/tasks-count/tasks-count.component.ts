import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-count',
  templateUrl: './tasks-count.component.html',
  styleUrls: ['./tasks-count.component.scss'],
})
export class TasksCountComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'mat-elevation-z3';

  allTasksCount = 0;
  finishedTasksCount = 0;
  pageOffset = 0;

  tasksSub$!: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksSub$ = this.tasksService.getTasks().subscribe((tasks) => {
      this.allTasksCount = tasks.length;
      this.finishedTasksCount = tasks.filter((t) => t.isFinished).length;
    });
  }

  ngOnDestroy() {
    this.tasksSub$.unsubscribe();
  }
}
