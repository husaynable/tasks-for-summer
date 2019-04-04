import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @HostBinding('class') class = 'app-task-item mat-elevation-z2';
  @Input() task: Task;

  isEditing = false;
  holdingProgress: number;
  progressStop$ = new Subject<void>();

  constructor(private tasksService: TasksService) {}

  @HostListener('touchstart')
  @HostListener('mousedown')
  mouseDownListener() {
    if (!this.task.isFinished) {
      interval(50)
        .pipe(
          filter(v => v > 4),
          takeUntil(this.progressStop$),
          takeWhile(() => this.holdingProgress <= 100)
        )
        .subscribe(() => {
          this.holdingProgress += 5;

          if (this.holdingProgress === 100) {
            this.changeTaskStatus();
          }
        });
    }
  }

  @HostListener('touchmove')
  @HostListener('touchend')
  @HostListener('mouseup')
  mouseUpListener() {
    if (!this.task.isFinished) {
      this.progressStop$.next();
      this.holdingProgress = 0;
    }
  }

  ngOnInit() {
    this.holdingProgress = this.task.isFinished ? 100 : 0;
  }

  changeMode(mode: boolean) {
    this.isEditing = mode;

    if (mode) {
      setTimeout(() => focusOnInput(this.nameInput.nativeElement), 0);
    }
  }

  async changeTaskName(newName: string) {
    await this.tasksService.updateTask({ ...this.task, name: newName });
    this.changeMode(false);
  }

  async changeTaskStatus() {
    await this.tasksService.updateTask({
      ...this.task,
      isFinished: !this.task.isFinished
    });
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id);
  }
}
