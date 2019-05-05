import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { focusOnInput } from 'src/app/utils/functions';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil, takeWhile, filter, tap } from 'rxjs/operators';
import { Drink } from 'src/app/models/drink.model';
import { ItemModel } from 'src/app/models/item.model';
import { MatDialog } from '@angular/material/dialog';
import { ItemsListComponent } from '../items-list/items-list.component';

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

  constructor(private tasksService: TasksService, private dialog: MatDialog) {}

  @HostListener('touchstart')
  @HostListener('mousedown')
  mouseDownListener() {
    if (!this.task.isFinished) {
      interval(5)
        .pipe(
          filter(v => v > 4),
          takeUntil(this.progressStop$),
          takeWhile(() => this.holdingProgress <= 95)
        )
        .subscribe(() => {
          this.holdingProgress += 1;

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

  openDrinksList() {
    if (this.task.drunkDrinks + '') {
      const dialogRef = this.dialog.open(ItemsListComponent, {
        width: '90%',
        data: { caption: 'Drinks List', itemsType: 'drinks' }
      });

      dialogRef.afterClosed()
        .subscribe(async (result: number) => {
          if (result !== undefined && this.task.drunkDrinks !== result) {
            await this.setDrunkDrinks(result);
          }
        });
    }
  }

  openMoviesList() {
    if (this.task.watchedMovies + '') {
      const dialogRef = this.dialog.open(ItemsListComponent, {
        width: '90%',
        data: { caption: 'Movies List', itemsType: 'movies' }
      });

      dialogRef.afterClosed()
        .subscribe(async (result: number) => {
          if (result !== undefined && this.task.watchedMovies !== result) {
            await this.setWatchedMovies(result);
          }
        });
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

    if (!this.task.isFinished) {
      this.holdingProgress = 0;
    }
  }

  async deleteTask() {
    await this.tasksService.delete(this.task.id);
  }

  async setDrunkDrinks(drinks: number) {
    await this.tasksService.updateTask({
      ...this.task,
      drunkDrinks: drinks
    });
  }

  async setWatchedMovies(movies: number) {
    await this.tasksService.updateTask({
      ...this.task,
      watchedMovies: movies
    });
  }
}
