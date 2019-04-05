import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-count',
  templateUrl: './tasks-count.component.html',
  styleUrls: ['./tasks-count.component.css']
})
export class TasksCountComponent implements OnInit, OnDestroy {
  allTasksCount = 0;
  finishedTasksCount = 0;

  tasksSub$: Subscription;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasksSub$ = this.tasksService.getTasks()
      .subscribe(tasks => {
        this.allTasksCount = tasks.length;
        this.finishedTasksCount = tasks.filter(t => t.isFinished).length;
      });
  }

  ngOnDestroy() {
    this.tasksSub$.unsubscribe();
  }
}
