import { Component, OnInit, HostBinding, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-count',
  templateUrl: './tasks-count.component.html',
  styleUrls: ['./tasks-count.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCountComponent implements OnInit {
  @HostBinding('class') class = 'mat-elevation-z3';

  allTasksCount = 0;
  finishedTasksCount = 0;
  pageOffset = 0;

  private destoyRef = inject(DestroyRef);

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destoyRef))
      .subscribe((tasks) => {
        this.allTasksCount = tasks.length;
        this.finishedTasksCount = tasks.filter((t) => t.isFinished).length;
      });
  }
}
